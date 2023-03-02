package com.x00179223.librarybackend.repository;


import com.x00179223.librarybackend.model.Book;
import com.x00179223.librarybackend.model.Reservation;
import com.x00179223.librarybackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUser(User user);
    List<Reservation> findByBook(Book book);

    @Query("SELECT r FROM Reservation r WHERE r.returned = false AND r.dueDate < :currentDateTime")
    List<Reservation> findOverdueReservations(@Param("currentDateTime") LocalDateTime currentDateTime);
}