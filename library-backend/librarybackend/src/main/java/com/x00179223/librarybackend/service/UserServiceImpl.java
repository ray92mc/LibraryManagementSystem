package com.x00179223.librarybackend.service;

import com.x00179223.librarybackend.model.User;
import com.x00179223.librarybackend.model.UserUpdateRequest;
import com.x00179223.librarybackend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;

    private final EmailService emailService;

    public UserServiceImpl(PasswordEncoder passwordEncoder, UserRepository userRepository, EmailService emailService) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User save(User user) {
        if(userRepository.findByEmail(user.getEmail()).isPresent()){
            throw new RuntimeException("Email already exists");
        }
        return userRepository.save(user);
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public void deleteById(Long id){
        userRepository.deleteById(id);
    }

    @Override
    public User updateUser(Long id, UserUpdateRequest request) {
        User existingUser = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        existingUser.setEmail(request.getEmail());
        existingUser.setFirstname(request.getFirstname());
        existingUser.setLastname(request.getLastname());
        existingUser.setPassword(existingUser.getPassword());
        return userRepository.save(existingUser);
    }

    @Override
    public void addFine(Long userId, double fine) {
        User user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));

        // Check if user has already received a fine today
        LocalDate today = LocalDate.now();
        if (user.getLastFineAddedAt() != null && user.getLastFineAddedAt().equals(today)) {
            System.out.println("User has already received a fine today, do not add another one");
            return;
        }

        double newFine = user.getFine() + fine;
        if (newFine > 50.0) {
            newFine = 50.0;
        }
        user.setFine(newFine);
        user.setLastFineAddedAt(today);
        emailService.sendOverdueEmail(user);
        userRepository.save(user);
    }


}
