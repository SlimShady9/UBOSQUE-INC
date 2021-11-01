package co.unbosque.mondsinc.models;

import java.sql.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Order")
public class Order {
    @Id
    private String id;

    @DBRef(lazy = true)
    private List<Concept> concepts;

    private String numOrder;
    private String tpDocumment;
    private int number;
    private String nomContributor;
    private String post;
    private Date data;
    private double salary;
    private int workedDays;
    private int daysDisabled;
    private int daysLicensed;
    private int totalDays;
    private Date admissionDates;

    public Order(List<Concept> concepts, String numOrder, String tpDocumment, int number, String nomContributor, String post, Date data, double salary, int workedDays, int daysDisabled, int daysLicensed, int totalDays, Date admissionDates) {

        this.concepts = concepts;
        this.numOrder = numOrder;
        this.tpDocumment = tpDocumment;
        this.number = number;
        this.nomContributor = nomContributor;
        this.post = post;
        this.data = data;
        this.salary = salary;
        this.workedDays = workedDays;
        this.daysDisabled = daysDisabled;
        this.daysLicensed = daysLicensed;
        this.totalDays = totalDays;
        this.admissionDates = admissionDates;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<Concept> getConcepts() {
        return this.concepts;
    }

    public void setConcepts(List<Concept> concepts) {
        this.concepts = concepts;
    }

    public String getNumOrder() {
        return this.numOrder;
    }

    public void setNumOrder(String numOrder) {
        this.numOrder = numOrder;
    }

    public String getTpDocumment() {
        return this.tpDocumment;
    }

    public void setTpDocumment(String tpDocumment) {
        this.tpDocumment = tpDocumment;
    }

    public int getNumber() {
        return this.number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public String getNomContributor() {
        return this.nomContributor;
    }

    public void setNomContributor(String nomContributor) {
        this.nomContributor = nomContributor;
    }

    public String getPost() {
        return this.post;
    }

    public void setPost(String post) {
        this.post = post;
    }

    public Date getData() {
        return this.data;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public double getSalary() {
        return this.salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    public int getWorkedDays() {
        return this.workedDays;
    }

    public void setWorkedDays(int workedDays) {
        this.workedDays = workedDays;
    }

    public int getDaysDisabled() {
        return this.daysDisabled;
    }

    public void setDaysDisabled(int daysDisabled) {
        this.daysDisabled = daysDisabled;
    }

    public int getDaysLicensed() {
        return this.daysLicensed;
    }

    public void setDaysLicensed(int daysLicensed) {
        this.daysLicensed = daysLicensed;
    }

    public int getTotalDays() {
        return this.totalDays;
    }

    public void setTotalDays(int totalDays) {
        this.totalDays = totalDays;
    }

    public Date getAdmissionDates() {
        return this.admissionDates;
    }

    public void setAdmissionDates(Date admissionDates) {
        this.admissionDates = admissionDates;
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", concepts='" + getConcepts() + "'" +
            ", numOrder='" + getNumOrder() + "'" +
            ", tpDocumment='" + getTpDocumment() + "'" +
            ", number='" + getNumber() + "'" +
            ", nomContributor='" + getNomContributor() + "'" +
            ", post='" + getPost() + "'" +
            ", data='" + getData() + "'" +
            ", salary='" + getSalary() + "'" +
            ", workedDays='" + getWorkedDays() + "'" +
            ", daysDisabled='" + getDaysDisabled() + "'" +
            ", daysLicensed='" + getDaysLicensed() + "'" +
            ", totalDays='" + getTotalDays() + "'" +
            ", admissionDates='" + getAdmissionDates() + "'" +
            "}";
    }
}
