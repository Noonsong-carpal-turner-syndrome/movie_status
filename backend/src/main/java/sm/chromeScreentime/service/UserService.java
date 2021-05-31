package sm.chromeScreentime.service;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sm.chromeScreentime.model.UrlDTO;
import sm.chromeScreentime.model.UrlEntity;
import sm.chromeScreentime.model.UserEntity;
import sm.chromeScreentime.repository.UrlRepository;
import sm.chromeScreentime.repository.UserRepository;

import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UrlRepository urlRepository;

    public List<UserEntity> findByEmail(String email, UserEntity.CustomUrl[] urls){
        return userRepository.findByEmail(email, urls);
    }

    public UrlEntity findByUrl(ObjectId url, String label){
        return urlRepository.findByUrl(url,label);
    }

    public List<UrlEntity> findByDomainLike(String domain){
        return urlRepository.findByDomainLike(domain);
    }

    public List<UrlEntity> findByCategory(String category){
        return urlRepository.findByCategory(category);
    }

    public List<UrlDTO> insertUrl(ObjectId url, String category){
        return urlRepository.insertUrl(url, category);
    }

    public List<UrlDTO> insertUserUrl(ObjectId url, String category){
        return urlRepository.insertUserUrl(url, category);
    }

}