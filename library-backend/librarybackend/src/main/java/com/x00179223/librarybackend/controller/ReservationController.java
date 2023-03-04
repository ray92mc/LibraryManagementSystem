package com.x00179223.librarybackend.controller;

import com.x00179223.librarybackend.exceptions.ResourceNotFoundException;
import com.x00179223.librarybackend.model.BookUserIdRequest;
import com.x00179223.librarybackend.model.Reservation;
import com.x00179223.librarybackend.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/reservations")
@CrossOrigin(origins = "http://localhost:3000")
public class ReservationController {

    @Autowired
    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping
    public ResponseEntity<Reservation> reserveBook(@RequestBody BookUserIdRequest request) {
        Reservation reservation = reservationService.reserveBook(request.getBookId(), request.getUserId());
        return ResponseEntity.ok(reservation);
    }

    @PutMapping("/checkout/{id}")
    public ResponseEntity<Reservation> checkOutBook(@PathVariable Long id) {
        Reservation reservation = reservationService.checkOutBook(id);
        return ResponseEntity.ok(reservation);
    }

    @PutMapping("/checkin/{id}")
    public ResponseEntity<Reservation> checkInBook(@PathVariable Long id) {
        Reservation reservation = reservationService.checkInBook(id);
        return ResponseEntity.ok(reservation);
    }

    @DeleteMapping("/cancel/{id}")
    public ResponseEntity<Void> cancelReservation(@PathVariable Long id) {
        reservationService.cancelReservation(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Reservation>> findAllReservations() {
        List<Reservation> reservations = reservationService.findAllReservations();
        return ResponseEntity.ok(reservations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reservation> findReservationById(@PathVariable Long id) {
        try {
            Reservation reservation = reservationService.findReservationById(id);
            return ResponseEntity.ok(reservation);
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/extend")
    public ResponseEntity<Reservation> extendDueDate(@PathVariable Long id, @RequestBody int daysToExtend) {
        try {
            Reservation reservation = reservationService.extendDueDate(id, daysToExtend);
            return ResponseEntity.ok(reservation);
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/overdue")
    public ResponseEntity<List<Reservation>> checkForOverdueReservations() {
        List<Reservation> overdueReservations = reservationService.checkForOverdueReservations();
        return ResponseEntity.ok(overdueReservations);
    }
}
