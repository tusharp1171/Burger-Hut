package com.burgerhut.service.impl;


import com.burgerhut.entity.AuditLog;
import com.burgerhut.repository.AuditLogRepository;
import com.burgerhut.service.AuditLogService;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuditLogServiceImpl implements AuditLogService {

	@Autowired
    private AuditLogRepository auditLogRepository;

    @Override
    public AuditLog logAction(AuditLog log) {
        return auditLogRepository.save(log);
    }

    @Override
    public List<AuditLog> getAllLogs() {
        return auditLogRepository.findAll();
    }
}