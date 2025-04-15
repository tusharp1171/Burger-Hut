package com.burgerhut.service.impl;


import com.burgerhut.entity.Order;
import com.burgerhut.entity.OrderItem;
import com.burgerhut.repository.OrderItemRepository;
import com.burgerhut.service.OrderItemService;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderItemServiceImpl implements OrderItemService {

	@Autowired
    private OrderItemRepository orderItemRepository;

    @Override
    public OrderItem saveOrderItem(OrderItem item) {
        return orderItemRepository.save(item);
    }

    @Override
    public List<OrderItem> getOrderItemsByOrder(Order order) {
        return orderItemRepository.findByOrder(order);
    }
}