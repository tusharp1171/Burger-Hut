package com.burgerhut.repository;


import com.burgerhut.entity.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
}