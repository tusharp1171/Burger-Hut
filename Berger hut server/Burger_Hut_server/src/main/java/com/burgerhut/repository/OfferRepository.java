package com.burgerhut.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.burgerhut.entity.Offer;
@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {
	Optional<Offer> findByCode(String code);
}