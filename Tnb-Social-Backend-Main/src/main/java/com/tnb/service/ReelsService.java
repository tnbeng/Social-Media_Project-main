package com.tnb.service;

import java.util.List;

import com.tnb.exception.UserException;
import com.tnb.model.Reels;
import com.tnb.model.User;

public interface ReelsService {
	
	public Reels createReel(Reels reel,User user);
	public List<Reels> findAllReels();
	public List<Reels> findUsersReel(Integer userId) throws UserException;

}
