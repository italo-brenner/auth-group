package br.com.authgroup.book;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/books")
public class BookController {
	
	private BookRepository bookRepository;
	
	public BookController(BookRepository bookRepository) {
		this.bookRepository = bookRepository;
	}
	
	@GetMapping
	public List<Book> getBook() {
		return bookRepository.findAll();
	}
	
	@PostMapping
	public void createBook(@RequestBody Book book) {
		bookRepository.save(book);
	}
	
	@GetMapping("/{id}")
	public Optional<Book> getUserGroup(@PathVariable Long id) {
		return bookRepository.findById(id);
	}
	
}
