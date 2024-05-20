package com.tnb.service;

import com.tnb.exception.CommentException;
import com.tnb.exception.PostException;
import com.tnb.exception.UserException;
import com.tnb.model.Comments;

public interface CommentService {
	
	public Comments createComment(Comments comment,Integer postId,Integer userId) throws PostException, UserException;

	public Comments findCommentById(Integer commentId) throws CommentException;
	public Comments likeComment(Integer CommentId,Integer userId) 
			throws UserException, CommentException;
}
