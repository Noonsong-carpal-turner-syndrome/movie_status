package sm.chromeScreentime.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import sm.chromeScreentime.model.UserData;

@Repository
public interface UserRepository extends MongoRepository<UserData, String> {

}
