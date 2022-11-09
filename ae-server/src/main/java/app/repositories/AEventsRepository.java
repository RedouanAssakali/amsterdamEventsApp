package app.repositories;

import app.models.AEvent;

import java.util.List;


public interface AEventsRepository {
    List<AEvent> findAll();

    AEvent findById(long id);

    AEvent save(AEvent aEvent);

    AEvent deleteById(long id);

    List<AEvent> findByQuery(String jpqlName, Object params);


}
