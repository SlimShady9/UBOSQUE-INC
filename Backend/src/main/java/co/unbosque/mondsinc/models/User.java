package co.unbosque.mondsinc.models;

import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("user")
public class User {
    
    @Id
    private String id;

    @Indexed(unique=true)
    private String documento;

    @Indexed(unique=true)
    private String correo;
    private String tipoDocumento;
    private String nombre;
    private String clave;
    private short rol;

    @DBRef
    private List<Documment> documments;


    public User(String documento, String correo, String tipoDocumento, String nombre, String clave, List<Documment> documments, short rol) {
        this.documento = documento;
        this.correo = correo;
        this.tipoDocumento = tipoDocumento;
        this.nombre = nombre;
        this.clave = clave;
        this.documments = documments;
        this.rol = rol;
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

    public List<Documment> getDocumments() {
        return this.documments;
    }

    public void setDocumments(List<Documment> documments) {
        this.documments = documments;
    }

    public short getRol() {
        return this.rol;
    }

    public void setRol(short rol) {
        this.rol = rol;
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
            ", documments='" + getDocumments() + "'" +
            "}";
    }

    
    

}
