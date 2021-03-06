package br.com.authgroup.usergroup;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import br.com.authgroup.applicationuser.ApplicationUser;
import br.com.authgroup.resource.Resource;

@Entity
public class UserGroup implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	
	@OneToMany(mappedBy="userGroup")
	private List<ApplicationUser> listApplicationUser = new ArrayList<>();
	
	@ManyToMany(mappedBy="listUserGroup")
	private List<Resource> listResource = new ArrayList<>();
	
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

	public List<ApplicationUser> getListApplicationUser() {
		return listApplicationUser;
	}

	public void setListApplicationUser(List<ApplicationUser> listApplicationUser) {
		this.listApplicationUser = listApplicationUser;
	}

	public List<Resource> getListResource() {
		return listResource;
	}

	public void setListResource(List<Resource> listResource) {
		this.listResource = listResource;
	}

}
