package com.x00179223.librarybackend.service.impl;

import com.x00179223.librarybackend.model.Author;
import com.x00179223.librarybackend.repository.AuthorRepository;
import com.x00179223.librarybackend.service.IService;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthorServiceImpl implements IService<Author> {

    @Autowired
    private AuthorRepository authorRepository;

    @Override
    public List<Author> findAll() {
        return authorRepository.findAll();
    }

    @Override
    public Optional<Author> findById(Long id) {
        return authorRepository.findById(id);
    }

    @Override
    public Author saveOrUpdate(Author author) {
        return authorRepository.saveAndFlush(author);
    }

    @Override
    public String deleteById(Long id) {
        JSONObject jsonObject = new JSONObject();
        try {
            authorRepository.deleteById(id);
            jsonObject.put("message", "Author deleted successfully");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return jsonObject.toString();
    }

    public List<Author> findByNameContaining(String name) {
        return authorRepository.findByNameContaining(name);
    }

}
