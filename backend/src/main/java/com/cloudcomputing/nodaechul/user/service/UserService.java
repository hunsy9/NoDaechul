package com.cloudcomputing.nodaechul.user.service;

import com.cloudcomputing.nodaechul.mail.service.MailService;
import com.cloudcomputing.nodaechul.user.domain.model.dto.SignUpRequestDto;
import com.cloudcomputing.nodaechul.user.domain.model.User;
import com.cloudcomputing.nodaechul.user.domain.model.UserVO;
import com.cloudcomputing.nodaechul.user.domain.model.enums.UserState;
import com.cloudcomputing.nodaechul.user.domain.repository.UserRepository;
import com.cloudcomputing.nodaechul.user.exception.ActivationFailedException;
import com.cloudcomputing.nodaechul.user.exception.InvalidRegisterException;
import com.cloudcomputing.nodaechul.user.exception.LoginException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final RedisTemplate<String, String> redisTemplate;
    private final PasswordEncoder passwordEncoder;
    private final MailService mailService;

    private final String RedisAuthenticationPrefix = "AuthenticationCode:";

    private void cacheCodeToRedis(Long userId, String uuid) {
        redisTemplate.opsForValue().set(RedisAuthenticationPrefix + userId.toString(), uuid);
    }

    @Transactional
    public Long createUser(SignUpRequestDto signUpRequestDto) throws Exception {

        Boolean hasKey = redisTemplate.hasKey(RedisAuthenticationPrefix.concat(signUpRequestDto.getEmail()));

        // 이미 회원가입 신청이 완료된 유저 이메일에 대한 예외처리
        if (Boolean.TRUE.equals(hasKey)) {
            throw new InvalidRegisterException("이미 회원가입 요청이 된 이메일입니다.");
        }

        // 회원 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(signUpRequestDto.getPassword());
        signUpRequestDto.setPassword(encodedPassword);

        // 유저(Disabled 상태) 생성
        Long createdUserId = userRepository.createUser(signUpRequestDto);

        log.info("Created user id: {}", createdUserId);

        // 유저 verify 코드 생성
        String verifyCode = UUID.randomUUID().toString();

        // UUID(Value) 생성하여, Redis에 ttl(하루)로 생성
        cacheCodeToRedis(createdUserId, verifyCode);
        // 사용자 이메일로 메일 발송
        mailService.sendAuthMail(signUpRequestDto.getEmail(), verifyCode, createdUserId);

        return createdUserId;
    }

    @Transactional
    public void activateUser(String authCode, Long userId) {
        Boolean hasKey = redisTemplate.hasKey(RedisAuthenticationPrefix.concat(userId.toString()));
        if (Boolean.FALSE.equals(hasKey)) {
            userRepository.deleteUser(userId);
            redisTemplate.delete(RedisAuthenticationPrefix + userId);
            throw new ActivationFailedException("만료된 인증 코드입니다.");
        }

        Objects.requireNonNull(redisTemplate.opsForValue().get(RedisAuthenticationPrefix.concat(userId.toString()))).equals(authCode);

        redisTemplate.delete(RedisAuthenticationPrefix + userId);
        userRepository.activateUser(userId);
    }

    public User authenticateUser(String userEmail, String password) {
        UserVO userVO = userRepository.findByEmail(userEmail);

        if(Objects.isNull(userVO)) {
            throw new LoginException("계정이 존재하지 않습니다.");
        }

        if(userVO.getUser_status().equals(UserState.Disabled)){
            throw new LoginException("계정이 비활성화 상태입니다.");
        }

        if (passwordEncoder.matches(password, userVO.getPassword())) {
            return User.builder()
                    .id(userVO.getId())
                    .email(userVO.getEmail())
                    .student_id(userVO.getStudent_id())
                    .name(userVO.getName())
                    .user_role(userVO.getUser_role())
                    .build();
        }

        throw new LoginException("패스워드가 일치하지 않습니다.");
    }

    public String getUserAvatarById(Long userId) {
        return userRepository.getUserS3KeyById(userId);
    }
}

