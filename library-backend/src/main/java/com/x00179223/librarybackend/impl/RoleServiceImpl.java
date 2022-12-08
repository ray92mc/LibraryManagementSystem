package com.x00179223.librarybackend.impl;

import com.x00179223.librarybackend.model.Role;
import com.x00179223.librarybackend.repository.RoleRepository;
import com.x00179223.librarybackend.service.IService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Collection;
import java.util.Optional;

public class RoleServiceImpl implements IService<Role> {
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Collection<Role> findAll() {
        return roleRepository.findAll();
    }

    @Override
    public Optional<Role> findById(Long id) {
        return roleRepository.findById(id);
    }

    @Override
    public Role saveOrUpdate(Role role) {
        return roleRepository.saveAndFlush(role);
    }

    @Override
    public String deleteById(Long id) {
        roleRepository.deleteById(id);
        return null;
    }
}
