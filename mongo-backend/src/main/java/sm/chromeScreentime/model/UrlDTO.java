package sm.chromeScreentime.model;

import lombok.*;
import org.bson.types.ObjectId;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class UrlDTO {

    private ObjectId _id;
    @NonNull private String url;
    private String label;
    private String domain;
    private String title;

    public UrlDTO(String url, String label) {
        this.url = url;
        this.label = label;
        //this.domain = ;
    }

    public UrlDTO(UrlEntity urlentity, String title) {
        this.url = urlentity.getUrl();
        this.label = urlentity.getLabel();
        this.domain = urlentity.getDomain();
        this.title = title;
    }

    public UrlDTO(UrlDTO urldto, String title) {
        this.url = urldto.getUrl();
        this.label = urldto.getLabel();
        this.domain = urldto.getDomain();
        this.title = title;
    }

    public UrlDTO changeLabel(String newLabel) {
        this.label = newLabel;
        return this;
    }

}
