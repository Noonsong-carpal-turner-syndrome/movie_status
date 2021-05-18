package sm.chromeScreentime.domain;

import org.springframework.stereotype.Service;
import sm.chromeScreentime.domain.dto.UserDTO;
import sm.chromeScreentime.domain.repository.UserRepository;
import sm.chromeScreentime.domain.request.UserDeleteRequest;
import sm.chromeScreentime.domain.request.UserRequestBody;
import sm.chromeScreentime.domain.request.UserSearchRequest;
import sm.chromeScreentime.domain.request.UserUpdateRequest;

@Service
public class UserService {

    private UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public UserDTO searchUserInfo(UserSearchRequest request){
        return new UserDTO(userRepository.findById(request.getUserId()).orElse(null));
    }

    public String saveUserInfo(UserRequestBody requestBody){
        userRepository.save(requestBody.toEntity());
        return "userID : " + requestBody.getUserId() + "\n"
                +"username : "+requestBody.getUsername()+"\n"
                +"ent : "+requestBody.getEnt()+"\n"
                +"prod : "+requestBody.getProd()+"\n"
                +"sns : "+requestBody.getSns()+"\n"
                +"shop : "+requestBody.getShop()+"\n"
                +"edu : "+requestBody.getEdu()+"\n"
                +"business : "+requestBody.getBusiness()+"\n"
                +"etc : "+requestBody.getEtc();
    }

    public String updateUserInfo(UserUpdateRequest request){
        //userDao.insert(request);
        return "";
    }
    public String deleteUserInfo(UserDeleteRequest request){
        //userDao.insert(request);
        return "";
    }
}
