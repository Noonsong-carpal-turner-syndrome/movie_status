package sm.chromeScreentime.Service;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import sm.chromeScreentime.model.UrlDTO;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;

public class UrlService {
    @RequestMapping("/classification")

    @ResponseBody
    public String Classify(UrlDTO urldto) {
        String url = urldto.getUrl();
        String title = urldto.getTitle();
        String data = String.format("{\"url\":%s,\"title\":%s}",url,title); // json
        String addr = "http://127.0.0.1:5000/classify"; // flask 서버 주소
        String sb = "";
        try {
            HttpURLConnection conn = (HttpURLConnection) new URL(addr).openConnection();

            OutputStreamWriter osw = new OutputStreamWriter(conn.getOutputStream());    // flask에 POST
            osw.write(data);

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8));   // flsak에서 GET

            String line = null;
            sb = sb + line ;

            osw.flush();
            osw.close();
            br.close();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return sb;
    }
}
