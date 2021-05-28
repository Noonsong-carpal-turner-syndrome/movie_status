package sm.chromeScreentime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ChromeScreentimeApplication {

	@Autowired
	private UserRepository userRepository;

	public static void main(String[] args) {
		SpringApplication.run(ChromeScreentimeApplication.class, args);
	}

	public void run(String[] args) throws Exception {
		/* 데이터를 model에 하나하나 저장하고
		*
		 */
	}
}
