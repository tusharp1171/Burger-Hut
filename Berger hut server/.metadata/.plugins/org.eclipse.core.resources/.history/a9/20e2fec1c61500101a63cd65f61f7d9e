package com.burgerhut.service.impl;


import com.burgerhut.entity.ContactMessage;
import com.burgerhut.repository.ContactMessageRepository;
import com.burgerhut.service.ContactMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContactMessageServiceImpl implements ContactMessageService {

    private final ContactMessageRepository contactMessageRepository;

    @Override
    public ContactMessage submitMessage(ContactMessage message) {
        return contactMessageRepository.save(message);
    }

    @Override
    public List<ContactMessage> getAllMessages() {
        return contactMessageRepository.findAll();
    }
}