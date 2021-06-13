package sm.chromeScreentime.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;
import sm.chromeScreentime.model.UrlDTO;
import sm.chromeScreentime.model.UrlEntity;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

// DAO: persistant layer: C(R)UD from DB to Entity
@Repository
public class UrlDAO {
    private MongoOperations operations;

    @Autowired
    UrlRepository urlRepository;

    @Autowired
    public UrlDAO(MongoTemplate template) {
        Assert.notNull(template, "MongoTemplate must not be null!");
        this.operations = template;
    }
/*
    public List<UrlEntity> findAllByLike(String url) {
        Query query = getQuery(url);
        List<UrlEntity> boards = operations.find(query, UrlEntity.class);
        return boards;
    }

    private Query getQuery(String url) {
        Query query = new Query();
        // 일단 냅다 쿼리
        query.addCriteria(new Criteria().orOperator(Criteria.where("contents")));
        // 결과가 있으면 if (searchType.equals(SearchType.ALL))
        // 없으면

        return query.with((org.springframework.data.domain.Pageable) pageable);
    }

    public UpdateResult update(ObjectId id, UrlEntity updatedEntity) {
        Query query = new Query(Criteria.where("_id").is(id));
        Update update = getUpdate(updatedEntity);
        return operations.updateFirst(query, update, UrlEntity.class);
    }
*/
    // 단순 복붙이니 확인할 것
    private Update getUpdate(UrlEntity updatedEntity) {

        try {
            List getterMethodNames = getUrlEntityGetterMethodName();
            Update update = new Update().currentDate("updatedAt");

            for (Method method : UrlEntity.class.getDeclaredMethods()) {
                if (getterMethodNames.contains(method.getName())) {
                    Object obj = method.invoke(updatedEntity);
                    Optional.ofNullable(obj).ifPresent(none -> update.set(getField(method), obj));
                }
            }

            return update;

        } catch (IllegalAccessException | InvocationTargetException e) {
            e.getStackTrace();
            throw new RuntimeException();
        }
    }

    private List getUrlEntityGetterMethodName() {
        Field[] fields = UrlEntity.class.getDeclaredFields();
        return Arrays.asList(fields).stream().map(field -> "get" + field.getName().substring(0, 1).toUpperCase() + field.getName().substring(1)).collect(Collectors.toList());
    }

    private String getField(Method method) {
        String Field = method.getName().substring(3);
        return Field.substring(0, 1).toLowerCase() + Field.substring(1);
    }

    /*public UrlDTO insertUrl(String url, String label){
        urlRepository.save(url, label);
    }*/
}