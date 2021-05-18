package sm.chromeScreentime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import sm.chromeScreentime.domain.repository.UserRepository;

@SpringBootApplication
public class ChromeScreentimeApplication {
	public static void main(String[] args) {
		SpringApplication.run(ChromeScreentimeApplication.class, args);
	}

}
