package br.com.authgroup.plane;

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
@RequestMapping("/api/planes")
public class PlaneController {

	@Autowired
	private PlaneService planeService;

	@GetMapping
	public List<Plane> listPlanes() {
		return planeService.listPlanes();
	}

	@PostMapping
	public void createPlane(@RequestBody Plane plane) {
		planeService.createPlane(plane);
	}

	@GetMapping("/{id}")
	public Plane getPlane(@PathVariable Long id) {
		return planeService.getPlane(id);
	}

	@PutMapping("/{id}")
	public void updatePlane(@RequestBody Plane plane) {
		planeService.updatePlane(plane);
	}

	@DeleteMapping("/{id}")
	public void deletePlane(@PathVariable Long id) {
		planeService.deletePlane(id);
	}

	@RequestMapping(value="/page", method=RequestMethod.GET)
	public ResponseEntity<Page<Plane>> findPage(
			@RequestParam(value="page", defaultValue="0") Integer page,
			@RequestParam(value="linesPerPages", defaultValue="10") Integer linesPerPages,
			@RequestParam(value="orderBy", defaultValue="id") String orderBy,
			@RequestParam(value="direction", defaultValue="ASC") String direction) {
		Page<Plane> planes = planeService.findPage(page, linesPerPages, orderBy, direction);
		return ResponseEntity.ok().body(planes);
	}

}
