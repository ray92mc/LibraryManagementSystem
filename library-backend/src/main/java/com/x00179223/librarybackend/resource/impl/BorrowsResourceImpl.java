package com.x00179223.librarybackend.resource.impl;

import com.x00179223.librarybackend.exception.ResourceNotFoundException;
import com.x00179223.librarybackend.model.Borrow;
import com.x00179223.librarybackend.resource.Resource;
import com.x00179223.librarybackend.service.impl.BorrowServiceImpl;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/borrows")
@CrossOrigin(origins = "http://localhost:3000")
public class BorrowsResourceImpl implements Resource<Borrow> {

    @Autowired
    private BorrowServiceImpl borrowsService;

    @Override
    public ResponseEntity<Collection<Borrow>> findAll(){
        return new ResponseEntity<>(borrowsService.findAll(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Borrow> findById(Long id) {
        Optional<Borrow> borrows = borrowsService.findById(id);
        if(!borrows.isPresent()) {
            throw new ResourceNotFoundException("Borrow not found");
        }
        return new ResponseEntity<>(borrows.get(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Borrow> save(Borrow borrow) {
        return new ResponseEntity<>(borrowsService.saveOrUpdate(borrow), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<Borrow> update(Borrow borrow) {
        return new ResponseEntity<>(borrowsService.saveOrUpdate(borrow), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<String> deleteById(Long id) {
        Optional<Borrow> book = borrowsService.findById(id);
        if(!book.isPresent()) {
            throw new ResourceNotFoundException("Borrow not found");
        }
        return new ResponseEntity<>(borrowsService.deleteById(id), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<String> invalid() {
        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put("message", "Invalid request!");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(jsonObject.toString(), HttpStatus.OK);
    }

    @GetMapping("/overdue")
    public List<Borrow> findOverdueBorrows() {
        return borrowsService.findOverdueBorrows();
    }

    @GetMapping("/fine/{id}")
    public Double calculateFine(Long id) {
        Optional<Borrow> borrow = borrowsService.findById(id);
        if(!borrow.isPresent()){
            throw new ResourceNotFoundException("Borrow not found");
        }
        return borrowsService.calculateFine(borrow.get());
    }



}
