package com.burgerhut.controller;

import com.burgerhut.entity.ContactMessage;
import com.burgerhut.service.ContactMessageService;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactMessageController {

	@Autowired
    private ContactMessageService contactMessageService;

    // ✅ Submit a contact message
    @PostMapping
    public ResponseEntity<ContactMessage> submitMessage(@RequestBody ContactMessage message) {
        ContactMessage savedMessage = contactMessageService.submitMessage(message);
        return ResponseEntity.ok(savedMessage);
    }

    // ✅ Get all contact messages (admin only)
    @GetMapping
    public ResponseEntity<List<ContactMessage>> getAllMessages() {
        return ResponseEntity.ok(contactMessageService.getAllMessages());
    }
}
