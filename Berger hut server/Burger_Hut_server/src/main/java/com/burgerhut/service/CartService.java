package com.burgerhut.service;

import com.burgerhut.dto.AddCartItemRequest;
import com.burgerhut.entity.Cart;
import com.burgerhut.entity.User;

import java.util.Optional;

public interface CartService {
    Cart getCartByUser(User user);
    Cart saveCart(Cart cart);
    void clearCartByUserId(Long cartId);
    void addToCart(AddCartItemRequest request);
}