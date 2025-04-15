package com.burgerhut.dto;

import com.burgerhut.entity.Cart;
import com.burgerhut.entity.MenuItem;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CartItemdto {
	
	  private Long id;
	    private int quantity;
	    private MenuItem menuItem;
	    private Cart cart;

}
