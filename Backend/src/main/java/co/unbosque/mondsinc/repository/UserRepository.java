package co.unbosque.mondsinc.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import co.unbosque.mondsinc.models.User;

public interface UserRepository extends MongoRepository<User, String> {
    
    List<User> findByNombre(@Param("nombre") String nombre);
}
