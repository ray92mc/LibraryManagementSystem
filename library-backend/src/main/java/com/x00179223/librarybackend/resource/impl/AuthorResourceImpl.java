package com.x00179223.librarybackend.resource.impl;

import com.x00179223.librarybackend.exception.ResourceNotFoundException;
import com.x00179223.librarybackend.model.Author;
import com.x00179223.librarybackend.resource.Resource;
import com.x00179223.librarybackend.service.impl.AuthorServiceImpl;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api/authors")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthorResourceImpl implements Resource<Author> {

    private final AuthorServiceImpl authorService;

    public AuthorResourceImpl(AuthorServiceImpl authorService) {
        this.authorService = authorService;
    }

    @Override
    public ResponseEntity<Collection<Author>> findAll() {
        return new ResponseEntity<>(authorService.findAll(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Author> findById(Long id) {
        Optional<Author> author = authorService.findById(id);
        if(!author.isPresent()){
            throw new ResourceNotFoundException("Author not found");
        }
        return new ResponseEntity<>(author.get(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Author> save(Author author) {
        return new ResponseEntity<>(authorService.saveOrUpdate(author), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<Author> update(Author author) {

        return new ResponseEntity<>(authorService.saveOrUpdate(author), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<String> deleteById(Long id) {
        Optional<Author> author = authorService.findById(id);
        if(!author.isPresent()){
            throw new ResourceNotFoundException("Author not found");
        }
        return new ResponseEntity<>(authorService.deleteById(id), HttpStatus.OK);
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


}
