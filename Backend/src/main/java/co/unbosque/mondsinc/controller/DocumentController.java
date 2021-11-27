package co.unbosque.mondsinc.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.unbosque.mondsinc.Utils.Exceptions.ResourceNotFoundException;
import co.unbosque.mondsinc.models.Documment;
import co.unbosque.mondsinc.models.User;
import co.unbosque.mondsinc.repository.DocummentRepository;
import co.unbosque.mondsinc.repository.UserRepository;

@RestController
@CrossOrigin(origins = {"https://localhost:3000", "https://mondsinc.vercel.app", "http://localhost:3000"})
@RequestMapping("/api/v1/")
public class DocumentController {
    
    @Autowired
    private DocummentRepository docummentRepository;

    @Autowired
    private UserRepository userRepository;
    
    @RequestMapping("documents")
    public ResponseEntity<List<Documment>> getDocuments() {
        return ResponseEntity.ok().body(docummentRepository.findAll());
    }

    @RequestMapping("documents/{id}")
    public ResponseEntity<List<Documment>> getDocument(@PathVariable(value = "id") String id)
    throws ResourceNotFoundException {
        User user = userRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException(String.format("El usuario con id %s no fue encontrado", id)));

        return ResponseEntity.ok().body(user.getDocumments());
    }
    

}
