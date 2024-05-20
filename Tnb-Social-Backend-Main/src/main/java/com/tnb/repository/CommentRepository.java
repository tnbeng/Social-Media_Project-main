package com.tnb.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tnb.model.Comments;


public interface CommentRepository extends JpaRepository<Comments, Integer> {

}
