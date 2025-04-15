package com.burgerhut.service;

import com.burgerhut.entity.CartItem;
import com.burgerhut.entity.Cart;

import java.util.List;

public interface CartItemService {
    CartItem addItemToCart(CartItem item);
    List<CartItem> getItemsByCart(Cart cart);
    void removeCartItem(Long id);
}