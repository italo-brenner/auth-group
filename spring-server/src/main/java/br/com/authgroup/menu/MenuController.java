package br.com.authgroup.menu;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.authgroup.usergroup.UserGroup;
import br.com.authgroup.usergroup.UserGroupDTO;
import br.com.authgroup.usergroup.UserGroupService;

@RestController
@RequestMapping("/api/menus")
public class MenuController {

	@Autowired
	private MenuService menuService;
	
	@Autowired
	private UserGroupService userGroupService;

	@GetMapping
	public List<Menu> listMenus() {
		return menuService.listMenus();
	}

	@PostMapping
	public void createMenu(@RequestBody Menu menu) {
		menuService.createMenu(menu);
	}

	@GetMapping("/{id}")
	public MenuDTO getMenu(@PathVariable Long id) {
		Menu menu = menuService.getMenu(id);
		MenuDTO menuDTO = new MenuDTO(menu);
		return menuDTO;
	}

	@PutMapping("/{id}")
	public void updateMenu(@RequestBody Menu menu) {
		menuService.updateMenu(menu);
	}

	@DeleteMapping("/{id}")
	public void deleteMenu(@PathVariable Long id) {
		menuService.deleteMenu(id);
	}

	@RequestMapping(value="/page", method=RequestMethod.GET)
	public ResponseEntity<Page<MenuDTO>> findPage(
			@RequestParam(value="page", defaultValue="0") Integer page,
			@RequestParam(value="linesPerPages", defaultValue="10") Integer linesPerPages,
			@RequestParam(value="orderBy", defaultValue="id") String orderBy,
			@RequestParam(value="direction", defaultValue="ASC") String direction) {
		Page<Menu> menus = menuService.findPage(page, linesPerPages, orderBy, direction);
		Page<MenuDTO> menusDTO = menus.map(menu -> new MenuDTO(menu));
		return ResponseEntity.ok().body(menusDTO);
	}
	
	@GetMapping("/{id}/usergroup")
	public List<UserGroupDTO> getUserGroupFromMenu(@PathVariable Long id) {
		Menu menu = menuService.getMenu(id);
		List<UserGroupDTO> listUserGroupDTO = menu.getListUserGroup().stream().map(userGroup -> new UserGroupDTO(userGroup)).collect(Collectors.toList());
		return listUserGroupDTO;
	}
	
	@GetMapping("/{id}/notusergroup")
	public List<UserGroupDTO> getNotUserGroupFromMenu(@PathVariable Long id) {
		List<UserGroup> listUserGroup = userGroupService.getNotUserGroupFromMenu(id);
		List<UserGroupDTO> listUserGroupDTO = listUserGroup.stream().map(userGroup -> new UserGroupDTO(userGroup)).collect(Collectors.toList());
		return listUserGroupDTO;
	}

}
