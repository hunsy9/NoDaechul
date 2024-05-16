package com.cloudcomputing.nodaechul.user.domain.model.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class LoginRequestDto {
    @NotBlank(message = "이메일 입력은 필수입니다.")
    @Email
    private final String email;
    @NotBlank(message = "비밀번호 입력은 필수입니다.")
    private final String password;
}
