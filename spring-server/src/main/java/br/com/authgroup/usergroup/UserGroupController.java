package br.com.authgroup.usergroup;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/usergroup")
public class UserGroupController {
	
	private UserGroupRepository userGroupRepository;
	
	public UserGroupController(UserGroupRepository groupRepository) {
		this.userGroupRepository = groupRepository;
	}
	
	@GetMapping
	public List<UserGroup> getUserGroup() {
		return userGroupRepository.findAll();
	}
	
	@PostMapping
	public void createUserGroup(@RequestBody UserGroup userGroup) {
		userGroupRepository.save(userGroup);
	}
	
}
