package br.com.authgroup.resource;

import java.util.List;

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
@RequestMapping("/api/resources")
public class ResourceController {

	@Autowired
	private ResourceService resourceService;

	@GetMapping
	public List<Resource> listResources() {
		return resourceService.listResources();
	}

	@PostMapping
	public void createResource(@RequestBody Resource resource) {
		resourceService.createResource(resource);
	}

	@GetMapping("/{id}")
	public ResourceDTO getResource(@PathVariable Long id) {
		Resource resource = resourceService.getResource(id);
		ResourceDTO resourceDTO = new ResourceDTO(resource);
		return resourceDTO;
	}

	@PutMapping("/{id}")
	public void updateResource(@RequestBody Resource resource) {
		resourceService.updateResource(resource);
	}

	@DeleteMapping("/{id}")
	public void deleteResource(@PathVariable Long id) {
		resourceService.deleteResource(id);
	}

	@RequestMapping(value="/page", method=RequestMethod.GET)
	public ResponseEntity<Page<ResourceDTO>> findPage(
			@RequestParam(value="page", defaultValue="0") Integer page,
			@RequestParam(value="linesPerPages", defaultValue="10") Integer linesPerPages,
			@RequestParam(value="orderBy", defaultValue="id") String orderBy,
			@RequestParam(value="direction", defaultValue="ASC") String direction) {
		Page<Resource> resources = resourceService.findPage(page, linesPerPages, orderBy, direction);
		Page<ResourceDTO> resourcesDTO = resources.map(resource -> new ResourceDTO(resource));
		return ResponseEntity.ok().body(resourcesDTO);
	}

}
