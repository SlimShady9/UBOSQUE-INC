package co.unbosque.mondsinc.models;


import java.util.Date;
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
    private int month;
    private int year;
    private double salary;
    private int workedDays;
    private int daysDisabled;
    private int daysLicensed;
    private int totalDays;
    private Date admissionDates;
    private double IBC;
    private double salud;
    private double difSalud;
    private String estadoSalud;
    private double pension;
    private double difPension;
    private String estadoPension;
    private double arl;
    private double difArl;
    private String estadoArl;
    public Order(List<Concept> concepts, String numOrder, String tpDocumment, int number, String nomContributor, String post,
    int month, int year, double salary, int workedDays, int daysDisabled, int daysLicensed, int totalDays, Date admissionDates, double IBC, 
    double salud, double difSalud, String estadoSalud, double pension, double difPension, String estadoPension, double arl, double difArl, String estadoArl) {

        this.concepts = concepts;
        this.numOrder = numOrder;
        this.tpDocumment = tpDocumment;
        this.number = number;
        this.nomContributor = nomContributor;
        this.post = post;
        this.month = month;
        this.year = year;
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

    public int getMonth() {
        return this.month;
    }

    public void setMonth(int month) {
        this.month = month;
    }
    
    public int getYear() {
        return this.year;
    }

    public void setYear(int year) {
        this.year = year;
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

    public double getIBC() {
        return this.IBC;
    }

    public void setIBC(double IBC) {
        this.IBC = IBC;
    }
    
    public double getSalud() {
        return this.salud;
    }

    public void setSalud(double salud) {
        this.salud = salud;
    }
    
    public double getDifSalud() {
        return this.difSalud;
    }

    public void setDifSalud(double difSalud) {
        this.difSalud = difSalud;
    }
    
    public String getEstadoSalud() {
        return this.estadoSalud;
    }

    public void setEstadoSalud(String estadoSalud) {
        this.estadoSalud = estadoSalud;
    }
    
    public double getPension() {
        return this.pension;
    }

    public void setPension(double pension) {
        this.pension = pension;
    }
    
    public double getDifPension() {
        return this.difPension;
    }

    public void setDifPension(double difPension) {
        this.difPension = difPension;
    }
    
    public String getEstadoPension() {
        return this.estadoPension;
    }

    public void setEstadoPension(String estadoPension) {
        this.estadoPension = estadoPension;
    }
        
    public double getArl() {
        return this.arl;
    }

    public void setArl(double arl) {
        this.arl = arl;
    }
    
    public double getDifArl() {
        return this.difArl;
    }

    public void setDifArl(double difArl) {
        this.difArl = difArl;
    }
    
    public String getEstadoArl() {
        return this.estadoArl;
    }

    public void setEstadoArl(String estadoArl) {
        this.estadoArl = estadoArl;
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
            ", month='" + getMonth() + "'" +
            ", year='" + getYear() + "'" +
            ", salary='" + getSalary() + "'" +
            ", workedDays='" + getWorkedDays() + "'" +
            ", daysDisabled='" + getDaysDisabled() + "'" +
            ", daysLicensed='" + getDaysLicensed() + "'" +
            ", totalDays='" + getTotalDays() + "'" +
            ", admissionDates='" + getAdmissionDates() + "'" +
            ", IBC='" + getIBC() + "'" +
            ", salud='" + getSalud() + "'" +
            ", difSalud='" + getDifSalud() + "'" +
            ", estadoSalud='" + getEstadoSalud() + "'" +
            ", pension='" + getPension() + "'" +
            ", difPension='" + getDifPension() + "'" +
            ", estadoPension='" + getEstadoPension() + "'" +
            ", arl='" + getArl() + "'" +
            ", difArl='" + getArl() + "'" +
            ", estadoArl='" + getEstadoArl() + "'" +
            "}";
    }
}
