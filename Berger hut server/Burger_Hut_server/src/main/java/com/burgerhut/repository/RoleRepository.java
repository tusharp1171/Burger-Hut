package com.burgerhut.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.burgerhut.entity.Role;
import com.burgerhut.enums.ERole;



@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
	Optional<Role> findByName(ERole name);
	boolean existsByName(ERole name);
}
