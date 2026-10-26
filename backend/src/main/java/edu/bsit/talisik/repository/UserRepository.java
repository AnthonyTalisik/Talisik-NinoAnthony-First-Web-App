package edu.bsit.talisik.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.bsit.talisik.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}