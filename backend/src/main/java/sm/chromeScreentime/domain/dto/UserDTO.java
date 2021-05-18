package sm.chromeScreentime.domain.dto;

import lombok.Getter;
import lombok.Setter;
import sm.chromeScreentime.domain.model.User;

import java.util.ArrayList;

@Getter
@Setter
public class UserDTO {
    private String userId;
    private String username;
    private ArrayList<String> ent;
    private ArrayList<String> prod;
    private ArrayList<String> sns;
    private ArrayList<String> shop;
    private ArrayList<String> edu;
    private ArrayList<String> business;
    private ArrayList<String> etc;

    public UserDTO(User entity){
        this.userId = entity.getUserId();
        this.username = entity.getUsername();
        this.ent = entity.getEnt();
        this.prod = entity.getProd();
        this.sns = entity.getSns();
        this.shop = entity.getShop();
        this.edu = entity.getEdu();
        this.business = entity.getBusiness();
        this.etc = entity.getEtc();
    }
}
