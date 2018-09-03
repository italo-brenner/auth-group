package br.com.authgroup.car;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.authgroup.validationconfig.exception.ObjectNotFoundException;

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
			throw new ObjectNotFoundException("Objeto n�o encontrado! Id: " + id + ", Tipo: " + Car.class.getName());
		}
	}
	
	public void createCar(Car car) {
		carRepository.save(car);
	}

	public Car getCar(Long id) {
		Optional<Car> car = carRepository.findById(id);
		return car.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto n�o encontrado! Id: " + id + ", Tipo: " + Car.class.getName()));
	}
	
	public void updateCar(Car car) {
		existsCar(car.getId());
		carRepository.save(car);
	}
	
	public void deleteCar(Long id) {
		existsCar(id);
		carRepository.deleteById(id);
	}
	
}
