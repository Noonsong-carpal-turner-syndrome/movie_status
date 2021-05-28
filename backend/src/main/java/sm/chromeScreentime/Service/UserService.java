package sm.chromeScreentime.Service;

import sm.chromeScreentime.repository.UrlRepository;
import sm.chromeScreentime.repository.UserRepository;

public class UserService {
    private UserRepository userRepository;
    private UrlRepository urlRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public UserService(UrlRepository urlRepository){
        this.urlRepository = urlRepository;
    }


}
