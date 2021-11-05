package co.unbosque.mondsinc.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import co.unbosque.mondsinc.Utils.Auth.JWTUtil;
import co.unbosque.mondsinc.Utils.Exceptions.ResourceNotFoundException;
import co.unbosque.mondsinc.models.User;
import co.unbosque.mondsinc.repository.UserRepository;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;

@RestController
@CrossOrigin(origins = {"https://localhost:3000", "https://mondsinc.vercel.app", "http://localhost:3000"})
@RequestMapping("/api/v1/auth")
@ComponentScan(basePackageClasses = {JWTUtil.class})
public class AuthController {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTUtil jwtUtil;

    @PostMapping("authentication")
    public ResponseEntity<Map<String, Object>> authenticateUser(@RequestBody User user)
    throws ResourceNotFoundException{

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        User foundUser = userRepository.findByCorreo(user.getCorreo());
        HashMap<String, Object> response = new HashMap<>();

        if (foundUser == null) {
            response.put("Error", String.format("Usuario con correo %s no encontrado", user.getCorreo()));
        } else if (argon2.verify(foundUser.getClave(), user.getClave().toCharArray())) {
            response.put("Token", jwtUtil.create(foundUser.getId(), foundUser.getCorreo()));
            response.put("User", foundUser);
            return ResponseEntity.ok().body(response);
        } else response.put("Error", "Credenciales invalidas");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    @PostMapping("verifyToken")
    public ResponseEntity<Map<String, String>> verifyToken(@RequestBody String token){
        String key = jwtUtil.getKey(token);
        HashMap<String, String> bodyResponse = new HashMap<>();
        if (key == null) {
            bodyResponse.put("Token expired", token);
            return ResponseEntity.status(401).body(bodyResponse);
        }
        bodyResponse.put("UserId", key);
        return ResponseEntity.ok().body(bodyResponse);
    }
    
}
