package sm.chromeScreentime.model;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "users")
@Builder
public class UrlEntity {

    private String url;
    private String label;
    private String domain;

}