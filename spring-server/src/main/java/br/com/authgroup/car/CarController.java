package br.com.authgroup.car;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cars")
public class CarController {
	
	@Autowired
	private CarService carService;
	
	@GetMapping
	public List<Car> listCars() {
		return carService.listCars();
	}
	
	@PostMapping
	public void createCar(@RequestBody Car car) {
		carService.createCar(car);
	}

	@GetMapping("/{id}")
	public Car getCar(@PathVariable Long id) {
		return carService.getCar(id);
	}
	
	@PutMapping("/{id}")
	public void updateCar(@RequestBody Car car) {
		carService.updateCar(car);
	}
	
	@DeleteMapping("/{id}")
	public void deleteCar(@PathVariable Long id) {
		carService.deleteCar(id);
	}
	
}
