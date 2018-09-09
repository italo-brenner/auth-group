package br.com.authgroup.usergroup;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import br.com.authgroup.applicationuser.ApplicationUser;
import br.com.authgroup.core.exception.ObjectNotFoundException;
import br.com.authgroup.resource.Resource;

@Service
public class UserGroupService {

	@Autowired
	private UserGroupRepository userGroupRepository;
	
	public List<UserGroup> listUserGroups() {
		return userGroupRepository.findAll();
	}
	
	private void existsUserGroup(Long id) {
		boolean exists = userGroupRepository.existsById(id);
		if (! exists ) {
			throw new ObjectNotFoundException("Objeto não encontrado! Id: " + id + ", Tipo: " + UserGroup.class.getName());
		}
	}
	
	public void createUserGroup(UserGroup userGroup) {
		userGroupRepository.save(userGroup);
	}

	public UserGroup getUserGroup(Long id) {
		Optional<UserGroup> userGroup = userGroupRepository.findById(id);
		return userGroup.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + ", Tipo: " + UserGroup.class.getName()));
	}
	
	public void updateUserGroup(UserGroup userGroup) {
		existsUserGroup(userGroup.getId());
		userGroupRepository.save(userGroup);
	}
	
	public void deleteUserGroup(Long id) {
		UserGroup mUserGroup = getUserGroup(id);
		for (Resource resource : mUserGroup.getListResource()) {
			resource.getListUserGroup().remove(mUserGroup);
		}
		for (ApplicationUser applicationUser : mUserGroup.getListApplicationUser()) {
			applicationUser.setUserGroup(null);
		}
		userGroupRepository.delete(mUserGroup);
	}

	public Page<UserGroup> findPage(Integer page, Integer linesPerPages, String orderBy, String direction) {
		PageRequest pageRequest = PageRequest.of(page, linesPerPages, Direction.valueOf(direction), orderBy);
		return userGroupRepository.findAll(pageRequest);
	}
	
	public List<UserGroup> getNotUserGroupFromResource(Long id) {
		return userGroupRepository.getNotUserGroupFromResource(id);
	}
	
}
