package br.com.authgroup.menu;

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
import br.com.authgroup.usergroup.UserGroup;
import br.com.authgroup.usergroup.UserGroupRepository;

@RunWith(SpringRunner.class)
@SpringBootTest(classes=AuthGroupApplication.class)
@WebAppConfiguration
public class MenuControllerTest extends AuthGroupApplicationTests {
	
	private UserGroup userGroup1;
	private UserGroup userGroup2;
	private Menu menu1;
	private Menu menu2;
	private Menu menu3;
	
	@Autowired
	private MenuRepository menuRepository;
	
	@Autowired
	private UserGroupRepository userGroupRepository;
	
	private boolean setUpIsDone = false;
	
	@Before
	public void setup() throws Exception {
		if (setUpIsDone) {
			return;
		}
		
		menuRepository.deleteAllInBatch();
		userGroupRepository.deleteAllInBatch();
		
		userGroup1 = new UserGroup();
		
		userGroup1.setName("User Group 1");
		
		userGroupRepository.save(userGroup1);
		
		userGroup2 = new UserGroup();
		
		userGroup2.setName("User Group 2");
		
		userGroupRepository.save(userGroup2);
		
		menu1 = new Menu();
		menu1.setName("Menu 1");
		menu1.setUserGroup(userGroup1);
		
		menuRepository.save(menu1);
		
		menu2 = new Menu();
		menu2.setName("Menu 2");
		menu2.setUserGroup(userGroup1);
		
		menuRepository.save(menu2);
		
		menu3 = new Menu();
		menu3.setName("Menu 3");
		menu3.setUserGroup(userGroup2);
		
		menuRepository.save(menu3);
		
		setUpIsDone = true;
	}
	
	@Test
	public void listMenu() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/api/menu"))
		.andExpect(MockMvcResultMatchers.status().isOk())
		.andExpect(MockMvcResultMatchers.content().contentType(contentTypeJSON))
		.andExpect(MockMvcResultMatchers.jsonPath("$.[0].name", Matchers.is("Menu 1")))
		.andExpect(MockMvcResultMatchers.jsonPath("$.[1].name", Matchers.is("Menu 2")))
		.andExpect(MockMvcResultMatchers.jsonPath("$.[2].name", Matchers.is("Menu 3")));
	}

	@Test
	public void addMenu() throws Exception {
		Menu menu = new Menu();
		menu.setName("name");
		
		UserGroup userGroup = new UserGroup();
		userGroup.setId(1L);
		
		menu.setUserGroup(userGroup);
		
		mockMvc.perform(MockMvcRequestBuilders.post("/api/menu")
                .contentType(contentTypeJSON)
				.content(json(menu)))
				.andExpect(MockMvcResultMatchers.status().isOk());
	}
	
	@Test
	public void getMenu() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/api/menu/" + menu1.getId()))
		.andExpect(MockMvcResultMatchers.status().isOk())
		.andExpect(MockMvcResultMatchers.content().contentType(contentTypeJSON))
		.andExpect(MockMvcResultMatchers.jsonPath("$.name", Matchers.is(menu1.getName())));
	}
	
	@Test
	public void listMenuByUserGroup() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/api/menu/usergroup/" + userGroup1.getId()))
		.andExpect(MockMvcResultMatchers.status().isOk())
		.andExpect(MockMvcResultMatchers.content().contentType(contentTypeJSON))
		.andExpect(MockMvcResultMatchers.jsonPath("$.[0].name", Matchers.is("Menu 1")))
		.andExpect(MockMvcResultMatchers.jsonPath("$.[1].name", Matchers.is("Menu 2")));
	}
	
}
