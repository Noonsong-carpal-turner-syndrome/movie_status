package sm.chromeScreentime.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import sm.chromeScreentime.model.UrlEntity;
import java.util.List;

@Repository
public interface UrlRepository extends MongoRepository<UrlEntity, ObjectId> {
    UrlEntity findByUrl(ObjectId url, String label);
    List<UrlEntity> findByDomainLike(String domain);
    List<UrlEntity> findByCategory(String category);
}