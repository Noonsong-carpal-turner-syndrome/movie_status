package sm.chromeScreentime.Service;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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

    public List<UserEntity> findByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public UrlEntity findByUrl(ObjectId url){
        return urlRepository.findByUrl(url);
    }

    public List<UrlEntity> findByDomainLike(String domain){
        return urlRepository.findByDomainLike(domain);
    }

    public List<UrlEntity> findByCategory(String category){
        return urlRepository.findByCategory(category);
    }
}
