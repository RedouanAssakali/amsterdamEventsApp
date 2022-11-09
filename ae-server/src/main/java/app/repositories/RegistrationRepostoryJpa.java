package app.repositories;

import app.models.AEvent;
import app.models.Registration;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

/**
 * This method <description of functionality>
 *
 * @outhor redouanassakali
 */
@Repository
@Transactional
public class RegistrationRepostoryJpa implements RegistrationRepository{
    @PersistenceContext
    private EntityManager entityManager;


    @Override
    public List<Registration> findAll() {
        TypedQuery<Registration> namedQuery = entityManager.createNamedQuery("find_all_registrations", Registration.class);

        return namedQuery.getResultList();
    }

    @Override
    public Registration findById(long id) {
        return this.entityManager.find(Registration.class,id);
    }
    @Override
    public Registration save(Registration registration) {
        return this.entityManager.merge(registration);
    }

    @Override
    public Registration deleteById(long id) {
        Registration  removingRegistration = findById(id);
        this.entityManager.remove(removingRegistration);
        return removingRegistration;
    }
}
