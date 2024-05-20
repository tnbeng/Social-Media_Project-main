package com.tnb.service;

import java.util.List;

import com.tnb.exception.StoryException;
import com.tnb.exception.UserException;
import com.tnb.model.Story;

public interface StoryService {

	public Story createStory(Story story,Integer userId) throws UserException;
	
	public List<Story> findStoryByUserId(Integer userId) throws UserException, StoryException;
	
	
}
