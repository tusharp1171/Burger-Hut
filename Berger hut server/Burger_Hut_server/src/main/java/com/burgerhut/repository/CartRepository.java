package com.burgerhut.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.burgerhut.entity.Cart;
import com.burgerhut.entity.User;

import jakarta.transaction.Transactional;
@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUser(User user);
    
    Optional<Cart> findByUserId(Long userId);
    
   
    
}