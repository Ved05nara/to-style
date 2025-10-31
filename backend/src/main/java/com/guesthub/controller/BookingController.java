package com.guesthub.controller;

import com.guesthub.model.Booking;
import com.guesthub.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) { this.bookingService = bookingService; }

    @GetMapping
    public List<Booking> list(Authentication auth) {
        boolean privileged = auth.getAuthorities().stream().anyMatch(a ->
                a.getAuthority().equals("ROLE_ADMIN") || a.getAuthority().equals("ROLE_MANAGEMENT") || a.getAuthority().equals("ROLE_STAFF"));
        return bookingService.listAllForUser(auth.getName(), privileged);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('GUEST','STAFF','MANAGEMENT','ADMIN')")
    public ResponseEntity<Booking> create(@Valid @RequestBody Booking booking, Authentication auth) {
        return ResponseEntity.ok(bookingService.create(booking, auth.getName()));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGEMENT')")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        bookingService.delete(id);
        return ResponseEntity.noContent().build();
    }
}