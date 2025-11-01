package com.guesthub.controller;

import com.guesthub.dto.AuthDtos;
import com.guesthub.model.User;
import com.guesthub.repository.UserRepository;
import com.guesthub.security.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(AuthenticationManager authManager, UserRepository userRepository,
                          PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.authManager = authManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody AuthDtos.RegisterRequest req) {
        if (userRepository.existsByEmail(req.email)) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email already registered"));
        }
        User u = new User();
        u.setEmail(req.email);
        u.setPassword(passwordEncoder.encode(req.password));
        u.setName(req.name);
        u.setRole(req.role.toLowerCase());
        userRepository.save(u);
        String token = jwtUtil.generateToken(u.getEmail(), Map.of("role", u.getRole(), "name", u.getName()));
        return ResponseEntity.ok(new AuthDtos.AuthResponse(token, u.getId(), u.getEmail(), u.getName(), u.getRole()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthDtos.LoginRequest req) {
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.email, req.password));
        SecurityContextHolder.getContext().setAuthentication(auth);
        User u = userRepository.findByEmail(req.email).orElseThrow();
        String token = jwtUtil.generateToken(u.getEmail(), Map.of("role", u.getRole(), "name", u.getName()));
        return ResponseEntity.ok(new AuthDtos.AuthResponse(token, u.getId(), u.getEmail(), u.getName(), u.getRole()));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User u = userRepository.findByEmail(email).orElseThrow();
        return ResponseEntity.ok(Map.of(
                "id", u.getId(),
                "email", u.getEmail(),
                "name", u.getName(),
                "role", u.getRole()
        ));
    }
}