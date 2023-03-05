package com.x00179223.librarybackend.service;

import com.x00179223.librarybackend.model.User;
import com.x00179223.librarybackend.model.UserUpdateRequest;

import java.util.List;
import java.util.Optional;

public interface UserService {
    Optional<User> findByEmail(String email);
    User save(User user);
    Optional<User> findById(Long id);
    List<User> findAll();
    void deleteById(Long id);
    User updateUser(Long id, UserUpdateRequest request);
}
