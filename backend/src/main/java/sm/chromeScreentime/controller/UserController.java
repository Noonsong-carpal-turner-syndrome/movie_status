package sm.chromeScreentime.controller;

import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;
import sm.chromeScreentime.service.UserService;
import sm.chromeScreentime.domain.dto.UserDTO;
import sm.chromeScreentime.domain.request.UserDeleteRequest;
import sm.chromeScreentime.domain.request.UserRequestBody;
import sm.chromeScreentime.domain.request.UserSearchRequest;
import sm.chromeScreentime.domain.request.UserUpdateRequest;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    public UserController (UserService userService){
        this.userService = userService;
    }

    @ApiOperation("사용자용 신규 데이터 생성")
    @PostMapping("/info")
    public String userInfoSave(@ModelAttribute UserRequestBody requestBody){
        return userService.saveUserInfo(requestBody);
    }

    //
    @ApiOperation("title을 검색")
    @GetMapping("/id")
    public UserDTO userInfo(@ModelAttribute UserSearchRequest request){

        return userService.searchUserInfo(request);
    }

    //모델에서 가져오기
    @ApiOperation("사용자용 데이터 업데이트")
    @PutMapping("/edit/{id}")
    public String edit(@ModelAttribute UserUpdateRequest request){

        return userService.updateUserInfo(request);
    }

    //검색
    @ApiOperation("사용자용 데이터 삭제")
    @DeleteMapping("/delete/{id}")
    public String delete(@ModelAttribute UserDeleteRequest request){
        return userService.deleteUserInfo(request);
    }


}