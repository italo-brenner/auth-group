package br.com.authgroup.resource;

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
public class ResouceControllerTest extends AuthGroupApplicationTests {
	
	private Resource resource;
	
	@Autowired
	private ResourceRepository resourceRepository;
	
	@Before
	public void setup() throws Exception {
		resourceRepository.deleteAllInBatch();
		
		resource = new Resource();
		resource.setName("name");
		
		resourceRepository.save(resource);
	}
	
	@Test
	public void listResource() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/api/resource"))
		.andExpect(MockMvcResultMatchers.status().isOk())
		.andExpect(MockMvcResultMatchers.content().contentType(contentTypeJSON))
		.andExpect(MockMvcResultMatchers.jsonPath("$.[0].name", Matchers.is(resource.getName())));
	}

	@Test
	public void addResource() throws Exception {
		Resource resource = new Resource();
		resource.setName("name");
		
		mockMvc.perform(MockMvcRequestBuilders.post("/api/resource")
                .contentType(contentTypeJSON)
				.content(json(resource)))
				.andExpect(MockMvcResultMatchers.status().isOk());
	}
	
	@Test
	public void getResource() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/api/resource/" + resource.getId()))
		.andExpect(MockMvcResultMatchers.status().isOk())
		.andExpect(MockMvcResultMatchers.content().contentType(contentTypeJSON))
		.andExpect(MockMvcResultMatchers.jsonPath("$.name", Matchers.is(resource.getName())));
	}
	
}
