package br.com.authgroup.applicationuser;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/applicationuser")
public class ApplicationUserController {
	
	private ApplicationUserRepository applicationUserRepository;
	
	public ApplicationUserController(ApplicationUserRepository applicationUserRepository) {
		this.applicationUserRepository = applicationUserRepository;
	}
	
	@PostMapping("/signup")
	public void signUp(@RequestBody ApplicationUser user) {
		user.setPassword(user.getPassword());
		applicationUserRepository.save(user);
	}
	
	@GetMapping
	public List<ApplicationUser> getListApplicationUser() {
		return applicationUserRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public ApplicationUser getApplicationUser(@PathVariable Long id) {
		return applicationUserRepository.findOne(id);
	}
	
}
