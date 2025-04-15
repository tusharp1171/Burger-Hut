package com.burgerhut.repository;

import com.burgerhut.entity.Review;
import com.burgerhut.entity.MenuItem;
import com.burgerhut.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByMenuItem(MenuItem menuItem);
    List<Review> findByUser(User user);
}