package com.x00179223.librarybackend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.x00179223.librarybackend.model.Book;
import com.x00179223.librarybackend.service.BookService;
import com.x00179223.librarybackend.service.BookServiceImpl;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "api/v1/books")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {

    @Autowired
    private final BookServiceImpl bookServiceImpl;

    public BookController(BookServiceImpl bookServiceImpl) {
        this.bookServiceImpl = bookServiceImpl;
    }

    @GetMapping
    public List<Book> getAllBooks() {
        return bookServiceImpl.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Book> getBookById(@PathVariable Long id) {
        return bookServiceImpl.findById(id);
    }

    @PostMapping
    public Book addBook(@RequestBody Book book) {
        return bookServiceImpl.save(book);
    }

    @PutMapping("/{id}")
    public Book updateBook(@PathVariable Long id, @RequestBody Book book) {
        return bookServiceImpl.update(id, book);
    }

    @PutMapping("/rate/{id}")
    public Book rateBook(@PathVariable Long id, @RequestBody double rating) {
        return bookServiceImpl.rateBook(id, rating);
    }

    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id) {
        bookServiceImpl.delete(id);
    }

    @GetMapping("/search")
    public List<Book> searchBooks(@RequestBody String query) throws JsonProcessingException {
        return bookServiceImpl.searchByTitleOrAuthorOrGenre(query.toLowerCase());
    }
}
