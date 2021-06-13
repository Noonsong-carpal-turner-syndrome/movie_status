package sm.chromeScreentime.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sm.chromeScreentime.Service.UrlService;
import sm.chromeScreentime.Service.UserService;
import sm.chromeScreentime.model.UrlDTO;
import sm.chromeScreentime.model.UrlEntity;
import sm.chromeScreentime.repository.UrlRepository;

// request body에서 url, email 받아올 수 있게 하기
@CrossOrigin(origins = "*")
@RestController
@RequestMapping()
public class UserController {
    @Autowired
    UrlService urlService;
    UserService userService;
    //create -post
    //read -get

    @PostMapping("/classification")
    @ResponseBody
    public UrlDTO Classify(@RequestBody UrlDTO urldto){
        System.out.println("url: " + urldto.getUrl() + ", title:" + urldto.getTitle());
        UrlDTO classifiedDTO = urlService.Classify(urldto);
        System.out.println("<Classified> url: " + classifiedDTO.getUrl() + ", title:" + classifiedDTO.getTitle());
        return classifiedDTO;
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

    @PostMapping("/model/{url}")
    public UrlDTO insertUrl(@PathVariable String url, @RequestBody String category){
        return userService.insertUrl(url,category);
    }

    @PostMapping("/user/{email}")
    public UrlDTO insertUserUrl(@PathVariable String url, @RequestBody String category){
        return userService.insertUserUrl(url,category);
    }
    */
}