package br.com.authgroup.resource;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import br.com.authgroup.resource.Resource;
import br.com.authgroup.resource.ResourceRepository;
import br.com.authgroup.core.exception.ObjectNotFoundException;

@Service
public class ResourceService {

	@Autowired
	private ResourceRepository resourceRepository;
	
	public List<Resource> listResources() {
		return resourceRepository.findAll();
	}
	
	private void existsResource(Long id) {
		boolean exists = resourceRepository.existsById(id);
		if (! exists ) {
			throw new ObjectNotFoundException("Objeto não encontrado! Id: " + id + ", Tipo: " + Resource.class.getName());
		}
	}
	
	public void createResource(Resource resource) {
		resourceRepository.save(resource);
	}

	public Resource getResource(Long id) {
		Optional<Resource> resource = resourceRepository.findById(id);
		return resource.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + ", Tipo: " + Resource.class.getName()));
	}
	
	public void updateResource(Resource resource) {
		existsResource(resource.getId());
		resourceRepository.save(resource);
	}
	
	public void deleteResource(Long id) {
		existsResource(id);
		resourceRepository.deleteById(id);
	}

	public Page<Resource> findPage(Integer page, Integer linesPerPages, String orderBy, String direction) {
		PageRequest pageRequest = PageRequest.of(page, linesPerPages, Direction.valueOf(direction), orderBy);
		return resourceRepository.findAll(pageRequest);
	}
	
}
