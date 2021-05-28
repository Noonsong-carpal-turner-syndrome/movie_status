package sm.chromeScreentime.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;

@Repository("userDAO")
public class UserDAO {

    @Autowired
    MongoTemplate mongoTemplate;

    @GetMapping("/queryTest")
    public void queryTest() {
        User user = User.builder().email("randallkk@sookmyung.ac.kr").build();
        mongoTemplate.insert(user);

        // 변경된 부분 -> name이 아닌 _id로 질의한다.
        Query query = new Query(Criteria.where("_id").is(user.getId()));

        User findUser = mongoTemplate.findOne(query, User.class, "users");

        assertThat(user.getId(), equalTo(findUser.getId()));
        assertThat(user.getUrls(), equalTo(findUser.getUrls()));
    }
}