package sm.chromeScreentime.domain.controller.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document(collation = "DB_urls")
public class UrlData {

    public ArrayList<String> entertain;

    public ArrayList<String> productivity;

    public ArrayList<String> sns;

    public ArrayList<String> shopping;

    public ArrayList<String> document;

    public ArrayList<String> study;

    public ArrayList<String> career;

    public ArrayList<String> any;
}
