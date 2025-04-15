package com.burgerhut.service;
import com.burgerhut.entity.Payment;
import com.burgerhut.dto.PaymentRequest;
import com.burgerhut.entity.Order;

import java.util.Optional;

public interface PaymentService {
    Payment processPayment(Payment payment);
    Optional<Payment> getPaymentByOrder(Order order);
    Payment getPaymentById(Long id);
    public Payment makePayment(PaymentRequest request);
}