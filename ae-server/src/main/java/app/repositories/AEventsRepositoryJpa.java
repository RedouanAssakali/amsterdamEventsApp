package app.repositories;

import app.models.AEvent;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.NamedQuery;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

/**
 * This method <description of functionality>
 *
 * @outhor redouanassakali
 * @author yusraghazi
 */
@Primary
@Repository
@Transactional
public class AEventsRepositoryJpa implements AEventsRepository {
    @PersistenceContext
    private EntityManager entityManager;


    @Override
    public List<AEvent> findAll() {
        TypedQuery<AEvent> namedQuery = entityManager.createNamedQuery("find_all_aevents", AEvent.class);

        return namedQuery.getResultList();
    }

    @Override
    public AEvent findById(long id) {

        return this.entityManager.find(AEvent.class,id);
    }
    @Override
    public AEvent save(AEvent aEvent) {
        return this.entityManager.merge(aEvent);
    }

    @Override
    public AEvent deleteById(long id) {
      AEvent  removingAevent = findById(id);
         this.entityManager.remove(removingAevent);
        return removingAevent;
    }

    @Override
    public List<AEvent> findByQuery(String jpqlName, Object params) {
        TypedQuery<AEvent> query = entityManager.createNamedQuery(jpqlName, AEvent.class);

        query.setParameter(1, params);
        return query.getResultList();

    }
}
