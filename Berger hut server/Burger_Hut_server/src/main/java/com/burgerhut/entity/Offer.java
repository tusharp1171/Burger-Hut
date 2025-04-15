package com.burgerhut.entity;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "offers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Offer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String title;

	@Column(length = 500)
	private String description;

	private String code;

	@Column(name = "valid_till")
	private OffsetDateTime validTill;

	private String image; // Path or URL to image

	private Double percentageOff; // ✅ New field for % discount
	
	
	public Offer(Long id, String title, String description, String code, String validTill, Double percentageOff, String image) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.code = code;
        this.validTill = OffsetDateTime.parse(validTill); // Parsing the validTill string to OffsetDateTime
        this.percentageOff = percentageOff;
        this.image = image;
    }
}