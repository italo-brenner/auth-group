package br.com.authgroup.usergroup;

public class UserGroupDTO {
	
	private Long id;
	
	private String name;
	
	public UserGroupDTO() {
	}

	public UserGroupDTO(UserGroup userGroup) {
		this.id = userGroup.getId();
		this.name = userGroup.getName();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
}
