package com.guesthub.controller;

import com.guesthub.model.Room;
import com.guesthub.service.RoomService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) { this.roomService = roomService; }

    @GetMapping
    public List<Room> list() { return roomService.findAll(); }

    @GetMapping("/{id}")
    public Room get(@PathVariable Long id) { return roomService.get(id); }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGEMENT')")
    public ResponseEntity<Room> create(@Valid @RequestBody Room room) {
        return ResponseEntity.ok(roomService.create(room));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGEMENT')")
    public Room update(@PathVariable Long id, @Valid @RequestBody Room room) {
        return roomService.update(id, room);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        roomService.delete(id);
        return ResponseEntity.noContent().build();
    }
}