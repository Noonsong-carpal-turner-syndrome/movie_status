package sm.chromeScreentime.model;

import lombok.*;

import java.util.ArrayList;

public class UserDTO {
    private String email;
    private ArrayList<String> favorites; // domain
    private ArrayList<UserDTO.CustomUrl> urls;  // custom url: embedded entities
    private Integer minutes;

    @Data
    @AllArgsConstructor
    public static class CustomUrl{
        private String url;
        private String label;
        private String domain;
    }

    public void updateCusUrl(UrlDTO urldata, String label) {
        // if 중복이 없으면
        CustomUrl url = new CustomUrl(urldata.getUrl(), label, urldata.getDomain());

        this.urls.add(url);
        // else:
    }

    public void deleteCusUrl(CustomUrl url) {
        // if 존재하면
        this.urls.remove(url);
        //else: pass
    }
}
