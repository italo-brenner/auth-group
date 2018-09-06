package br.com.authgroup.dbconfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.authgroup.car.Car;
import br.com.authgroup.car.CarRepository;

@Service
public class DBService {
	
	@Autowired
	private CarRepository carRepository;
	
	public void instantiateTestDatabase() {
		for (int i=0; i < 56; ++i) {
			Car car = new Car();
			car.setName("Car" + i);
			
			carRepository.save(car);
		}
	}
	
}
