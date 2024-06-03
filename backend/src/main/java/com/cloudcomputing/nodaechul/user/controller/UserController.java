package com.cloudcomputing.nodaechul.user.controller;

import com.cloudcomputing.nodaechul.annotation.LoginRequired;
import com.cloudcomputing.nodaechul.user.domain.model.dto.LoginRequestDto;
import com.cloudcomputing.nodaechul.user.domain.model.dto.SignUpRequestDto;
import com.cloudcomputing.nodaechul.user.domain.model.User;
import com.cloudcomputing.nodaechul.user.service.UserService;
import com.cloudcomputing.nodaechul.utils.SessionUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
@Slf4j
public class UserController {
    private final UserService userService;

    @GetMapping
    @LoginRequired
    public ResponseEntity<User> getUser(HttpSession session) {
        User user = (User) session.getAttribute("USER");
        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/signup")
    public ResponseEntity<Long> signUp(@RequestPart(value = "signUpDto") @Valid SignUpRequestDto signUpRequestDto, @RequestPart(value = "faceImage", required = false) MultipartFile mFile) throws Exception {
        Long id = userService.createUser(signUpRequestDto, mFile);
        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }

    @GetMapping("/activate")
    public ResponseEntity<?> activateUser(@RequestParam("auth_code") String authCode, @RequestParam(value = "user_id") Long userId) {
        userService.activateUser(authCode, userId);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("계정이 활성화되었습니다.");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto loginRequest, HttpServletRequest request) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        User user = userService.authenticateUser(email, password);

        if(user != null) {
            HttpSession session = request.getSession();
            session.setAttribute("USER", user);
            return ResponseEntity.status(HttpStatus.OK).body(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials.");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
