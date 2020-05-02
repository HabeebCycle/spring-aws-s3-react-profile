package com.habeebcycle.awss3photo.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.habeebcycle.awss3photo.S3Service.S3Utils;
import com.habeebcycle.awss3photo.model.User;
import com.habeebcycle.awss3photo.payload.UserRequest;
import com.habeebcycle.awss3photo.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

import static org.apache.http.entity.ContentType.*;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final S3Utils s3Utils;

    public UserService(UserRepository userRepository, S3Utils s3Utils) {
        this.userRepository = userRepository;
        this.s3Utils = s3Utils;
    }

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public Optional<User> getUser(Long id){
        return userRepository.findById(id);
    }

    public User saveUser(User user){
        if(user.getId() == null) {
            user.setUserId(UUID.randomUUID().toString());
        }
        return userRepository.save(user);
    }

    public void deleteUser(Long id){
        deleteImageFromS3(id);
        userRepository.deleteById(id);
    }

    private void updateImageLink(Long id, Optional<String> imageLink){
        Optional<User> user = getUser(id);
        if(user.isPresent()){
            if(imageLink.isPresent()){
                user.get().setImageLink(imageLink.get());
                saveUser(user.get());
            }
        }
    }

    public User saveUserWithImage(String user, MultipartFile file) throws IOException {
        User newUser = saveUser(convertUserString(user));
        return saveImage(file, newUser);
    }

    public User updateUserAndImage(String user, MultipartFile file) throws IOException {
        User updatedUser = saveUser(convertUserString(user));
        return saveImage(file, updatedUser);
    }

    public User updateUserWithImage(Long id, MultipartFile file) {
        User user = getUser(id).orElseThrow(() -> new IllegalArgumentException("User with id: "+ id +" not found"));
        isFileEmpty(file);
        isImage(file);
        Optional<String> imageLink = putUserImageToS3(user, file);
        updateImageLink(user.getId(), imageLink);
        return getUser(id).orElseThrow(() -> new IllegalArgumentException("User with id: "+ id +" not found"));
    }

    public byte[] getUserImageFromS3(Long id) {
        Optional<User> optUser = getUser(id);
        if(optUser.isPresent()) {
            User user = optUser.get();

            String path = String.format("%s/%s",
                    s3Utils.getPhotoBucket(),
                    user.getUserId());

            return user.getImageLink()
                    .map(key -> s3Utils.getFromS3(path, key))
                    .orElse(new byte[0]);
        } else {
            return new byte[0];
        }
    }

    private User convertUserString(String userJson) throws IOException{
        ObjectMapper mapper = new ObjectMapper();
        UserRequest userRequest = mapper.readValue(userJson, UserRequest.class);
        if(userRequest.getId() != null){
            Optional<User> optUser = getUser(Long.parseLong(userRequest.getId()));
            if(optUser.isPresent()){
                User user = optUser.get();
                user.setName(userRequest.getName().length() > 0 ? userRequest.getName() : user.getName());
                user.setStatus(userRequest.getStatus());
                return user;
            }
        }
        return new User(userRequest.getName(),
                    userRequest.getStatus(), userRequest.getImageLink());
    }

    private Optional<String> putUserImageToS3(User user, MultipartFile file){
        String filename;
        Map<String, String> metadata = extractMetadata(file);

        String path = String.format("%s/%s", s3Utils.getPhotoBucket(), user.getUserId());
        filename = String.format("%s-%s", file.getOriginalFilename(), UUID.randomUUID());

        try {
            s3Utils.saveToS3(path, filename, Optional.of(metadata), file.getInputStream());
        } catch (IOException ioe) {
            throw new IllegalStateException(ioe);
        }
        return Optional.ofNullable(filename);
    }

    private void deleteImageFromS3(Long id){
        Optional<User> optUser = getUser(id);
        if(optUser.isPresent()) {
            User user = optUser.get();

            String path = String.format("%s/%s",
                    s3Utils.getPhotoBucket(),
                    user.getUserId());

            if(user.getImageLink().isPresent()) {
                s3Utils.deleteFromS3(path, user.getImageLink().get());
            }
        }
    }

    private User saveImage(MultipartFile file, User user) {
        if(file != null){
            isFileEmpty(file);
            isImage(file);
            Optional<String> imageLink = putUserImageToS3(user, file);
            imageLink.ifPresent(user::setImageLink);
            updateImageLink(user.getId(), imageLink);
        }
        return user;
    }

    private Map<String, String> extractMetadata(MultipartFile file) {
        Map<String, String> metadata = new HashMap<>();
        metadata.put("Content-Type", file.getContentType());
        metadata.put("Content-Length", String.valueOf(file.getSize()));
        return metadata;
    }

    private void isImage(MultipartFile file) {
        if (!Arrays.asList(
                IMAGE_JPEG.getMimeType(),
                IMAGE_PNG.getMimeType()).contains(file.getContentType())) {
            throw new IllegalStateException("File must be an image [" + file.getContentType() + "]");
        }
        if(file.getSize() > 1024000){
            throw  new IllegalStateException("File size is more than 1MB: [" + file.getSize() + "]");
        }
    }

    private void isFileEmpty(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalStateException("Cannot upload empty file [ " + file.getSize() + "]");
        }
    }
}
