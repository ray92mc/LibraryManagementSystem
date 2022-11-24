package com.x00179223.librarybackend.model;

import org.springframework.lang.NonNull;

import javax.persistence.*;

@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "title")
    private String title;
    @Column(name = "author")
    @NonNull
    private String author;

    @Column(name = "isbn")
    @NonNull
    private String ISBN;

    public Book(){}

    public Book(String title, String author, String isbn) {
        this.title = title;
        this.author = author;
        this.ISBN = isbn;
    }

    public long getId() {
        return id;
    }

    public String getISBN() {
        return ISBN;
    }

    public void setISBN(String ISBN) {
        this.ISBN = ISBN;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

}
