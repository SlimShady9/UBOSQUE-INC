package co.unbosque.mondsinc.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("SaveDocument")
public class SaveDocument {

    @Id
    private String id;

    private double fsp;
    private double ibc;
    private double ingreso_total;
    private double salud;
    private double pension;
    private double arl;
    
    @DBRef
    private Order order;

    public SaveDocument(double fsp, double ibc, double ingreso_total, double salud,
                        double pension, double arl){
        this.fsp= fsp;
        this.ibc= ibc;
        this.ingreso_total= ingreso_total;
        this.salud= salud;
        this.pension= pension;
        this.arl= arl;
    }


    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public double getFsp() {
        return this.fsp;
    }

    public void setFsp(double fsp) {
        this.fsp = fsp;
    }

    public double getIbc() {
        return this.ibc;
    }

    public void setIbc(double ibc) {
        this.ibc = ibc;
    }

    public double getIngreso_total() {
        return this.ingreso_total;
    }

    public void setIngreso_total(double ingreso_total) {
        this.ingreso_total = ingreso_total;
    }

    public double getSalud() {
        return this.salud;
    }

    public void setSalud(double salud) {
        this.salud = salud;
    }

    public double getPension() {
        return this.pension;
    }

    public void setPension(double pension) {
        this.pension = pension;
    }

    public double getArl() {
        return this.arl;
    }

    public void setArl(double arl) {
        this.arl = arl;
    }

    public Order getOrder() {
        return this.order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", fsp='" + getFsp() + "'" +
            ", ibc='" + getIbc() + "'" +
            ", ingreso_total='" + getIngreso_total() + "'" +
            ", salud='" + getSalud() + "'" +
            ", pension='" + getPension() + "'" +
            ", arl='" + getArl() + "'" +
            ", order='" + getOrder() + "'" +
            "}";
    }

}