package br.com.authgroup.applicationuser;

import java.io.Serializable;

import br.com.authgroup.usergroup.UserGroupDTO;

public class ApplicationUserDTO implements Serializable {
	
	private static final long serialVersionUID = 1L;

	private Long id;
	
	private String username;
	
	private String password;
	
	private UserGroupDTO userGroup;

	public ApplicationUserDTO() {
	}

	public ApplicationUserDTO(ApplicationUser applicationUser) {
		this.id = applicationUser.getId();
		this.username = applicationUser.getUsername();
		this.password = applicationUser.getPassword();
		this.userGroup = new UserGroupDTO(applicationUser.getUserGroup());
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public UserGroupDTO getUserGroup() {
		return userGroup;
	}

	public void setUserGroup(UserGroupDTO userGroup) {
		this.userGroup = userGroup;
	}
	
}
