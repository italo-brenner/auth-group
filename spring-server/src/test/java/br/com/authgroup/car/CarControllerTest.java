package br.com.authgroup.car;

import org.hamcrest.Matchers;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import br.com.authgroup.AuthGroupApplication;
import br.com.authgroup.AuthGroupApplicationTests;

@RunWith(SpringRunner.class)
@SpringBootTest(classes=AuthGroupApplication.class)
@WebAppConfiguration
public class CarControllerTest extends AuthGroupApplicationTests {
	
	private Car car;
	
	@Autowired
	private CarRepository carRepository;
	
	@Before
	public void setup() throws Exception {
		carRepository.deleteAllInBatch();
		
		car = new Car();
		car.setName("name");
		
		carRepository.save(car);
	}
	
	@Test
	public void listCar() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/api/car"))
		.andExpect(MockMvcResultMatchers.status().isOk())
		.andExpect(MockMvcResultMatchers.content().contentType(contentTypeJSON))
		.andExpect(MockMvcResultMatchers.jsonPath("$.[0].name", Matchers.is(car.getName())));
	}

	@Test
	public void addCar() throws Exception {
		Car car = new Car();
		car.setName("name");
		
		mockMvc.perform(MockMvcRequestBuilders.post("/api/car")
                .contentType(contentTypeJSON)
				.content(json(car)))
				.andExpect(MockMvcResultMatchers.status().isOk());
	}
	
	@Test
	public void getCar() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/api/car/" + car.getId()))
		.andExpect(MockMvcResultMatchers.status().isOk())
		.andExpect(MockMvcResultMatchers.content().contentType(contentTypeJSON))
		.andExpect(MockMvcResultMatchers.jsonPath("$.name", Matchers.is(car.getName())));
	}
	
}
