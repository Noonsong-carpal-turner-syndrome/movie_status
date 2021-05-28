package sm.chromeScreentime.controller;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sm.chromeScreentime.Service.UserService;
import sm.chromeScreentime.model.UrlDTO;
import sm.chromeScreentime.model.UrlEntity;
import sm.chromeScreentime.model.UserEntity;

import java.util.List;

@RestController
@RequestMapping()
public class UserController {
    @Autowired
    UserService userService;
    //create -post
    //read -get

    @GetMapping("/classification/{email}")
    public List<UserEntity> findByEmail(@PathVariable String email, @RequestBody UserEntity.CustomUrl[] urls){
        return userService.findByEmail(email, urls);
    }

    @GetMapping("/model/{email}")
    public UrlEntity findByUrl(@PathVariable ObjectId url,@RequestBody String label){
        return userService.findByUrl(url, label);
    }
/*
    public List<UrlEntity> findByDomainLike(String domain){
        return userService.findByDomainLike(domain);
    }

    public List<UrlEntity> findByCategory(String category){
        return userService.findByCategory(category);
    }
*/
    @PostMapping("/model/{email}")
    public List<UrlDTO> insertUrl(@PathVariable ObjectId url, @RequestBody String category){
        return userService.insertUrl(url,category);
    }

    @PostMapping("/user/{email}")
    public List<UrlDTO> insertUserUrl(@PathVariable ObjectId url, @RequestBody String category){
        return userService.insertUserUrl(url,category);
    }
}