package co.unbosque.mondsinc.controller;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("grocery")
public class GroceryItem {

    @Id
    private String id;

    private String name;
    private int quantity;
    
    public GroceryItem(String name, int quantity) {
        this.name = name;
        this.quantity = quantity;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getQuantity() {
        return this.quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    
    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", name='" + getName() + "'" +
            ", quantity='" + getQuantity() + "'" +
            "}";
    }
    
}
