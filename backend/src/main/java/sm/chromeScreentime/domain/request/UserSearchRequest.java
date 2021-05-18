package sm.chromeScreentime.domain.request;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
public class UserSearchRequest {
    private String userId;
    private String username;
    private ArrayList<String> ent;
    private ArrayList<String> prod;
    private ArrayList<String> sns;
    private ArrayList<String> shop;
    private ArrayList<String> edu;
    private ArrayList<String> business;
    private ArrayList<String> etc;
}
