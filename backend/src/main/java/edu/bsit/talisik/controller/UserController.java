package edu.bsit.talisik.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.bsit.talisik.dto.UpdateProfileRequest;
import edu.bsit.talisik.dto.UserResponse;
import edu.bsit.talisik.service.UserService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private static final String AUTH = "Authorization";
    private final UserService service;

    public UserController(UserService service) { this.service = service; }

    @GetMapping("/me")
    public UserResponse me(@RequestHeader(value = AUTH, required = false) String t) {
        return service.me(service.authenticate(t));
    }

    @PutMapping("/me")
    public UserResponse update(
            @RequestHeader(value = AUTH, required = false) String t,
            @Valid @RequestBody UpdateProfileRequest req) {
        return service.updateProfile(service.authenticate(t), req);
    }
}