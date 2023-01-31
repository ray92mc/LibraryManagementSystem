package com.x00179223.librarybackend.repository;

import com.x00179223.librarybackend.model.Borrow;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface BorrowRepository extends JpaRepository<Borrow, Long> {
    List<Borrow> findByEndDateBeforeAndReturnedFalse(LocalDate now);
}
