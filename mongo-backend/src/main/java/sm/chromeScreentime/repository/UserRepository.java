package sm.chromeScreentime.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import sm.chromeScreentime.model.UserEntity;

import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<UserEntity, ObjectId> {
    List<UserEntity> findByEmail(String email);
}
