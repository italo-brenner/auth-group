package br.com.authgroup.book;

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
public class BookControllerTest extends AuthGroupApplicationTests {
	
	private Book book;
	
	@Autowired
	private BookRepository bookRepository;
	
	@Before
	public void setup() throws Exception {
		bookRepository.deleteAllInBatch();
		
		book = new Book();
		book.setName("name");
		
		bookRepository.save(book);
	}
	
	@Test
	public void listBook() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/api/book"))
		.andExpect(MockMvcResultMatchers.status().isOk())
		.andExpect(MockMvcResultMatchers.content().contentType(contentTypeJSON))
		.andExpect(MockMvcResultMatchers.jsonPath("$.[0].name", Matchers.is(book.getName())));
	}

	@Test
	public void addBook() throws Exception {
		Book book = new Book();
		book.setName("name");
		
		mockMvc.perform(MockMvcRequestBuilders.post("/api/book")
                .contentType(contentTypeJSON)
				.content(json(book)))
				.andExpect(MockMvcResultMatchers.status().isOk());
	}
	
	@Test
	public void getBook() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/api/book/" + book.getId()))
		.andExpect(MockMvcResultMatchers.status().isOk())
		.andExpect(MockMvcResultMatchers.content().contentType(contentTypeJSON))
		.andExpect(MockMvcResultMatchers.jsonPath("$.name", Matchers.is(book.getName())));
	}
	
}
