package br.com.authgroup.usergroup;

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
public class UserGroupControllerTest extends AuthGroupApplicationTests {
	
	private UserGroup userGroup;
	
	@Autowired
	private UserGroupRepository userGroupRepository;
	
	@Before
	public void setup() throws Exception {
		userGroupRepository.deleteAllInBatch();
		
		userGroup = new UserGroup();
		userGroup.setName("name");
		
		userGroupRepository.save(userGroup);
	}
	
	@Test
	public void listUserGroup() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/api/usergroup"))
		.andExpect(MockMvcResultMatchers.status().isOk())
		.andExpect(MockMvcResultMatchers.content().contentType(contentTypeJSON))
		.andExpect(MockMvcResultMatchers.jsonPath("$.[0].name", Matchers.is(userGroup.getName())));
	}
	
	@Test
	public void getUserGroup() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/api/usergroup/" + userGroup.getId()))
		.andExpect(MockMvcResultMatchers.status().isOk())
		.andExpect(MockMvcResultMatchers.content().contentType(contentTypeJSON))
		.andExpect(MockMvcResultMatchers.jsonPath("$.name", Matchers.is(userGroup.getName())));
	}
	
}
