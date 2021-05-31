package sm.chromeScreentime.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import javax.persistence.Entity;
import java.util.ArrayList;

@Getter
@Setter
@Entity
public class User {
    @Id
    private String userId;
    private String username;
    private ArrayList<String> ent;
    private ArrayList<String> prod;
    private ArrayList<String> sns;
    private ArrayList<String> shop;
    private ArrayList<String> edu;
    private ArrayList<String> business;
    private ArrayList<String> etc;

    public User(String userId, String username, ArrayList<String> ent, ArrayList<String> prod, ArrayList<String> sns, ArrayList<String> shop, ArrayList<String> edu, ArrayList<String> business, ArrayList<String> etc) {
        this.userId = userId;
        this.username = username;
        this.ent = ent;
        this.prod = prod;
        this.sns = sns;
        this.shop = shop;
        this.edu = edu;
        this.business = business;
        this.etc = etc;
    }

    public User(){

    }
}
