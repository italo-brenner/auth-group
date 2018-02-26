package br.com.authgroup.car;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.authgroup.car.Car;
import br.com.authgroup.car.CarRepository;

@RestController
@RequestMapping("/api/car")
public class CarController {
	
	private CarRepository carRepository;
	
	public CarController(CarRepository carRepository) {
		this.carRepository = carRepository;
	}
	
	@GetMapping
	public List<Car> getCar() {
		return carRepository.findAll();
	}
	
	@PostMapping
	public void createCar(@RequestBody Car car) {
		carRepository.save(car);
	}

	@GetMapping("/{id}")
	public Optional<Car> getUserGroup(@PathVariable Long id) {
		return carRepository.findById(id);
	}
	
}
