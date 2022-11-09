package app.models;

import app.exceptions.PreConditionFailed;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonView;
import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@NamedQuery(name = "find_all_aevents", query = "select e from AEvent e")
@NamedQuery(name = "AEvent_find_by_status", query = "select s from AEvent s where s.status = ?1")
@NamedQuery(name = "AEvent_find_by_title", query = "select t from AEvent t where t.title like ?1")
@NamedQuery(name = "AEvent_find_by_minRegistrations", query = "select r from AEvent r where r.registrations.size >= ?1")

@Entity
public class AEvent {

    @JsonView(AEventView.AEventSummary.class)
    @Id
    @TableGenerator(name = "id", initialValue = 20000)
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "id")
    private long id;

    @JsonView(AEventView.AEventSummary.class)
    private String title;
    private Date start;
    private Date end;
    private String description;

    @JsonView(AEventView.AEventSummary.class)
    @Enumerated(EnumType.STRING)
    private AEventStatus status;
    private double participationFee;
    private int maxParticipants;
    private boolean ticketed;



    @OneToMany(cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Registration> registrations = new ArrayList<>();

    public AEvent() {
    }

    public AEvent(int id, String title, Date start, Date end, String description, AEventStatus status, double participationFee, int maxParticipants, boolean ticketed,List<Registration> registration ) {
        this.id = id;
        this.title = title;
        this.start = start;
        this.end = end;
        this.description = description;
        this.status = status;
        this.participationFee = participationFee;
        this.maxParticipants = maxParticipants;
        this.ticketed = ticketed;
        this.registrations = registration;
    }

    public AEvent(String title) {
        this.id = 0;
        this.title = title;
        this.start = null;
        this.end = null;
        this.description = null;
        this.status = null;
        this.participationFee = 0.0;
        this.maxParticipants = 0;
        this.ticketed = false;
    }

    public AEvent(long id) {
        this.id = id;
        this.title = null;
        this.start = null;
        this.end = null;
        this.description = null;
        this.status = null;
        this.participationFee = 0.0;
        this.maxParticipants = 0;
        this.ticketed = false;
    }


    public static AEvent createSampleAEvent() {
        Date dateToday = new Date();
        Date maxStartDate = new Date();
        Date maxEndDate = new Date();

        AEvent aEvent = new AEvent();
        aEvent.setTitle("The event-" );
        aEvent.setDescription("Description of event- " );

        //start date
        maxStartDate.setDate(dateToday.getDay() + 10);
        Date randomStartDate = createRandomDate(dateToday, maxStartDate);
        aEvent.setStart(randomStartDate);

        //end date
        maxEndDate.setDate(randomStartDate.getDay() + 10);
        Date randomEndDate = createRandomDate(randomStartDate, maxEndDate);
        aEvent.setEnd(randomEndDate);

        aEvent.setStatus(getRandomStatus());
        aEvent.setParticipationFee(Math.round(Math.random() * 4900));
        aEvent.setMaxParticipants((int) Math.round(Math.random() * 1000));
        aEvent.setTicketed(aEvent.getParticipationFee() != 0);
        return aEvent;
    }


    public enum AEventStatus {
        DRAFT("DRAFT"),
        PUBLISHED("PUBLISHED"),
        CANCELED("CANCLED");

        private final String text;

        AEventStatus(final String text) {
            this.text = text;
        }

        @Override
        public String toString() {
            return text;
        }
    }


    private static Date createRandomDate(Date start, Date end) {
        return new Date((long) (start.getTime() + Math.random() * (end.getTime() - start.getTime())));
    }

    private static AEventStatus getRandomStatus() {
        int statusNumber = (int) Math.round(Math.random() * 3);
        if (statusNumber == 0) {
            return AEventStatus.DRAFT;
        } else if (statusNumber == 1) {
            return AEventStatus.PUBLISHED;
        } else return AEventStatus.CANCELED;
    }

    public class AEventView {
        public static class AEventSummary {
        }
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public Date getEnd() {
        return end;
    }

    public void setEnd(Date end) {
        this.end = end;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public AEventStatus getStatus() {
        return status;
    }

    public void setStatus(AEventStatus status) {
        this.status = status;
    }

    public double getParticipationFee() {
        return participationFee;
    }

    public void setParticipationFee(double participationFee) {
        this.participationFee = participationFee;
    }

    public int getMaxParticipants() {
        return maxParticipants;
    }

    public void setMaxParticipants(int maxParticipants) {
        this.maxParticipants = maxParticipants;
    }

    public boolean isTicketed() {
        return ticketed;
    }

    public void setTicketed(boolean ticketed) {
        this.ticketed = ticketed;
    }
    public List<Registration> getRegistrations() {
        return registrations;
    }


    public void addRegistration(Registration registrations) {
        this.registrations.add(registrations);
    }

    public int getNumberOfRegistrations(){
        return getRegistrations().size();
    }


    public Registration createNewRegistration(LocalDateTime submissionDateTime) {
       if (getNumberOfRegistrations() >= getMaxParticipants()){
           throw new PreConditionFailed("AEvent with id:"+getId()+" is sold-out!");
       }

        if (getStatus() != AEventStatus.PUBLISHED){
            throw new PreConditionFailed("AEvent with id:"+getId()+" is not published!");
        }
      Registration registration = new Registration();
      registration.setSubmissionDate(submissionDateTime);
      registration.setTicketCode("e"+ Math.round(Math.random()*999)+"B"+ Math.round(Math.random()*999));
      registration.setPaid(true);
      registration.setaEvent(this);
      addRegistration(registration);

      return registration;
    }





}