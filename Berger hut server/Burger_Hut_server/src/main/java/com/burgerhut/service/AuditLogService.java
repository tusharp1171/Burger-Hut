package com.burgerhut.service;

import com.burgerhut.entity.AuditLog;

import java.util.List;

public interface AuditLogService {
    AuditLog logAction(AuditLog log);
    List<AuditLog> getAllLogs();
}