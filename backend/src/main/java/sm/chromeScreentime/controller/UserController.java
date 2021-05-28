package sm.chromeScreentime.controller;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sm.chromeScreentime.Service.UserService;
import sm.chromeScreentime.model.UrlEntity;
import sm.chromeScreentime.model.UserEntity;

import java.util.List;

@RestController
@RequestMapping("/classification")
public class UserController {
    @Autowired
    UserService userService;
    //create -post
    //read -get


    public List<UserEntity> findByEmail(String email){
        return userService.findByEmail(email);
    }

    public UrlEntity findByUrl(ObjectId url){
        return userService.findByUrl(url);
    }

    public List<UrlEntity> findByDomainLike(String domain){
        return userService.findByDomainLike(domain);
    }

    public List<UrlEntity> findByCategory(String category){
        return userService.findByCategory(category);
    }
}