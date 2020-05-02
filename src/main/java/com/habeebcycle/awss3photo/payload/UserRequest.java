package com.habeebcycle.awss3photo.payload;

import java.io.Serializable;

public class UserRequest implements Serializable {
    private String id;
    private String name;
    private String status;
    private String imageLink;

    public UserRequest(String id, String name, String status, String imageLink) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.imageLink = imageLink;
    }

    public UserRequest() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getImageLink() {
        return imageLink;
    }

    public void setImageLink(String imageLink) {
        this.imageLink = imageLink;
    }
}
