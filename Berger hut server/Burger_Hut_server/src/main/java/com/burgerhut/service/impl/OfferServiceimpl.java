package com.burgerhut.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.burgerhut.entity.Offer;
import com.burgerhut.exception.OfferNotFoundException;
import com.burgerhut.repository.OfferRepository;

@Service
public class OfferServiceimpl {
	@Autowired
	private OfferRepository offerRepository;

	public List<Offer> getAllOffers() {
		return offerRepository.findAll();
	}

	public Offer createOffer(Offer offer) {
		return offerRepository.save(offer);
	}
	
    public Double getDiscountPercentageByCode(String code) {
        Offer offer = offerRepository.findByCode(code)
                .orElseThrow(() -> new OfferNotFoundException("Invalid voucher code"));
        return offer.getPercentageOff();
    }
    
    
    public Offer updateOffer(Long id, Offer offer) {
        Optional<Offer> existingOffer = offerRepository.findById(id);
        if (existingOffer.isPresent()) {
            Offer updatedOffer = existingOffer.get();
            updatedOffer.setCode(offer.getCode());
            updatedOffer.setDescription(offer.getDescription());
            updatedOffer.setPercentageOff(offer.getPercentageOff());
            return offerRepository.save(updatedOffer);
        }
        return null;
    }


    public boolean deleteOffer(Long id) {
        if (offerRepository.existsById(id)) {
            offerRepository.deleteById(id);
            return true;
        }
        return false;
    }
}