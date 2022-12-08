package com.x00179223.librarybackend.service.impl;

import com.x00179223.librarybackend.model.User;
import com.x00179223.librarybackend.repository.UserRepository;
import com.x00179223.librarybackend.service.IService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Collection;
import java.util.Optional;

@Service
public class UserServiceImpl implements IService<User> {
    @Autowired
    private UserRepository userRepository;

    @Override
    public Collection<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public User saveOrUpdate(User user) {
        return userRepository.saveAndFlush(user);
    }

    @Override
    public String deleteById(Long id) {
        userRepository.deleteById(id);
        return null;
    }
}
