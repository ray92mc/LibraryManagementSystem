package com.x00179223.librarybackend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.x00179223.librarybackend.model.Book;
import com.x00179223.librarybackend.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {
    @Autowired
    private final BookRepository bookRepository;

    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public Book save(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public void delete(Long id) {
        bookRepository.deleteById(id);
    }

    @Override
    public Book update(Long id, Book book) {
        Book existingBook = bookRepository.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));
        existingBook.setTitle(book.getTitle());
        existingBook.setAuthor(book.getAuthor());
        existingBook.setGenre(book.getGenre());
        existingBook.setQuantityAvailable(book.getQuantityAvailable());
        existingBook.setPublicationYear(book.getPublicationYear());
        existingBook.setRating(book.getRating());
        return bookRepository.save(existingBook);
    }

    @Override
    public List<Book> searchByTitleOrAuthorOrGenre(String query) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(query); // parse the JSON string
        String searchQuery = jsonNode.get("query").asText();
        List<Book> books = bookRepository.searchByTitleOrAuthorOrGenre(searchQuery);
        System.out.println(searchQuery);
        System.out.println(books);
        return books;
    }

    @Override
    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    @Override
    public Optional<Book> findById(Long id) {
        return bookRepository.findById(id);
    }

    @Override
    public Book rateBook(Long id, double rating){
        if(rating<0.1 || rating>5.0){
            throw new RuntimeException("Array out of bounds: 0.1 - 5");
        }
        Book existingBook = bookRepository.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));

        double newRatingTotal = existingBook.getRatingTotal() + rating;
        int newRatingCount = existingBook.getRatingCount() + 1;
        double newRating = newRatingTotal / newRatingCount;

        existingBook.setRating(newRating);
        existingBook.setRatingCount(newRatingCount);
        existingBook.setRatingTotal(newRatingTotal);
        return bookRepository.save(existingBook);
    }


}
