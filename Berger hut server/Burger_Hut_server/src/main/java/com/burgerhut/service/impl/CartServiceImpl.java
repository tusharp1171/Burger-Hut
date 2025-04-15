package com.burgerhut.service.impl;


import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.burgerhut.dto.AddCartItemRequest;
import com.burgerhut.entity.Cart;
import com.burgerhut.entity.CartItem;
import com.burgerhut.entity.MenuItem;
import com.burgerhut.entity.User;
import com.burgerhut.repository.CartItemRepository;
import com.burgerhut.repository.CartRepository;
import com.burgerhut.repository.MenuItemRepository;
import com.burgerhut.repository.UserRepository;
import com.burgerhut.service.CartService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

	@Autowired
    private CartRepository cartRepository;
	
	@Autowired
    private CartItemRepository cartItemRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	MenuItemRepository menuItemRepository;
	

    @Override
    public Cart getCartByUser(User user) {
        return cartRepository.findByUser(user)
                .orElseGet(() -> {
                    Cart newCart = new Cart(user);
                    return cartRepository.save(newCart);
                });
    }

    @Override
    public Cart saveCart(Cart cart) {
        Optional<Cart> existingCartOpt = cartRepository.findByUser(cart.getUser());

        if (existingCartOpt.isPresent()) {
            Cart existingCart = existingCartOpt.get();

            // Create a map of existing menu items for quick lookup
            Map<Long, CartItem> existingItemsMap = new HashMap<>();
            for (CartItem item : existingCart.getItems()) {
                existingItemsMap.put(item.getMenuItem().getId(), item);
            }

            for (CartItem newItem : cart.getItems()) {
                Long menuItemId = newItem.getMenuItem().getId();
                if (existingItemsMap.containsKey(menuItemId)) {
                    // If item exists, just increment the quantity
                    CartItem existingItem = existingItemsMap.get(menuItemId);
                    existingItem.setQuantity(existingItem.getQuantity() + newItem.getQuantity());
                } else {
                    // If item doesn't exist, add it to the cart
                    newItem.setCart(existingCart);
                    existingCart.getItems().add(newItem);
                }
            }

            return cartRepository.save(existingCart);
        } else {
            // New cart, set cart reference in items
            for (CartItem item : cart.getItems()) {
                item.setCart(cart);
            }
            return cartRepository.save(cart);
        }
    }



    @Override
    public void clearCartByUserId(Long userId) {
        cartItemRepository.deleteByUserId(userId);
    }
    
    
    public void addToCart(AddCartItemRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        MenuItem menuItem = menuItemRepository.findById(request.getMenuItemId())
                .orElseThrow(() -> new RuntimeException("Menu item not found"));

        Cart cart = cartRepository.findByUserId(user.getId()).orElseGet(() -> {
            Cart newCart = Cart.builder().user(user).build();
            return cartRepository.save(newCart);
        });

        Optional<CartItem> existingItem = cartItemRepository.findByCartIdAndMenuItemId(cart.getId(), menuItem.getId());

        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + request.getQuantity());
            cartItemRepository.save(item);
        } else {
            CartItem newItem = CartItem.builder()
                    .cart(cart)
                    .menuItem(menuItem)
                    .quantity(request.getQuantity())
                    .build();
            cartItemRepository.save(newItem);
        }
    }
    
    
}