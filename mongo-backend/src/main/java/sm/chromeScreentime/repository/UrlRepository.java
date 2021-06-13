package sm.chromeScreentime.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import sm.chromeScreentime.model.UrlDTO;
import sm.chromeScreentime.model.UrlEntity;
import java.util.ArrayList;

// Repository: domain layer:
@Repository
public interface UrlRepository extends MongoRepository<UrlEntity, ObjectId> {

    UrlEntity findByUrl(String url);
    ArrayList<UrlEntity> findByDomainLike(String domain);
    ArrayList<UrlEntity> findByLabel(String label);

    //모델 돌린 후 return 값 받아 오기 - UrlDTO 채워넣어야 함
    //UrlDTO insertUrl(String url,String category);

    //user가 custom 있을 때 리턴값 받아 오기 - UrlDTO 채워넣어야 함
    //UrlDTO insertUserUrl(String url, String category);


}