package com.cloudcomputing.nodaechul.user.domain.repository;

import com.cloudcomputing.nodaechul.user.domain.model.dto.SignUpRequestDto;
import com.cloudcomputing.nodaechul.user.domain.model.UserVO;
import com.cloudcomputing.nodaechul.user.domain.repository.mapper.UserMapper;
import com.cloudcomputing.nodaechul.user.domain.model.enums.UserState;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class UserRepository {
    private final UserMapper userMapper;

    public Long createUser(SignUpRequestDto signUpRequestDto) {
        userMapper.createUser(signUpRequestDto);
        return signUpRequestDto.getId();
    }

    public void deleteUser(Long userId) {
        userMapper.deleteUser(userId);
    }

    public int editUser(SignUpRequestDto signUpRequestDto){
        return userMapper.editUser(signUpRequestDto);
    }

    public int activateUser(Long userId) {
        return userMapper.activateUser(userId, UserState.Active);
    }

    public UserVO findByEmail(String email) {
        return userMapper.findByEmail(email);
    }

    public String getUserS3KeyById(Long userId) {
        return userMapper.getUserS3Key(userId);
    }
}
