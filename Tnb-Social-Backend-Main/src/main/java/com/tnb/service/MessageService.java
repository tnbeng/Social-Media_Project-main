package com.tnb.service;

import java.util.List;

import com.tnb.exception.ChatException;
import com.tnb.exception.MessageException;
import com.tnb.exception.UserException;
import com.tnb.model.Message;
import com.tnb.request.SendMessageRequest;

public interface MessageService  {
	
	public Message sendMessage(SendMessageRequest req) throws UserException, ChatException;
	
	public List<Message> getChatsMessages(Integer chatId) throws ChatException;
	
	public Message findMessageById(Integer messageId) throws MessageException;
	
	public String deleteMessage(Integer messageId) throws MessageException;

}
