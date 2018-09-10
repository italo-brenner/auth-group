package br.com.authgroup.menu;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import br.com.authgroup.core.exception.ObjectNotFoundException;
import br.com.authgroup.menu.Menu;
import br.com.authgroup.menu.MenuRepository;
import br.com.authgroup.usergroup.UserGroup;

@Service
public class MenuService {

	@Autowired
	private MenuRepository menuRepository;
	
	public List<Menu> listMenus() {
		return menuRepository.findAll();
	}
	
	private void existsMenu(Long id) {
		boolean exists = menuRepository.existsById(id);
		if (! exists ) {
			throw new ObjectNotFoundException("Objeto não encontrado! Id: " + id + ", Tipo: " + Menu.class.getName());
		}
	}
	
	public void createMenu(Menu menu) {
		menuRepository.save(menu);
	}

	public Menu getMenu(Long id) {
		Optional<Menu> menu = menuRepository.findById(id);
		return menu.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + ", Tipo: " + Menu.class.getName()));
	}
	
	public void updateMenu(Menu menu) {
		existsMenu(menu.getId());
		menuRepository.save(menu);
	}
	
	public void deleteMenu(Long id) {
		Menu mMenu = getMenu(id);
		for (UserGroup userGroup : mMenu.getListUserGroup()) {
			userGroup.getListMenu().remove(mMenu);
		}
		menuRepository.delete(mMenu);
	}

	public Page<Menu> findPage(Integer page, Integer linesPerPages, String orderBy, String direction) {
		PageRequest pageRequest = PageRequest.of(page, linesPerPages, Direction.valueOf(direction), orderBy);
		return menuRepository.findAll(pageRequest);
	}
	
}
