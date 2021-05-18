package sm.chromeScreentime.domain.request;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
public class UserDeleteRequest {
    private ArrayList<String> ent;
    private ArrayList<String> prod;
    private ArrayList<String> sns;
    private ArrayList<String> shop;
    private ArrayList<String> edu;
    private ArrayList<String> business;
    private ArrayList<String> etc;

    @Override
    public String toString() {
        return "UserUpdateRequest{" +
                "ent=" + ent +
                ", prod=" + prod +
                ", sns=" + sns +
                ", shop=" + shop +
                ", edu=" + edu +
                ", business=" + business +
                ", etc=" + etc +
                '}';
    }
}
