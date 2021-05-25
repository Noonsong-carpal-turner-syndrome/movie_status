package sm.chromeScreentime.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Getter

@Data
@AllArgsConstructor
public class User {
    @Id
    private String id;
    private String[] urls;

    @Builder
    public User(String email, String[] urls){
        this.id = email;
        this.urls = urls;
    }
}
