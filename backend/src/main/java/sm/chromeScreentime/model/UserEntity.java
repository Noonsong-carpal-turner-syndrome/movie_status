package sm.chromeScreentime.model;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Data
@Builder
@Document(collection = "users")
public class UserEntity {   // UserData와 같은 역할

    private String email;
    private ArrayList<String> favorites; // domain
    private ArrayList<UserDTO.CustomUrl> urls;  // custom url: embedded entities
    private Integer minutes;

    @Data
    @Builder
    public static class CustomUrl{
        private String url;
        private String label;
        private String domain;
    }

}