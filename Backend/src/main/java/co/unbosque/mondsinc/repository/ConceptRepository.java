package co.unbosque.mondsinc.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import co.unbosque.mondsinc.models.Concept;

public interface ConceptRepository extends MongoRepository<Concept, String> {

}
