package com.smartmdina.casamobile.services;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import com.smartmdina.casamobile.repositories.UserRepository;
import com.smartmdina.casamobile.entities.User;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User createUser(User user, String role) {
        // Set the role for the user (either "admin" or "user")
        user.setRole(role);
    
        if (user.getCreatedAt() == null) {
            user.setCreatedAt(LocalDateTime.now());
        }
        user.setUpdatedAt(LocalDateTime.now());
    
        return userRepository.save(user);  // Save and return the user
    }
    

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User authenticateUser(String username, String password) {
        return userRepository.findByUsername(username)
                .filter(user -> user.getPassword().equals(password))
                .orElse(null);
    }

    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));
        userRepository.delete(user);
    }
}
