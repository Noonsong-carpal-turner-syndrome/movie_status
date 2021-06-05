package sm.chromeScreentime.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sm.chromeScreentime.Service.UrlService;
import sm.chromeScreentime.Service.UserService;
import sm.chromeScreentime.model.UrlDTO;
import sm.chromeScreentime.model.UrlEntity;

// request body에서 url, email 받아올 수 있게 하기
@RestController
@RequestMapping()
public class UserController {
    @Autowired
    UserService userService;
    UrlService urlService;
    //create -post
    //read -get

    @GetMapping("/classification")
    public String Classify(UrlDTO urldto){
        return urlService.Classify(urldto);
    }

    @GetMapping("/model/{url}")
    public UrlEntity findByUrl(@PathVariable String url){
        return userService.findByUrl(url);
    }
    /*
        public List<UrlEntity> findByDomainLike(String domain){
            return userService.findByDomainLike(domain);
        }
        public List<UrlEntity> findByCategory(String category){
            return userService.findByCategory(category);
        }
    */
    @PostMapping("/model/{url}")
    public UrlDTO insertUrl(@PathVariable String url, @RequestBody String category){
        return userService.insertUrl(url,category);
    }

    @PostMapping("/user/{email}")
    public UrlDTO insertUserUrl(@PathVariable String url, @RequestBody String category){
        return userService.insertUserUrl(url,category);
    }
}