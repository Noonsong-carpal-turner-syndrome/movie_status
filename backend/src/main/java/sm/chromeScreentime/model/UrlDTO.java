package sm.chromeScreentime.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.bson.types.ObjectId;

@Getter @Setter
@AllArgsConstructor
public class UrlDTO {

    private ObjectId _id;
    @NonNull private String url;
    private String label;
    private String domain;
    private String title;

    public UrlDTO(UrlEntity urldata, String title) {
        this.url = urldata.getUrl();
        this.label = urldata.getLabel();
        this.domain = urldata.getDomain();
        this.title = title;
    }

    public UrlDTO changeLabel(String newLabel) {
        this.label = newLabel;
        return this;
    }

}
