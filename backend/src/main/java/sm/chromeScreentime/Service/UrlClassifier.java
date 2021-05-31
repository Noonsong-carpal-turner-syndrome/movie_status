package sm.chromeScreentime.Service;


import org.springframework.web.bind.annotation.RequestMapping;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;

public class UrlClassifier {
    @RequestMapping("/classify")
    public String Classify(String url, String title) {
        String data = String.format("{\"url\":%s,\"title\":%s}",url,title);
        String addr = "http://127.0.0.1:5000/classify";
        String sb = "";
        try {
            HttpURLConnection conn = (HttpURLConnection) new URL(addr).openConnection();

            OutputStreamWriter osw = new OutputStreamWriter(conn.getOutputStream());
            osw.write(data);
            osw.flush();

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8));

            String line = null;

            while ((line = br.readLine()) != null) {
                sb = sb + line + "\n";
            }
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
