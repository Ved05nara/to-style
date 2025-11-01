package com.guesthub.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.Instant;

@Document(collection = "bookings")
public class Booking {
    @Id
    private String id;

    @DBRef
    private User user;

    @DBRef
    private Room room;
    
    private String fullName;
    private String email;
    private String phone;
    private String roomType;
    private Integer numberOfGuests;
    private String specialRequests;
    private Double totalPrice;
    private Instant bookingDate = Instant.now();

    @NotNull
    private LocalDate checkIn;

    @NotNull
    private LocalDate checkOut;

    private String status = "PENDING"; // PENDING, CONFIRMED, CANCELLED

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Room getRoom() { return room; }
    public void setRoom(Room room) { this.room = room; }

    public LocalDate getCheckIn() { return checkIn; }
    public void setCheckIn(LocalDate checkIn) { this.checkIn = checkIn; }

    public LocalDate getCheckOut() { return checkOut; }
    public void setCheckOut(LocalDate checkOut) { this.checkOut = checkOut; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}