package co.unbosque.mondsinc.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.unbosque.mondsinc.Utils.Exceptions.ResourceNotFoundException;
import co.unbosque.mondsinc.models.User;
import co.unbosque.mondsinc.repository.UserRepository;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;

@RestController
@RequestMapping("/api/v1")
@EnableMongoRepositories(basePackageClasses = {UserRepository.class})
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("users")
    public List<User> retireveUserList() {
        return userRepository.findAll();
    }

    @GetMapping("users/{id}")
    public ResponseEntity<User>
    retireveUser(@PathVariable(value = "id") String userId)
    throws ResourceNotFoundException {
        User user = userRepository.findById(userId)
        .orElseThrow(() -> new ResourceNotFoundException(String.format("El usuario con id %s no fue encontrado", userId)));
        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/users")
    public User createEmployee(@RequestBody User user) {
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1, 1024, 1, user.getClave().toCharArray());
        user.setClave(hash);
        return userRepository.save(user);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateEmployee(@PathVariable(value = "id") String userId,
        @RequestBody User userDetails) throws ResourceNotFoundException {
        User user = userRepository.findById(userId)
        .orElseThrow(() -> new ResourceNotFoundException(String.format("El usuario con id %s no fue encontrado", userId)));
        
        user.setDocumento(userDetails.getDocumento());
        user.setCorreo(userDetails.getCorreo());
        user.setNombre(userDetails.getNombre());
        user.setTipoDocumento(userDetails.getTipoDocumento());
        final User updatedUser = userRepository.save(user);
        return ResponseEntity.ok().body(updatedUser);
    }
    
    @DeleteMapping("/users/{id}")
    public Map<String, Boolean> deleteEmployee(@PathVariable(value = "id") String userId)
    throws ResourceNotFoundException {
        User user = userRepository.findById(userId)
        .orElseThrow(() -> new ResourceNotFoundException(String.format("El usuario con id %s no fue encontrado", userId)));
        userRepository.delete(user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
