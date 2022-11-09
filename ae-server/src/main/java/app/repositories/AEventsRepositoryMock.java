package app.repositories;

import app.models.AEvent;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class AEventsRepositoryMock implements AEventsRepository{

    private List<AEvent> aEvents;

    public AEventsRepositoryMock(){
        aEvents = new ArrayList<>();
    }



    @Override
    public List<AEvent> findAll() {
        return aEvents;
    }

    @Override
    public AEvent findById(long id) {
        for (AEvent aEvent: aEvents) {
            if(aEvent.getId() == id){
                return aEvent;
            }
        }
        return null;
    }

    @Override
    public AEvent save(AEvent aEvent) {
        if (aEvent.getId() == 0){
            aEvent.setId(this.nextId());
            this.aEvents.add(aEvent);
        }else{
            for (AEvent aEvent1: aEvents) {
                if (aEvent1.getId() == aEvent.getId()){
                    int index = aEvents.indexOf(aEvent1);
                    this.aEvents.set(index, aEvent1);

                }
            }
        }
        return aEvent;
    }

    @Override
    public AEvent deleteById(long id) {
        AEvent foundAEvent;
        for (AEvent aEvent2 : aEvents) {
            if (aEvent2.getId() == id){
                foundAEvent = aEvent2;
                int index = aEvents.indexOf(foundAEvent);
                aEvents.remove(index);
                return foundAEvent;
            }
        }
        return null;
    }

    @Override
    public List<AEvent> findByQuery(String jpqlName, Object params) {
        return null;
    }

    private long nextId() {
        if (this.aEvents.size() == 0){
            return 20001;
        }else{
            return this.aEvents.get(this.aEvents.size()-1).getId()+3;
        }
    }
}
