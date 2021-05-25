package sm.chromeScreentime.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sm.chromeScreentime.model.User;

import java.lang.reflect.Member;

//Restful API 만들기
@RequestMapping(("/user"))
@RestController
public class UserController {
    @GetMapping("/info")
    public String index() {
        return new User();
    }

}