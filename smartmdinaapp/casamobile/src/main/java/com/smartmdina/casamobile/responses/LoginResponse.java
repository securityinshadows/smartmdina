package com.smartmdina.casamobile.responses;

import com.smartmdina.casamobile.entities.User;

public class LoginResponse {

    private String message;
    private String token;
    private User user;

    // Constructor with message, token, and user
    public LoginResponse(String message, String token, User user) {
        this.message = message;
        this.token = token;
        this.user = user;
    }

    // Getters and setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
