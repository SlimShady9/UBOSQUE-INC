package co.unbosque.mondsinc.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import co.unbosque.mondsinc.models.Documment;

public interface DocummentRepository extends MongoRepository<Documment, String> {

}
