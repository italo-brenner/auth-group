package br.com.authgroup.car;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.authgroup.car.Car;
import br.com.authgroup.car.CarRepository;

@RestController
@RequestMapping("/api/cars")
public class CarController {
	
	@Autowired
	private CarRepository carRepository;
	
	@GetMapping
	public List<Car> getCar() {
		return carRepository.findAll();
	}
	
	@PostMapping
	public void createCar(@RequestBody Car car) {
		carRepository.save(car);
	}

	@GetMapping("/{id}")
	public Optional<Car> getCar(@PathVariable Long id) {
		return carRepository.findById(id);
	}
	
	@PutMapping("/{id}")
	public void updateCar(@RequestBody Car car) {
		carRepository.save(car);
	}
	
	@DeleteMapping("/{id}")
	public void deleteCar(@PathVariable Long id) {
		carRepository.deleteById(id);
	}
	
}
