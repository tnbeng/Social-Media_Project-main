package com.tnb.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tnb.dto.UserDto;
import com.tnb.dto.UserProfileDto;
import com.tnb.dto.mapper.UserDtoMapper;
import com.tnb.exception.UserException;
import com.tnb.model.User;
import com.tnb.repository.UserRepository;
import com.tnb.response.ApiResponse;
import com.tnb.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

	private UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

//	@GetMapping("/profile")
//	public ResponseEntity<UserProfileDto> getUserProfileHandler(@RequestHeader("Authorization") String jwt) throws UserException {
//
//		User user = userService.findUserProfileByJwt(jwt);
//		user.setPassword(null);
//		
//		UserProfileDto userDto=UserDtoMapper.reqUserDTO(user,user);
//
//		return new ResponseEntity<>(userDto, HttpStatus.ACCEPTED);
//	}
	@GetMapping("/profile")
	public ResponseEntity<User> getUserProfileHandler(@RequestHeader("Authorization") String jwt) throws UserException {

		User user = userService.findUserProfileByJwt(jwt);
		user.setPassword(null);
		
		UserProfileDto userDto=UserDtoMapper.reqUserDTO(user,user);

		return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
	}
	
//	@GetMapping("/{id}")
//	public ResponseEntity<UserProfileDto> findUserByIdHandler(@PathVariable Integer id,
//			@RequestHeader("Authorization") String jwt) throws UserException{
//		User requser = userService.findUserProfileByJwt(jwt);
//		User user=userService.findUserById(id);
//		
//		UserProfileDto userDto=UserDtoMapper.reqUserDTO(user,requser);
//
//		return new ResponseEntity<>(userDto, HttpStatus.ACCEPTED);
//	}
	
	@GetMapping("/{id}")
	public ResponseEntity<User> findUserByIdHandler(@PathVariable Integer id,
			@RequestHeader("Authorization") String jwt) throws UserException{
		User requser = userService.findUserProfileByJwt(jwt);
		User findUser=userService.findUserById(id);
		
		UserProfileDto userDto=UserDtoMapper.reqUserDTO(findUser,requser);

		return new ResponseEntity<>(findUser, HttpStatus.ACCEPTED);
	}
	
	
	@PutMapping("/follow/{followUserId}")
	public ResponseEntity<User> followUserHandler(@RequestHeader("Authorization") String token, @PathVariable Integer followUserId) throws UserException{
		User reqUser=userService.findUserProfileByJwt(token);
		User updatedUser=userService.followUser(reqUser.getId(), followUserId);
		//ApiResponse res=new ApiResponse("follow",true);
		return new ResponseEntity<>(updatedUser,HttpStatus.OK);
	}

	
	
	@GetMapping("/search")
	public ResponseEntity<List<UserDto>> searchUserHandler(@RequestParam("q")String query) throws UserException{
		
		Set<User> users=userService.searchUser(query);
		
		List<UserDto> userDtos=UserDtoMapper.userDTOS(new ArrayList<>(users));
		
		return new ResponseEntity<>(userDtos,HttpStatus.OK);
	}
	
	@PutMapping("/update")
	public ResponseEntity<UserProfileDto> updateUser(@RequestHeader("Authorization") String token, @RequestBody User user) throws UserException{
		
		User reqUser=userService.findUserProfileByJwt(token);
		User updatedUser=userService.updateUserDetails(user, reqUser);
		
		UserProfileDto userDto=UserDtoMapper.reqUserDTO(updatedUser,reqUser);

		return new ResponseEntity<>(userDto, HttpStatus.ACCEPTED);
		
		
	}
	
	//Testing purpose only
	@Autowired
	UserRepository userRepo;
	@GetMapping("/all")
	public List<User> findAllUser()
	{
		return userRepo.findAll();
	}
}
