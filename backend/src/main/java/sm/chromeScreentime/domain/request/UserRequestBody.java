package sm.chromeScreentime.domain.request;

import lombok.Getter;
import lombok.Setter;
import sm.chromeScreentime.domain.model.User;

import java.util.ArrayList;

@Getter
@Setter
public class UserRequestBody {
    private String userId;
    private String username;
    private ArrayList<String> ent;
    private ArrayList<String> prod;
    private ArrayList<String> sns;
    private ArrayList<String> shop;
    private ArrayList<String> edu;
    private ArrayList<String> business;
    private ArrayList<String> etc;

    public User toEntity(){
        return new User(this.userId, this.username, this.ent, this.prod, this.sns,this.shop,this.edu,this.business,this.etc);
    }
}
