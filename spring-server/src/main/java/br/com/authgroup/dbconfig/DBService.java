package br.com.authgroup.dbconfig;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.authgroup.car.Car;
import br.com.authgroup.car.CarRepository;

@Service
public class DBService {
	
	@Autowired
	private CarRepository carRepository;
	
	public void instantiateTestDatabase() {
		Car car1 = new Car();
		car1.setName("Volvo");
		Car car2 = new Car();
		car2.setName("Gol");
		
		carRepository.saveAll(Arrays.asList(car1, car2));
	}
	

}
