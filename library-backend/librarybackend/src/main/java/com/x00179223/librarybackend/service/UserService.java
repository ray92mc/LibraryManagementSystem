package com.x00179223.librarybackend.service;

import com.x00179223.librarybackend.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    Optional<User> findByEmail(String email);

    User save(User user);

    List<User> findAll();

}
