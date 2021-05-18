package sm.chromeScreentime.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//Restful API 만들기
@RestController
public class UserController {
    @RequestMapping()
    public String index() {
        return "Hello!";
    }

}