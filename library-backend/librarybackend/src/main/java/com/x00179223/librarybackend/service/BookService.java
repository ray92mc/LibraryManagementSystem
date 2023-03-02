package com.x00179223.librarybackend.service;

import java.util.List;
import java.util.Optional;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.x00179223.librarybackend.model.Book;

public interface BookService {
    Optional<Book> findById(Long id);
    List<Book> findAll();
    Book save(Book book);
    void delete(Long book);
    Book update(Long id, Book book);
    List<Book> searchByTitleOrAuthorOrGenre(String query) throws JsonProcessingException;
}
