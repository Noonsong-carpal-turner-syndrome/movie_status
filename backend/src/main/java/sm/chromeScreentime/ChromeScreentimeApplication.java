package sm.chromeScreentime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import sm.chromeScreentime.repository.UrlRepository;
import sm.chromeScreentime.repository.UserRepository;

@SpringBootApplication
public class ChromeScreentimeApplication {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UrlRepository urlRepository;

	public static void main(String[] args) {
		SpringApplication.run(ChromeScreentimeApplication.class, args);
	}

}
