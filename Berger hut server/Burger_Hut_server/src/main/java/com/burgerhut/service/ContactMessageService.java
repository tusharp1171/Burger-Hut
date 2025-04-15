package com.burgerhut.service;

import com.burgerhut.entity.ContactMessage;

import java.util.List;

public interface ContactMessageService {
    ContactMessage submitMessage(ContactMessage message);
    List<ContactMessage> getAllMessages();
}