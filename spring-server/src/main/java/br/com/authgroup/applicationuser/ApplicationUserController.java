package br.com.authgroup.applicationuser;

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
@RequestMapping("/api/applicationusers")
public class ApplicationUserController {
	
	@Autowired
	private ApplicationUserService applicationUserService;

	@GetMapping
	public List<ApplicationUserDTO> listApplicationUsers() {
		List<ApplicationUserDTO> listApplicationUserDTO = applicationUserService.listApplicationUsers().stream().map(applicationUser -> new ApplicationUserDTO(applicationUser)).collect(Collectors.toList());
		return listApplicationUserDTO;
	}

	@PostMapping
	public void createApplicationUser(@RequestBody ApplicationUser applicationUser) {
		applicationUserService.createApplicationUser(applicationUser);
	}

	@GetMapping("/{id}")
	public ApplicationUserDTO getApplicationUser(@PathVariable Long id) {
		return new ApplicationUserDTO(applicationUserService.getApplicationUser(id));
	}

	@PutMapping("/{id}")
	public void updateApplicationUser(@RequestBody ApplicationUser applicationUser) {
		applicationUserService.updateApplicationUser(applicationUser);
	}

	@DeleteMapping("/{id}")
	public void deleteApplicationUser(@PathVariable Long id) {
		applicationUserService.deleteApplicationUser(id);
	}

	@RequestMapping(value="/page", method=RequestMethod.GET)
	public ResponseEntity<Page<ApplicationUserDTO>> findPage (
			@RequestParam(value="page", defaultValue="0") Integer page,
			@RequestParam(value="linesPerPages", defaultValue="10") Integer linesPerPages,
			@RequestParam(value="orderBy", defaultValue="id") String orderBy,
			@RequestParam(value="direction", defaultValue="ASC") String direction) {
		Page<ApplicationUser> applicationUsers = applicationUserService.findPage(page, linesPerPages, orderBy, direction);
		Page<ApplicationUserDTO> applicationUsersDTO = applicationUsers.map(applicationUser -> new ApplicationUserDTO(applicationUser));
		return ResponseEntity.ok().body(applicationUsersDTO);
	}
	
}
