package com.x00179223.librarybackend.controller;

import com.x00179223.librarybackend.model.Book;
import com.x00179223.librarybackend.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    @GetMapping
    public List<Book> getAllBooks(){
        return bookRepository.findAll();
    }

    @PostMapping
    public Book addBook(Book book){
        return bookRepository.save(book);
    }


    @DeleteMapping
    public void deleteBookById(long id){
        bookRepository.deleteById(id);
    }

}
