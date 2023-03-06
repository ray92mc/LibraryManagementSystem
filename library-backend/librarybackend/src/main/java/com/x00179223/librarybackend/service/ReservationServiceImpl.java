package com.x00179223.librarybackend.service;

import com.x00179223.librarybackend.exceptions.ResourceNotFoundException;
import com.x00179223.librarybackend.model.Book;
import com.x00179223.librarybackend.model.Reservation;
import com.x00179223.librarybackend.model.User;
import com.x00179223.librarybackend.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final BookService bookService;
    private final UserService userService;


    @Autowired
    public ReservationServiceImpl(ReservationRepository reservationRepository, BookService bookService, UserService userService) {
        this.reservationRepository = reservationRepository;
        this.bookService = bookService;
        this.userService = userService;
    }

    public ReservationServiceImpl(ReservationRepository reservationRepository, ReservationRepository reservationRepository1, BookService bookService, UserService userService, EmailService emailService) {
        this.reservationRepository = reservationRepository1;
        this.bookService = bookService;
        this.userService = userService;
    }

    @Override
    public Reservation reserveBook(Long bookId, Long userId) {
        Optional<Book> book = bookService.findById(bookId);
        Optional<User> user = userService.findById(userId);
        if (book == null || user == null) {
            throw new ResourceNotFoundException("Book or User not found");
        }
        if (book.get().getQuantityAvailable() <= 0) {
            throw new IllegalArgumentException("Book is not available for reservation");
        }
        Reservation reservation = Reservation.builder()
                .book(book.get())
                .user(user.get())
                .reservedAt(LocalDateTime.now())
                .pickUpBy(LocalDateTime.now().plusDays(7))
                .build();
        book.get().setQuantityAvailable(book.get().getQuantityAvailable()-1);
        reservationRepository.save(reservation);
        bookService.save(book.get());
        return reservation;
    }

    @Override
    public Reservation cancelReservation(Long reservationId) {
        Reservation reservation = findReservationById(reservationId);
        if (reservation == null) {
            throw new ResourceNotFoundException("Reservation not found");
        }
        reservation.getBook().setQuantityAvailable(reservation.getBook().getQuantityAvailable()+1);
        reservationRepository.delete(reservation);
        bookService.save(reservation.getBook());
        return reservation;
    }

    @Override
    public Reservation checkOutBook(Long reservationId) {
        Reservation reservation = findReservationById(reservationId);
        if (reservation == null) {
            throw new ResourceNotFoundException("Reservation not found");
        }
        reservation.setCheckedOutAt(LocalDateTime.now());
        reservation.setDueDate(LocalDateTime.now().plusDays(14));
        reservation.setReturned(false);
        return reservationRepository.save(reservation);
    }

    @Override
    public Reservation checkInBook(Long reservationId) {
        Reservation reservation = findReservationById(reservationId);
        if (reservation == null) {
            throw new ResourceNotFoundException("Reservation not found");
        }
        reservation.setReturned(true);
        return reservationRepository.save(reservation);
    }

    @Override
    public List<Reservation> findAllReservations() {
        return reservationRepository.findAll();
    }

    @Override
    public Reservation findReservationById(Long id) {
        return reservationRepository.findById(id).orElse(null);
    }

    @Override
    public Reservation extendDueDate(Long reservationId) {
        Reservation reservation = findReservationById(reservationId);
        if (reservation == null) {
            throw new ResourceNotFoundException("Reservation not found");
        }
        reservation.setDueDate(reservation.getDueDate().plusDays(7));
        return reservationRepository.save(reservation);
    }

    @Scheduled(fixedRate = 4 * 60 * 60 * 1000) // run every 4 hours (1000=1second)
    @Override
    public List<Reservation> findOverdueCheckins() {
        System.out.println("Checking for overdue reservations");
        LocalDateTime now = LocalDateTime.now();
        List<Reservation> overdueReservations = reservationRepository.findAllByCheckedOutAtIsNotNullAndDueDateBeforeAndReturnedIsFalse(now);
        for (Reservation reservation : overdueReservations) {
            User user = reservation.getUser();
            if (user != null) {
                double fine = user.getFine() + 0.50;
                if (fine > 50.0) {
                    fine = 50.0;
                }
                userService.addFine(user.getId(), fine);
            }
        }
        return overdueReservations;
    }

    @Override
    public void purgeNonPickedUpReservations() {
        LocalDateTime now = LocalDateTime.now();
        List<Reservation> overdueReservations = reservationRepository.findAllByPickUpByBeforeAndCheckedOutAtIsNull(now);
        for (Reservation reservation : overdueReservations) {
            reservationRepository.delete(reservation);
        }
    }
    @Override
    public List<Reservation> findOverduePickups() {
        LocalDateTime now = LocalDateTime.now();
        return reservationRepository.findAllByPickUpByBeforeAndCheckedOutAtIsNull(now);
    }
}
