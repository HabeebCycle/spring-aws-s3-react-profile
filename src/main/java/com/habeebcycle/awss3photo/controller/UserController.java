package com.habeebcycle.awss3photo.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.habeebcycle.awss3photo.model.User;
import com.habeebcycle.awss3photo.payload.UserRequest;
import com.habeebcycle.awss3photo.service.UserService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/v1/user")
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getUsers(){
        return userService.getUsers();
    }

    @GetMapping("/{userId}")
    public User getUser(@PathVariable Long userId){
        return userService.getUser(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id of: " + userId));
    }

    /*
    * Replaced with saveUserWithImage method below
    *
    @PostMapping("/add")
    public User saveUser(@RequestBody User user){
        return userService.saveUser(user);
    }

    * Replaced with updateUserWithImage method below
    *
    @PutMapping
    public User updateUser(@RequestBody User user){
        return userService.saveUser(user);
    }
    */


    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable Long userId){
        userService.deleteUser(userId);
    }

    @PostMapping(
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public User saveUserWithImage(@RequestParam("user") String userJson,
                                  @RequestParam(name = "file", required = false) MultipartFile file) throws IOException {
        return userService.saveUserWithImage(userJson, file);
    }

    @PutMapping(
            path = "/{userId}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public User updateUserWithImage(@PathVariable Long userId,
                            @RequestParam MultipartFile file){
        return userService.updateUserWithImage(userId, file);
    }

    @PutMapping(
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public User updateUserAndImage(@RequestParam("user") String userJson,
                                  @RequestParam(name = "file", required = false) MultipartFile file) throws IOException {
        return userService.updateUserAndImage(userJson, file);
    }

    @GetMapping("/image/{userId}")
    public byte[] getUserImage(@PathVariable Long userId) {
        return userService.getUserImageFromS3(userId);
    }
}
