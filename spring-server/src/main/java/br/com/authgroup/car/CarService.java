package br.com.authgroup.car;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import br.com.authgroup.core.exception.ObjectNotFoundException;

@Service
public class CarService {

	@Autowired
	private CarRepository carRepository;
	
	public List<Car> listCars() {
		return carRepository.findAll();
	}
	
	private void existsCar(Long id) {
		boolean exists = carRepository.existsById(id);
		if (! exists ) {
			throw new ObjectNotFoundException("Objeto não encontrado! Id: " + id + ", Tipo: " + Car.class.getName());
		}
	}
	
	public void createCar(Car car) {
		carRepository.save(car);
	}

	public Car getCar(Long id) {
		Optional<Car> car = carRepository.findById(id);
		return car.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + ", Tipo: " + Car.class.getName()));
	}
	
	public void updateCar(Car car) {
		existsCar(car.getId());
		carRepository.save(car);
	}
	
	public void deleteCar(Long id) {
		existsCar(id);
		carRepository.deleteById(id);
	}

	public Page<Car> findPage(Integer page, Integer linesPerPages, String orderBy, String direction) {
		PageRequest pageRequest = PageRequest.of(page, linesPerPages, Direction.valueOf(direction), orderBy);
		return carRepository.findAll(pageRequest);
	}
	
}
