package br.com.authgroup.resource;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/resource")
public class ResourceController {
	
	private ResourceRepository resourceRepository;
	
	public ResourceController(ResourceRepository resourceRepository) {
		this.resourceRepository = resourceRepository;
	}
	
	@GetMapping
	public List<Resource> getResource() {
		return resourceRepository.findAll();
	}
	
	@PostMapping
	public void createResource(@RequestBody Resource resource) {
		resourceRepository.save(resource);
	}

	@GetMapping("/{id}")
	public Optional<Resource> getUserGroup(@PathVariable Long id) {
		return resourceRepository.findById(id);
	}
	
}
