package br.com.authgroup.applicationuser;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.com.authgroup.core.security.UserSS;

@Service
public class ApplicationUserService implements UserDetailsService {

	@Autowired
	private ApplicationUserRepository applicationUserRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<ApplicationUser> optApplicationUser = applicationUserRepository.findByUsername(username);
		if (! optApplicationUser.isPresent()) {
			throw new UsernameNotFoundException(username);
		}
		ApplicationUser applicationUser = optApplicationUser.get();
		return new UserSS(applicationUser.getId() , applicationUser.getUsername(), applicationUser.getPassword(), applicationUser.getUserGroup());
	}

}
