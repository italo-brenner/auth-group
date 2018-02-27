package br.com.authgroup.menu;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/menu")
public class MenuController {
	
	private MenuRepository menuRepository;
	
	public MenuController(MenuRepository menuRepository) {
		this.menuRepository = menuRepository;
	}
	
	@GetMapping
	public List<Menu> getMenu() {
		return menuRepository.findAll();
	}
	
	@PostMapping
	public void createMenu(@RequestBody Menu menu) {
		menuRepository.save(menu);
	}

	@GetMapping("/{id}")
	public Optional<Menu> getMenu(@PathVariable Long id) {
		return menuRepository.findById(id);
	}
	
	@GetMapping("/usergroup/{id}")
	public List<Menu> getMenuByUserGroup(@PathVariable Long id) {
		return menuRepository.findAll().stream()
				.filter(o -> o.getUserGroup().getId().equals(id))
				.collect(Collectors.toList());
	}
	
}
