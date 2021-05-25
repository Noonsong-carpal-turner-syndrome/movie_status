package sm.chromeScreentime.Service;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.transaction.annotation.Transactional;
import sm.chromeScreentime.model.User;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(locations = {"file:src/main/webapp/WEB-INF/applicationContext.xml"})
@Transactional
@Rollback(value = false)
public class PetTest {

    @Autowired
    MongoTemplate mongoTemplate;

@Test
public void queryTest(){
        User user = User.builder().email("randallkk@sookmyung.ac.kr").build();
        mongoTemplate.insert(user);

        // 변경된 부분 -> name이 아닌 _id로 질의한다.
        Query query = new Query(Criteria.where("_id").is(user.getId()));

        User findUser = mongoTemplate.findOne(query, User.class, "users");

        assertThat(user.getId(), equalTo(findUser.getId()));
        assertThat(user.getUrls(), equalTo(findUser.getUrls()));
        }
