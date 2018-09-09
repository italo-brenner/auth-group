package br.com.authgroup.usergroup;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/usergroups")
public class UserGroupController {

	@Autowired
	private UserGroupService userGroupService;

	@GetMapping
	public List<UserGroupDTO> listUserGroups() {
		List<UserGroupDTO> listUserGroupDTO = userGroupService.listUserGroups().stream().map(userGroup -> new UserGroupDTO(userGroup)).collect(Collectors.toList());
		return listUserGroupDTO;
	}

	@PostMapping
	public void createUserGroup(@RequestBody UserGroup userGroup) {
		userGroupService.createUserGroup(userGroup);
	}

	@GetMapping("/{id}")
	public UserGroupDTO getUserGroup(@PathVariable Long id) {
		UserGroup userGroup = userGroupService.getUserGroup(id);
		UserGroupDTO userGroupDTO = new UserGroupDTO(userGroup);
		return userGroupDTO;
	}

	@PutMapping("/{id}")
	public void updateUserGroup(@RequestBody UserGroup userGroup) {
		userGroupService.updateUserGroup(userGroup);
	}

	@DeleteMapping("/{id}")
	public void deleteUserGroup(@PathVariable Long id) {
		userGroupService.deleteUserGroup(id);
	}

	@RequestMapping(value="/page", method=RequestMethod.GET)
	public ResponseEntity<Page<UserGroupDTO>> findPage(
			@RequestParam(value="page", defaultValue="0") Integer page,
			@RequestParam(value="linesPerPages", defaultValue="10") Integer linesPerPages,
			@RequestParam(value="orderBy", defaultValue="id") String orderBy,
			@RequestParam(value="direction", defaultValue="ASC") String direction) {
		Page<UserGroup> userGroups = userGroupService.findPage(page, linesPerPages, orderBy, direction);
		Page<UserGroupDTO> userGroupsDTO = userGroups.map(userGroup -> new UserGroupDTO(userGroup));
		return ResponseEntity.ok().body(userGroupsDTO);
	}

}
