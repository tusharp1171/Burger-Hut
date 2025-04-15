package com.burgerhut.entity;


import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String action; // "MENU_ITEM_CREATED", "ORDER_UPDATED", etc.

    private String performedBy;

    private LocalDateTime timestamp;
}