package br.com.authgroup.core.security;

import java.util.Arrays;
import java.util.Collection;
import java.util.Iterator;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import br.com.authgroup.usergroup.UserGroup;

public class UserSS implements UserDetails {

	private static final long serialVersionUID = 1L;

	private Long id;
	private String username;
	private String password;
	private Collection<? extends GrantedAuthority> authorities;
	
	public UserSS() {
	}
	
	public UserSS(Long id, String username, String password, UserGroup userGroup) {
		this.id = id;
		this.username = username;
		this.password = password;
		this.authorities = Arrays.asList(new SimpleGrantedAuthority(userGroup.getName()));
	}
	
	public Long getId() {
		return id;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
	
	public String getRole() {
		String role = null;
		Iterator<? extends GrantedAuthority> authorities = getAuthorities().iterator();
		if (authorities.hasNext()) {
			SimpleGrantedAuthority authority = (SimpleGrantedAuthority) authorities.next();
			role = authority.getAuthority();
		} else {
			role = "ROLE_ANONYMOUS";
		}
		return role;
	}

}
