package br.com.authgroup.plane;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import br.com.authgroup.plane.Plane;
import br.com.authgroup.plane.PlaneRepository;
import br.com.authgroup.core.exception.ObjectNotFoundException;

@Service
public class PlaneService {

	@Autowired
	private PlaneRepository planeRepository;
	
	public List<Plane> listPlanes() {
		return planeRepository.findAll();
	}
	
	private void existsPlane(Long id) {
		boolean exists = planeRepository.existsById(id);
		if (! exists ) {
			throw new ObjectNotFoundException("Objeto não encontrado! Id: " + id + ", Tipo: " + Plane.class.getName());
		}
	}
	
	public void createPlane(Plane plane) {
		planeRepository.save(plane);
	}

	public Plane getPlane(Long id) {
		Optional<Plane> plane = planeRepository.findById(id);
		return plane.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + ", Tipo: " + Plane.class.getName()));
	}
	
	public void updatePlane(Plane plane) {
		existsPlane(plane.getId());
		planeRepository.save(plane);
	}
	
	public void deletePlane(Long id) {
		existsPlane(id);
		planeRepository.deleteById(id);
	}

	public Page<Plane> findPage(Integer page, Integer linesPerPages, String orderBy, String direction) {
		PageRequest pageRequest = PageRequest.of(page, linesPerPages, Direction.valueOf(direction), orderBy);
		return planeRepository.findAll(pageRequest);
	}
	
	
}
