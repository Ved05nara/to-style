package com.guesthub.repository;

import com.guesthub.model.Booking;
import com.guesthub.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BookingRepository extends MongoRepository<Booking, String> {
    List<Booking> findByUser(User user);
}