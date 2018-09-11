package br.com.authgroup.menu;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.authgroup.usergroup.UserGroup;

public interface MenuRepository extends JpaRepository<Menu, Long> {

	public List<Menu> findByListUserGroup(UserGroup currentUserGroup);
	
}
