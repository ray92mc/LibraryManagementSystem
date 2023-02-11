package com.x00179223.librarybackend.repository;

import com.x00179223.librarybackend.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByTitleContainingOrAuthorContainingOrGenreContaining(String query);

}