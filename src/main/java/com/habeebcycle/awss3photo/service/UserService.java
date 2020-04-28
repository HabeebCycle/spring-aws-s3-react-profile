package com.habeebcycle.awss3photo.service;

import com.habeebcycle.awss3photo.model.User;
import com.habeebcycle.awss3photo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public Optional<User> getUser(Long id){
        return userRepository.findById(id);
    }

    public User saveUser(User user){
        return userRepository.save(user);
    }

    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }

    public Optional<User> updateImageLink(Long id, Optional<String> imageLink){
        Optional<User> user = getUser(id);
        if(user.isPresent()){
            if(imageLink.isPresent()){
                user.get().setImageLink(imageLink.get());
                saveUser(user.get());
            }
        }
        return getUser(id);
    }
}
