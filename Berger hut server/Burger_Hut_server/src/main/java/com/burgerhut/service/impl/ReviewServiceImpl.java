package com.burgerhut.service.impl;

import com.burgerhut.entity.MenuItem;
import com.burgerhut.entity.Review;
import com.burgerhut.entity.User;
import com.burgerhut.repository.ReviewRepository;
import com.burgerhut.service.ReviewService;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

	@Autowired
    private ReviewRepository reviewRepository;

    @Override
    public Review leaveReview(Review review) {
        return reviewRepository.save(review);
    }

    @Override
    public List<Review> getReviewsByMenuItem(MenuItem menuItem) {
        return reviewRepository.findByMenuItem(menuItem);
    }

    @Override
    public List<Review> getReviewsByUser(User user) {
        return reviewRepository.findByUser(user);
    }
}