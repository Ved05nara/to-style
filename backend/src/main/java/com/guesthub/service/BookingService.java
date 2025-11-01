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
        User u = userRepository.findByEmail(email).orElseThrow();
        b.setUser(u);
        return bookingRepository.save(b);
    }

    public void delete(Long id) { bookingRepository.deleteById(id); }
}