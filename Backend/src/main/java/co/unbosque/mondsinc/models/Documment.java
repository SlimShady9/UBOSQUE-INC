package co.unbosque.mondsinc.models;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Documment")
public class Documment {
    
    @Id
    private String id;

    private String reference;
    private String application; 
   
    @DBRef(lazy = true)
    private List<Order> order;

    private Date date;


    public Documment(String reference, String application, List<Order> order, Date date) {
        this.reference = reference;
        this.application = application;
        this.order = order;
        this.date = date;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getReference() {
        return this.reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public String getApplication() {
        return this.application;
    }

    public void setApplication(String application) {
        this.application = application;
    }

    public List<Order> getOrder() {
        return this.order;
    }

    public void setOrder(List<Order> order) {
        this.order = order;
    }

    public Date getDate() {
        return this.date;
    }

    public void setDate(Date date) {
        this.date = date;
    }


    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", reference='" + getReference() + "'" +
            ", application='" + getApplication() + "'" +
            ", order='" + getOrder() + "'" +
            "}";
    }

}
