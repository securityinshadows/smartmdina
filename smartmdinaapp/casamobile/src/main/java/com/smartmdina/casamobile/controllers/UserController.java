package com.smartmdina.casamobile.controllers;

import com.smartmdina.casamobile.entities.User;
import com.smartmdina.casamobile.services.UserService;
import com.smartmdina.casamobile.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.smartmdina.casamobile.responses.LoginResponse;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtils jwtUtils;

    @PreAuthorize("hasAuthority('admin')")
    @GetMapping("/allusers")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/register")
    public User createUser(@RequestBody User user) {
        String role = "user";  
        
        if (user.getRole() != null && user.getRole().equals("admin")) {
            role = "admin";  // Admin creating the user
        }

        return userService.createUser(user, role);
    }

    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }


    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
        User user = userService.authenticateUser(loginRequest.getUsername(), loginRequest.getPassword());
        if (user == null) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
        String token = jwtUtils.generateToken(user.getUsername());
        return ResponseEntity.ok().body(new LoginResponse("Login successful", token, user)); // Include the user in the response
    }

    @PreAuthorize("hasAuthority('admin')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().body("User deleted successfully");
    }
}
