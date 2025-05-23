package com.burgerhut.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.burgerhut.dto.JwtResponse;
import com.burgerhut.dto.LoginRequest;
import com.burgerhut.dto.MessageResponse;
import com.burgerhut.dto.SignupRequest;
import com.burgerhut.entity.Role;
import com.burgerhut.entity.User;
import com.burgerhut.enums.ERole;
import com.burgerhut.exception.AuthenticationException;
import com.burgerhut.exception.EmailAlreadyInUseException;
import com.burgerhut.exception.UsernameAlreadyTakenException;
import com.burgerhut.repository.RoleRepository;
import com.burgerhut.repository.UserRepository;
import com.burgerhut.security.jwt.JwtUtils;
import com.burgerhut.service.impl.UserDetailsImpl;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;


	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		try {
			Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

			SecurityContextHolder.getContext().setAuthentication(authentication);
			String jwt = jwtUtils.generateJwtToken(authentication);

			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
			List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
					.collect(Collectors.toList());

			return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(),
					userDetails.getEmail(), roles));
		} catch (BadCredentialsException e) {
			throw new AuthenticationException("Invalid username or password!");
		}
	}

	@GetMapping("/validateToken")
	public ResponseEntity<String> validateToken(
			@RequestHeader(value = HttpHeaders.AUTHORIZATION, required = true) String token) {
		try {
			// Check if the token starts with "Bearer " and remove it
			if (token.startsWith("Bearer ")) {
				token = token.substring(7); // Remove "Bearer " part
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token must be prefixed with 'Bearer '");
			}

			// Validate the token using JwtUtils
			boolean isValid = jwtUtils.validateJwtToken(token);

			if (isValid) {
				return ResponseEntity.ok("Token is valid");
			} else {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error validating token: " + e.getMessage());
		}
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			throw new UsernameAlreadyTakenException("Error: Username is already taken!");
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			throw new EmailAlreadyInUseException("Error: Email is already in use!");
		}
		User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(),
				encoder.encode(signUpRequest.getPassword()), signUpRequest.getMobile());
		Set<String> strRoles = signUpRequest.getRole();
		Set<Role> roles = new HashSet<>();
		if (strRoles == null || strRoles.isEmpty()) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Default user role not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Admin role not found."));
					roles.add(adminRole);
					break;
					default:
					// If role is unrecognized, assign the "USER" role
					Role userRole = roleRepository.findByName(ERole.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: User role not found."));
					roles.add(userRole);
				}
			});
		}
		user.setRoles(roles);
		userRepository.save(user);
		String successMessage = "User registered successfully!";
		if (roles.stream().anyMatch(role -> role.getName().equals(ERole.ROLE_ADMIN))) {
			successMessage = "Admin registered successfully!";
		} else if (roles.stream().anyMatch(role -> role.getName().equals(ERole.ROLE_MODERATOR))) {
			successMessage = "Moderator registered successfully!";
		} 
		return ResponseEntity.ok(new MessageResponse(successMessage));
	}
	
	
	
	@GetMapping("/id/{username}")
    public ResponseEntity<Long> getUserIdByUsername(@PathVariable String username) {
        return userRepository.findByUsername(username)
                .map(user -> ResponseEntity.ok(user.getId()))
                .orElse(ResponseEntity.notFound().build());
    }
	
	
	
}
