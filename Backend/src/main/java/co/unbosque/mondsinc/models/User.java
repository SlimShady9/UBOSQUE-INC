package co.unbosque.mondsinc.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("user")
public class User {
    
    @Id
    private String id;

    private String documento;

    @Indexed(unique=true)
    private String correo;
    private String tipoDocumento;
    private String nombre;
    private String clave;

    public User(String documento, String correo, String tipoDocumento, String nombre, String clave) {
        this.documento = documento;
        this.correo = correo;
        this.tipoDocumento = tipoDocumento;
        this.nombre = nombre;
        this.clave = clave;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDocumento() {
        return this.documento;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }

    public String getCorreo() {
        return this.correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getTipoDocumento() {
        return this.tipoDocumento;
    }

    public void setTipoDocumento(String tipoDocumento) {
        this.tipoDocumento = tipoDocumento;
    }

    public String getNombre() {
        return this.nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getClave() {
        return this.clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", documento='" + getDocumento() + "'" +
            ", correo='" + getCorreo() + "'" +
            ", tipoDocumento='" + getTipoDocumento() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", clave='" + getClave() + "'" +
            "}";
    }
    

}
