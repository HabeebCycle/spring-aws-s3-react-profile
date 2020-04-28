package com.habeebcycle.awss3photo.repository;

import com.habeebcycle.awss3photo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
