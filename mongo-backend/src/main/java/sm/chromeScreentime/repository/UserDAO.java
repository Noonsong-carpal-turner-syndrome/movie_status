package sm.chromeScreentime.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

@Repository("userDAO")
public class UserDAO {

    @Autowired
    MongoTemplate mongoTemplate;



}