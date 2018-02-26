package br.com.authgroup.applicationuser;

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
public class ApplicationUserControllerTest extends AuthGroupApplicationTests {
	
	private ApplicationUser applicationUser;
	
	@Autowired
	private ApplicationUserRepository applicationUserRepository;
	
	@Before
	public void setup() throws Exception {
		applicationUserRepository.deleteAllInBatch();
		
		applicationUser = new ApplicationUser();
		applicationUser.setUsername("username");
		applicationUser.setPassword("password");
		
		applicationUserRepository.save(applicationUser);
	}
	
	@Test
	public void listUser() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/api/applicationuser"))
		.andExpect(MockMvcResultMatchers.status().isOk())
		.andExpect(MockMvcResultMatchers.content().contentType(contentTypeJSON))
		.andExpect(MockMvcResultMatchers.jsonPath("$.[0].username", Matchers.is(applicationUser.getUsername())))
		.andExpect(MockMvcResultMatchers.jsonPath("$.[0].password", Matchers.is(applicationUser.getPassword())));
	}
	
	@Test
	public void signUp() throws Exception {
		ApplicationUser applicationUser = new ApplicationUser();
		applicationUser.setUsername("username");
		applicationUser.setPassword("password");
		
		mockMvc.perform(MockMvcRequestBuilders.post("/api/applicationuser/signup")
                .contentType(contentTypeJSON)
				.content(json(applicationUser)))
				.andExpect(MockMvcResultMatchers.status().isOk());
	}
	
	@Test
	public void getUser() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/api/applicationuser/" + applicationUser.getId()))
		.andExpect(MockMvcResultMatchers.status().isOk())
		.andExpect(MockMvcResultMatchers.content().contentType(contentTypeJSON))
		.andExpect(MockMvcResultMatchers.jsonPath("$.username", Matchers.is(applicationUser.getUsername())))
		.andExpect(MockMvcResultMatchers.jsonPath("$.password", Matchers.is(applicationUser.getPassword())));
	}
	
}
