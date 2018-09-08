package br.com.authgroup.applicationuser;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.com.authgroup.core.exception.ObjectNotFoundException;
import br.com.authgroup.core.security.UserSS;

@Service
public class ApplicationUserService implements UserDetailsService {

	@Autowired
	private ApplicationUserRepository applicationUserRepository;
	
	public List<ApplicationUser> listApplicationUsers() {
		return applicationUserRepository.findAll();
	}
	
	private void existsApplicationUser(Long id) {
		boolean exists = applicationUserRepository.existsById(id);
		if (! exists ) {
			throw new ObjectNotFoundException("Objeto não encontrado! Id: " + id + ", Tipo: " + ApplicationUser.class.getName());
		}
	}
	
	public void createApplicationUser(ApplicationUser applicationUser) {
		applicationUserRepository.save(applicationUser);
	}

	public ApplicationUser getApplicationUser(Long id) {
		Optional<ApplicationUser> applicationUser = applicationUserRepository.findById(id);
		return applicationUser.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + ", Tipo: " + ApplicationUser.class.getName()));
	}
	
	public void updateApplicationUser(ApplicationUser applicationUser) {
		existsApplicationUser(applicationUser.getId());
		applicationUserRepository.save(applicationUser);
	}
	
	public void deleteApplicationUser(Long id) {
		existsApplicationUser(id);
		applicationUserRepository.deleteById(id);
	}

	public Page<ApplicationUser> findPage(Integer page, Integer linesPerPages, String orderBy, String direction) {
		PageRequest pageRequest = PageRequest.of(page, linesPerPages, Direction.valueOf(direction), orderBy);
		return applicationUserRepository.findAll(pageRequest);
	}
	
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
