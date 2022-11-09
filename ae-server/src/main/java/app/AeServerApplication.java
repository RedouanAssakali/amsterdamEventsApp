package app;

import app.models.AEvent;
import app.models.Registration;
import app.repositories.AEventsRepository;
import app.repositories.AEventsRepositoryJpa;
import app.repositories.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@SpringBootApplication
public class AeServerApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(AeServerApplication.class, args);
    }
    @Autowired
    private AEventsRepository aEventsRepository;

     @Autowired
    private RegistrationRepository registrationRepository;

    @Override
    public void run(String... args) throws Exception {
        this.createInitalAEvents();
    }


    private void createInitalAEvents(){
        // check whether the repo is empty
        List<AEvent> aEvents = this.aEventsRepository.findAll();
        if (aEvents.size()>0) return;
        System.out.println("Configuring some initial aEvent data");



        for (int i = 0; i < 9 ; i++) {

            AEvent aEvent = AEvent.createSampleAEvent();
            Registration registration = new Registration(null,"TICKET00231357",false, LocalDateTime.now(),aEvent);
            aEvent.addRegistration(registration);
            this.aEventsRepository.save(aEvent);

        }
    }



}
