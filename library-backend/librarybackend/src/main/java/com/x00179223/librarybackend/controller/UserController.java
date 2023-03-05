package com.x00179223.librarybackend.controller;

import com.x00179223.librarybackend.model.User;
import com.x00179223.librarybackend.model.UserUpdateRequest;
import com.x00179223.librarybackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> findAll() {
        return userService.findAll();
    }

    @PutMapping("/update/{id}")
    public User updateUser(@PathVariable long id, @RequestBody UserUpdateRequest request){
        return userService.updateUser(id, request);
    }

    @GetMapping("/email/{email}")
    public Optional<User> findByEmail(@PathVariable String email) {
        return userService.findByEmail(email);
    }

    @GetMapping("/id/{id}")
    public Optional<User> findById(@PathVariable Long id) {
        return userService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id){
        userService.deleteById(id);
    }
}
