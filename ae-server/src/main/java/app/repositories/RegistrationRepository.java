package app.repositories;

import app.models.Registration;

import java.util.List;

public interface RegistrationRepository {
    List<Registration> findAll();

    Registration findById(long id);

    Registration save(Registration registration);

    Registration deleteById(long id);

}
