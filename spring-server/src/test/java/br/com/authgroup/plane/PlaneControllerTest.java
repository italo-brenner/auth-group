package br.com.authgroup.plane;

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
public class PlaneControllerTest extends AuthGroupApplicationTests {
	
	private Plane plane;
	
	@Autowired
	private PlaneRepository planeRepository;
	
	@Before
	public void setup() throws Exception {
		planeRepository.deleteAllInBatch();
		
		plane = new Plane();
		plane.setName("name");
		
		planeRepository.save(plane);
	}
	
	@Test
	public void listPlane() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/api/plane"))
		.andExpect(MockMvcResultMatchers.status().isOk())
		.andExpect(MockMvcResultMatchers.content().contentType(contentTypeJSON))
		.andExpect(MockMvcResultMatchers.jsonPath("$.[0].name", Matchers.is(plane.getName())));
	}

	@Test
	public void addPlane() throws Exception {
		Plane plane = new Plane();
		plane.setName("name");
		
		mockMvc.perform(MockMvcRequestBuilders.post("/api/plane")
                .contentType(contentTypeJSON)
				.content(json(plane)))
				.andExpect(MockMvcResultMatchers.status().isOk());
	}
	
	@Test
	public void getPlane() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/api/plane/" + plane.getId()))
		.andExpect(MockMvcResultMatchers.status().isOk())
		.andExpect(MockMvcResultMatchers.content().contentType(contentTypeJSON))
		.andExpect(MockMvcResultMatchers.jsonPath("$.name", Matchers.is(plane.getName())));
	}
	
}
