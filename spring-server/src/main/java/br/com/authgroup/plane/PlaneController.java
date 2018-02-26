package br.com.authgroup.plane;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/plane")
public class PlaneController {

	private PlaneRepository planeRepository;
	
	public PlaneController(PlaneRepository planeRepository) {
		this.planeRepository = planeRepository;
	}
	
	@GetMapping
	public List<Plane> getPlane() {
		return planeRepository.findAll();
	}
	
	@PostMapping
	public void createPlane(@RequestBody Plane plane) {
		planeRepository.save(plane);
	}

	@GetMapping("/{id}")
	public Optional<Plane> getUserGroup(@PathVariable Long id) {
		return planeRepository.findById(id);
	}
	
}
