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
import br.com.authgroup.resource.Resource;
import br.com.authgroup.resource.ResourceRepository;
import br.com.authgroup.usergroup.UserGroup;
import br.com.authgroup.usergroup.UserGroupRepository;

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
	
	@Autowired
	private UserGroupRepository userGroupRepository;
	
	@Autowired
	private ResourceRepository resourceRepository;
	
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

		UserGroup userGroup = new UserGroup();
		userGroup.setName("ROLE_PLANE");
		userGroupRepository.save(userGroup);
		
		userGroup = new UserGroup();
		userGroup.setName("ROLE_BOOK");
		userGroupRepository.save(userGroup);
		
		userGroup = new UserGroup();
		userGroup.setName("ROLE_ROOT");
		userGroupRepository.save(userGroup);
		
		Resource resource = new Resource();
		resource.setMethod("GET");
		resource.setName("/api/books/page");
		resource.getListUserGroup().add(userGroup);
		resourceRepository.save(resource);
		
		ApplicationUser root = new ApplicationUser();
		root.setUsername("root");
		root.setPassword("123");
		root.setUserGroup(userGroup);
		applicationUserRepository.save(root);
	}
	
}
