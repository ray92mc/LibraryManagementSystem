package com.x00179223.librarybackend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Settings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int maxCheckoutDays;

    private int maxCheckoutBooks;

    private int lateFee;

    public int getMaxCheckoutDays() {
        return maxCheckoutDays;
    }

    public void setMaxCheckoutDays(int maxCheckoutDays) {
        this.maxCheckoutDays = maxCheckoutDays;
    }

    public int getMaxCheckoutBooks() {
        return maxCheckoutBooks;
    }

    public void setMaxCheckoutBooks(int maxCheckoutBooks) {
        this.maxCheckoutBooks = maxCheckoutBooks;
    }

    public int getLateFee() {
        return lateFee;
    }

    public void setLateFee(int lateFee) {
        this.lateFee = lateFee;
    }
}
