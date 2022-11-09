package app.rest;
import app.exceptions.AEventNotFoundException;
import app.exceptions.PreConditionFailed;
import app.models.AEvent;
import app.models.Registration;
import app.repositories.AEventsRepository;
import app.repositories.RegistrationRepository;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.net.URI;
import java.util.List;
import java.util.Map;


@RestController
public class AEventsController {

    @Autowired
    private AEventsRepository aEventsRepository;

    @Autowired
    private RegistrationRepository registrationRepository;

    @GetMapping("/aevents")
    public List<AEvent> getAllAEvents(@RequestParam(required = false) Map<String, Object> params){

        if (params.size() > 1){
            throw new PreConditionFailed("Can only handle one request parameter title=, status= or minRegistrations=");
        }

        if(params.get("title") != null){
            return this.aEventsRepository.findByQuery("AEvent_find_by_title", params.get("title"));
        }else if (params.get("status") != null){
            AEvent.AEventStatus status = null;

            switch (params.get("status").toString()) {
                case "DRAFT" -> status = AEvent.AEventStatus.DRAFT;
                case "CANCELED" -> status = AEvent.AEventStatus.CANCELED;
                case "PUBLISHED" -> status = AEvent.AEventStatus.PUBLISHED;

            }
            if (status == null){
                throw new PreConditionFailed("Status is not a valid aEvent " + params.get("status"));
            }

            return this.aEventsRepository.findByQuery("AEvent_find_by_status",status);
        }else if (params.get("minRegistrations") != null){
            return this.aEventsRepository.findByQuery("AEvent_find_by_minRegistrations",( Integer.parseInt((String) params.get("minRegistrations") )));
        }
        return aEventsRepository.findAll();
    }


    @GetMapping("/aevents/{id}")
    public ResponseEntity<AEvent> getEventById(@PathVariable int id) {

        AEvent aEvent = aEventsRepository.findById(id);
        if(aEvent == null) {
            throw new AEventNotFoundException("id="+ id);
        }
        return ResponseEntity.ok().body(aEvent);
    }

    @PostMapping("/aevents")
    public ResponseEntity<AEvent> createAEvent(@RequestBody AEvent aEvent){
        AEvent savedAEvent = aEventsRepository.save(aEvent);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedAEvent.getId()).toUri();
        return ResponseEntity.created(location)
                .body(savedAEvent);
    }

    @PutMapping("/aevents/{id}")
    public ResponseEntity<AEvent> updateAEvent(@PathVariable long id, @RequestBody AEvent aEvent){
        if (id != aEvent.getId()){
            throw new PreConditionFailed("AEvent-id="+aEvent.getId() + " does not match id in path parameter: "+id);
        }
     AEvent aEvent1 = aEventsRepository.findById(id);
            if(aEvent1 == null){
                throw new AEventNotFoundException("id="+id);
            }
            aEvent1.setTitle(aEvent.getTitle());
            aEvent1.setDescription(aEvent.getDescription());
            aEvent1.setStart(aEvent.getStart());
            aEvent1.setEnd(aEvent.getEnd());
            aEvent1.setParticipationFee(aEvent.getParticipationFee());
            aEvent1.setMaxParticipants(aEvent.getMaxParticipants());
            aEvent1.setTicketed(aEvent.isTicketed());

        AEvent savedAEvent = aEventsRepository.save(aEvent);
        return ResponseEntity.ok(savedAEvent);
    }

    @DeleteMapping("/aevents/{id}")
    public ResponseEntity<AEvent> updateAEvent(@PathVariable long id){

        AEvent aEvent1 = aEventsRepository.findById(id);
        if(aEvent1 == null){
            throw new AEventNotFoundException("id="+id);
        }

        AEvent savedAEvent = aEventsRepository.deleteById(id);
        return ResponseEntity.ok(savedAEvent);
    }

    @GetMapping("/aevents/summary")
    @JsonView(AEvent.AEventView.AEventSummary.class)
    public List<AEvent> getAllEventsFiltered() {
        return aEventsRepository.findAll();
    }

    @PostMapping("/aevents/{id}/register")
    public ResponseEntity<Registration> registerToAEvent(@PathVariable long id,@RequestBody Registration registration){

        AEvent aEvent = aEventsRepository.findById(id);

        registration = aEvent.createNewRegistration(registration.getSubmissionDate());
        Registration addingRegistration =  registrationRepository.save(registration);
        this.aEventsRepository.save(aEvent);
    return ResponseEntity.ok(addingRegistration);
    }
}
