package br.com.authgroup.book;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import br.com.authgroup.book.Book;
import br.com.authgroup.book.BookRepository;
import br.com.authgroup.core.exception.ObjectNotFoundException;

@Service
public class BookService {
	
	@Autowired
	private BookRepository bookRepository;
	
	public List<Book> listBooks() {
		return bookRepository.findAll();
	}
	
	private void existsBook(Long id) {
		boolean exists = bookRepository.existsById(id);
		if (! exists ) {
			throw new ObjectNotFoundException("Objeto não encontrado! Id: " + id + ", Tipo: " + Book.class.getName());
		}
	}
	
	public void createBook(Book book) {
		bookRepository.save(book);
	}

	public Book getBook(Long id) {
		Optional<Book> book = bookRepository.findById(id);
		return book.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + ", Tipo: " + Book.class.getName()));
	}
	
	public void updateBook(Book book) {
		existsBook(book.getId());
		bookRepository.save(book);
	}
	
	public void deleteBook(Long id) {
		existsBook(id);
		bookRepository.deleteById(id);
	}

	public Page<Book> findPage(Integer page, Integer linesPerPages, String orderBy, String direction) {
		PageRequest pageRequest = PageRequest.of(page, linesPerPages, Direction.valueOf(direction), orderBy);
		return bookRepository.findAll(pageRequest);
	}
	
}
