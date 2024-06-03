package com.cloudcomputing.nodaechul.base;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class baseController {

    @GetMapping("/")
    public String checkBase(){
        return "서버가 정상 작동 중입니다.";
    }
}
