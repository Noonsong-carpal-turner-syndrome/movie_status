package sm.chromeScreentime.domain.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import sm.chromeScreentime.domain.model.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

}
