package co.unbosque.mondsinc.controller;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.unbosque.mondsinc.Utils.Exceptions.ResourceNotFoundException;
import co.unbosque.mondsinc.models.Concept;
import co.unbosque.mondsinc.models.Documment;
import co.unbosque.mondsinc.models.Order;
import co.unbosque.mondsinc.models.User;
import co.unbosque.mondsinc.repository.ConceptRepository;
import co.unbosque.mondsinc.repository.DocummentRepository;
import co.unbosque.mondsinc.repository.OrderRepository;
import co.unbosque.mondsinc.repository.UserRepository;

@RestController
@CrossOrigin(origins = {"https://localhost:3000", "https://mondsinc.vercel.app", "http://localhost:3000"})
@RequestMapping("/api/v1/")
public class DocumentController {
    
    @Autowired
    private DocummentRepository docummentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ConceptRepository conceptRepository;

    @Autowired
    private OrderRepository orderRepository;
    
    @RequestMapping("documents")
    public ResponseEntity<List<Documment>> getDocuments() {
        ArrayList<Documment> documents = (ArrayList<Documment>) docummentRepository.findAll();
        for (Documment i : documents) {
            i.setOrder(null);
        }
        return ResponseEntity.ok().body(documents);
    }

    @RequestMapping("documents/{id}")
    public ResponseEntity<Documment> getDocument(@PathVariable(value = "id") String id)
    throws ResourceNotFoundException {
        Documment documment = docummentRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException(String.format("El documento con id %s no fue encontrado", id)));
        return ResponseEntity.ok().body(documment);
    }
    
    @RequestMapping("userdocuments/{id}")
    public ResponseEntity<List<Documment>> getDocumentById(@PathVariable(value = "id") String id)
    throws ResourceNotFoundException {
        User user = userRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException(String.format("El usuario con id %s no fue encontrado", id)));

        return ResponseEntity.ok().body(user.getDocumments());
    }

    @DeleteMapping("documents/{id}")
    public ResponseEntity<Void> deleteDocument(@PathVariable(value = "id") String id)
    throws ResourceNotFoundException {
        Documment documment = docummentRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException(String.format("El documento con id %s no fue encontrado", id)));
        docummentRepository.delete(documment);
        for (Order orden: documment.getOrder()) {
            for (Concept con : orden.getConcepts()) {
                String idConcept = con.getId();
                conceptRepository.deleteById(idConcept);
            }
            String idOrder = orden.getId();
            orderRepository.deleteById(idOrder);
        }
        docummentRepository.delete(documment);

        return ResponseEntity.ok().build();
    }

}
