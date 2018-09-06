package br.com.authgroup.core.database;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.authgroup.applicationuser.ApplicationUser;
import br.com.authgroup.applicationuser.ApplicationUserRepository;
import br.com.authgroup.book.Book;
import br.com.authgroup.book.BookRepository;
import br.com.authgroup.car.Car;
import br.com.authgroup.car.CarRepository;
import br.com.authgroup.plane.Plane;
import br.com.authgroup.plane.PlaneRepository;

@Service
public class DBService {
	
	@Autowired
	private CarRepository carRepository;
	
	@Autowired
	private BookRepository bookRepository;
	
	@Autowired
	private PlaneRepository planeRepository;
	
	@Autowired
	private ApplicationUserRepository applicationUserRepository;
	
	public void instantiateTestDatabase() {
		for (int i=0; i < 56; ++i) {
			Car car = new Car();
			car.setName("Car" + i);
			
			carRepository.save(car);
		}
		
		for (int i=0; i < 56; ++i) {
			Book book= new Book();
			book.setName("Book" + i);
			
			bookRepository.save(book);
		}

		for (int i=0; i < 56; ++i) {
			Plane plane = new Plane();
			plane.setName("Plane" + i);
			
			planeRepository.save(plane);
		}
		
		ApplicationUser root = new ApplicationUser();
		root.setUsername("root");
		root.setPassword("123");
		applicationUserRepository.save(root);
		
	}
	
}
