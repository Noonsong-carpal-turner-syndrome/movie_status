package sm.chromeScreentime.domain.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import sm.chromeScreentime.domain.controller.model.UserData;

@Repository
public interface UserRepository extends MongoRepository<UserData, String> {

}
