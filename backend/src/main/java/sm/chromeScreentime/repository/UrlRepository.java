package sm.chromeScreentime.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import sm.chromeScreentime.model.UrlDTO;
import sm.chromeScreentime.model.UrlEntity;
import java.util.List;

@Repository
public interface UrlRepository extends MongoRepository<UrlEntity, ObjectId> {

    UrlEntity findByUrl(ObjectId url, String label);
    List<UrlEntity> findByDomainLike(String domain);
    List<UrlEntity> findByCategory(String category);

    //모델 돌린 후 return 값 받아 오기 - UrlDTO 채워넣어야 함
    List<UrlDTO> insertUrl(ObjectId url,String category);

    //user가 custom 있을 때 리턴값 받아 오기 - UrlDTO 채워넣어야 함
    List<UrlDTO> insertUserUrl(ObjectId url, String category);


}