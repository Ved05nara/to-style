package com.guesthub.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class AuthDtos {
    public static class LoginRequest {
        @Email @NotBlank public String email;
        @NotBlank public String password;
    }
    public static class RegisterRequest {
        @Email @NotBlank public String email;
        @NotBlank public String password;
        @NotBlank public String name;
        @NotBlank public String role; // guest, staff, management, admin
    }
    public static class AuthResponse {
        public String token;
        public Long userId;
        public String email;
        public String name;
        public String role;
        public AuthResponse(String token, Long userId, String email, String name, String role) {
            this.token = token; this.userId = userId; this.email = email; this.name = name; this.role = role;
        }
    }
}