package com.x00179223.librarybackend.repository;

import com.x00179223.librarybackend.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {


}