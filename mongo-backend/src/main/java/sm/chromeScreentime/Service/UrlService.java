package sm.chromeScreentime.Service;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;
import sm.chromeScreentime.model.UrlDTO;
import sm.chromeScreentime.model.UrlEntity;
import sm.chromeScreentime.repository.UrlRepository;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

@Service
public class UrlService {

    private UrlRepository urlRepository;

    @Autowired
    public UrlService(UrlRepository urlRepository){
        this.urlRepository = urlRepository;
    }

    @ResponseBody
    public UrlDTO Classify(UrlDTO urldto) {
        String url = urldto.getUrl();
        String title = urldto.getTitle();
        String data = String.format("{\"url\":\"%s\", \"title\":\"%s\"}",url,title); // json

        String addr = "http://127.0.0.1:5000/classify"; // flask 서버 주소
        StringBuilder response = new StringBuilder();
        try {
            HttpURLConnection conn = (HttpURLConnection) new URL(addr).openConnection();
            // int responseCode = conn.getResponseCode();
            // System.out.println(responseCode);
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");  // request body를 json으로 줌
            conn.setRequestProperty("Accept", "application/json");  // response data를 json으로 받음
            conn.setDoOutput(true);
            conn.setDoInput(true);
            OutputStream os = conn.getOutputStream();
            os.write(data.getBytes("utf-8")); // POST 호출
            os.flush();
            os.close();
            // OutputStreamWriter osw = new OutputStreamWriter(conn.getOutputStream());    // flask에 POST
            // osw.write(data);

            BufferedReader br;
            if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
                br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            } else {
                br = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
            }   // flsak response 받기
            String line = null;
            while((line = br.readLine()) != null){
                response.append(line.trim());
            }
            br.close();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        UrlDTO labeledDTO = new UrlDTO(urldto, response.toString());    // response.toString()

        /*
        try{
            urlRepository.findByUrl(labeledDTO.getUrl());
        } catch(IncorrectResultSizeDataAccessException e){
            UrlEntity labeledEntity = UrlEntity.builder().id(new ObjectId()).url(labeledDTO.getUrl()).label(labeledDTO.getLabel()).domain(labeledDTO.getUrl().split("/")[2]).build();
            urlRepository.save(labeledEntity);
            System.out.println(labeledEntity);
            System.out.println("saved");
        }*/

        return labeledDTO;
    }
}
