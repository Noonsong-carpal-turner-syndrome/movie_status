package sm.chromeScreentime.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import sm.chromeScreentime.model.UrlEntity;
import java.util.ArrayList;

// Repository: domain layer:
@Repository
public interface UrlRepository extends MongoRepository<UrlEntity, ObjectId> {
    UrlEntity findByUrl(String url);
    ArrayList<UrlEntity> findByDomainLike(String domain);
    ArrayList<UrlEntity> findByLabel(String label);
}