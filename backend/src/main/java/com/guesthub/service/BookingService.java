package com.guesthub.service;

import com.guesthub.model.Booking;
import com.guesthub.model.User;
import com.guesthub.repository.BookingRepository;
import com.guesthub.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;

    public BookingService(BookingRepository bookingRepository, UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
    }

    public List<Booking> listAllForUser(String email, boolean isPrivileged) {
        if (isPrivileged) return bookingRepository.findAll();
        User u = userRepository.findByEmail(email).orElseThrow();
        return bookingRepository.findByUser(u);
    }

    public Booking create(Booking b, String email) {
        // Try to find user, but allow guest bookings without user account
        User u = userRepository.findByEmail(email).orElse(null);
        if (u != null) {
            b.setUser(u);
        }
        return bookingRepository.save(b);
    }

    public void delete(String id) { bookingRepository.deleteById(id); }
}