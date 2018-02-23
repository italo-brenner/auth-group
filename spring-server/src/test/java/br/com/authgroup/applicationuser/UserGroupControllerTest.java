package br.com.authgroup.applicationuser;

import java.nio.charset.Charset;

import org.hamcrest.Matchers;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import br.com.authgroup.AuthGroupApplicationTests;
import br.com.authgroup.converter.Converter;
import br.com.authgroup.usergroup.UserGroup;
import br.com.authgroup.usergroup.UserGroupRepository;

@RunWith(SpringRunner.class)
@SpringBootTest(classes=AuthGroupApplicationTests.class)
@WebAppConfiguration
public class UserGroupControllerTest {
	
	private MediaType contentType = new MediaType("application", "json", Charset.forName("UTF-8"));
	
	private MockMvc mockMvc;
	
	private UserGroup userGroup;
	
	@Autowired
	private Converter converter;
	
	@Autowired
	private WebApplicationContext webApplicationContext;
	
	@Autowired
	private UserGroupRepository userGroupRepository;
	
	@Before
	public void setup() throws Exception {
		this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
		
		userGroupRepository.deleteAllInBatch();
		
		userGroup = new UserGroup();
		userGroup.setName("usergroup");
		
		userGroupRepository.save(userGroup);
	}
	
	@Test
	public void listUserGroup() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/api/usergroup"))
		.andExpect(MockMvcResultMatchers.status().isOk())
		.andExpect(MockMvcResultMatchers.content().contentType(contentType))
		.andExpect(MockMvcResultMatchers.jsonPath("$.[0].name", Matchers.is(userGroup.getName())));
	}
	
	@Test
	public void createUserGroup() throws Exception {
		UserGroup userGroup = new UserGroup();
	}
	
}
