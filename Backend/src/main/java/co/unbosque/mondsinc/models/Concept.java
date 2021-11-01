package co.unbosque.mondsinc.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Concept")
public class Concept {
    
    @Id
    private String id;

    private String nombre;
    private double valor;

    public Concept(String nombre, double valor){
        this.nombre = nombre;
        this.valor = valor;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNombre() {
        return this.nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public double getValor() {
        return this.valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", valor='" + getValor() + "'" +
            "}";
    }
    
}
