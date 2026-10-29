package edu.bsit.talisik.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import edu.bsit.talisik.service.UserService;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserService service;

    public DataSeeder(UserService service) { this.service = service; }

    @Override
    public void run(String... args) {
        service.seedAdmin("System Administrator", "admin@userhub.edu", "Admin12345");
        System.out.println("Seeded ADMIN account: admin@userhub.edu");
    }
}