package com.x00179223.librarybackend.controller;

import com.x00179223.librarybackend.exceptions.ResourceNotFoundException;
import com.x00179223.librarybackend.model.Reservation;
import com.x00179223.librarybackend.service.ReservationServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/reservations")
@CrossOrigin(origins = "http://localhost:3000")
public class ReservationController {

    @Autowired
    private final ReservationServiceImpl reservationServiceImpl;

    public ReservationController(ReservationServiceImpl reservationServiceImpl) {
        this.reservationServiceImpl = reservationServiceImpl;
    }

    @PostMapping
    public ResponseEntity<Reservation> reserveBook(@RequestParam Long bookId, @RequestParam Long userId) {
        Reservation reservation = reservationServiceImpl.reserveBook(bookId, userId);
        return ResponseEntity.ok(reservation);
    }

    @PutMapping("/checkout/{id}")
    public ResponseEntity<Reservation> checkOutBook(@PathVariable Long id) {
        Reservation reservation = reservationServiceImpl.checkOutBook(id);
        return ResponseEntity.ok(reservation);
    }

    @PutMapping("/checkin/{id}")
    public ResponseEntity<Reservation> checkInBook(@PathVariable Long id) {
        Reservation reservation = reservationServiceImpl.checkInBook(id);
        return ResponseEntity.ok(reservation);
    }

    @DeleteMapping("/cancel/{id}")
    public ResponseEntity<Void> cancelReservation(@PathVariable Long id) {
        reservationServiceImpl.cancelReservation(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Reservation>> findAllReservations() {
        List<Reservation> reservations = reservationServiceImpl.findAllReservations();
        return ResponseEntity.ok(reservations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reservation> findReservationById(@PathVariable Long id) {
        try {
            Reservation reservation = reservationServiceImpl.findReservationById(id);
            return ResponseEntity.ok(reservation);
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/extend")
    public ResponseEntity<Reservation> extendDueDate(@PathVariable Long id, @RequestParam int daysToExtend) {
        try {
            Reservation reservation = reservationServiceImpl.extendDueDate(id, daysToExtend);
            return ResponseEntity.ok(reservation);
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/overdue")
    public ResponseEntity<List<Reservation>> checkForOverdueReservations() {
        List<Reservation> overdueReservations = reservationServiceImpl.checkForOverdueReservations();
        return ResponseEntity.ok(overdueReservations);
    }
}
