package co.unbosque.mondsinc.models;

import java.util.List;
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


    public Documment(String reference, String application, List<Order> order) {
        this.reference = reference;
        this.application = application;
        this.order = order;
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
