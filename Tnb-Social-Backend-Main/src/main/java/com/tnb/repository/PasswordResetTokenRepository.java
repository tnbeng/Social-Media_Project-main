package com.tnb.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tnb.model.PasswordResetToken;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Integer> {

	PasswordResetToken findByToken(String token);

}
