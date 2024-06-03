package com.cloudcomputing.nodaechul.user.domain.repository.mapper;

import com.cloudcomputing.nodaechul.user.domain.model.dto.SignUpRequestDto;
import com.cloudcomputing.nodaechul.user.domain.model.UserVO;
import com.cloudcomputing.nodaechul.user.domain.model.enums.UserState;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    Long createUser(SignUpRequestDto user);

    void deleteUser(Long id);

    int editUser(SignUpRequestDto user);

    int activateUser(Long userId, UserState state);

    UserVO findByEmail(String email);

    String getUserS3Key(Long id);
}
