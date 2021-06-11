package sm.chromeScreentime.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "users")
public class UserEntity {   // UserData와 같은 역할

    private String email;
    private String[] favorites; // domain
    private CustomUrl[] urls;  // custom url: embedded entities

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CustomUrl{
        private String url;
        private String label;
        private String domain;
    }

}
