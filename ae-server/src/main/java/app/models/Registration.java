package app.models;

import app.exceptions.PreConditionFailed;
import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * This method <description of functionality>
 *
 * @outhor redouanassakali
 */

@Entity
@NamedQuery(name = "find_all_registrations", query = "select r from Registration r")
public class Registration {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String ticketCode;
    private boolean paid;


    private LocalDateTime submissionDate;
    @ManyToOne(cascade = CascadeType.ALL)
    @JsonBackReference
    private AEvent aEvent;


    public Registration(Long id, String ticketCode, boolean paid, LocalDateTime submissionDate, AEvent aEvent) {
        this.id = id;
        this.ticketCode = ticketCode;
        this.paid = paid;
        this.submissionDate = submissionDate;
        this.aEvent = aEvent;
    }

    public Registration() {}

    public String getTicketCode() {return ticketCode;}

    public void setTicketCode(String ticketCode) {this.ticketCode = ticketCode;}

    public boolean isPaid() {return paid;}

    public void setPaid(boolean paid) {this.paid = paid;}

    public LocalDateTime getSubmissionDate() {return submissionDate;}

    public void setSubmissionDate(LocalDateTime submissionDate) {this.submissionDate = submissionDate;}

    public AEvent getaEvent() {return aEvent;}

    public void setaEvent(AEvent aEvent) {this.aEvent = aEvent;}


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}
