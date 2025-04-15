package com.burgerhut.service;

import com.burgerhut.entity.MenuItem;
import com.burgerhut.entity.Review;
import com.burgerhut.entity.User;

import java.util.List;

public interface ReviewService {
    Review leaveReview(Review review);
    List<Review> getReviewsByMenuItem(MenuItem menuItem);
    List<Review> getReviewsByUser(User user);
}