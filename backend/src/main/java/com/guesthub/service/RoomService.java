package com.guesthub.service;

import com.guesthub.model.Room;
import com.guesthub.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {
    private final RoomRepository roomRepository;
    public RoomService(RoomRepository roomRepository) { this.roomRepository = roomRepository; }

    public List<Room> findAll() { return roomRepository.findAll(); }
    public Room create(Room r) { return roomRepository.save(r); }
    public Room get(String id) { return roomRepository.findById(id).orElseThrow(); }
    public Room update(String id, Room payload) {
        Room r = get(id);
        r.setNumber(payload.getNumber());
        r.setType(payload.getType());
        r.setPricePerNight(payload.getPricePerNight());
        r.setCapacity(payload.getCapacity());
        r.setStatus(payload.getStatus());
        return roomRepository.save(r);
    }
    public void delete(String id) { roomRepository.deleteById(id); }
}