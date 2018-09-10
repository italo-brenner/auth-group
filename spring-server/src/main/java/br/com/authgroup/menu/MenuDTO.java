package br.com.authgroup.menu;

public class MenuDTO {
	
	private Long id;

	private String title;
	
	private String fontAwesome;
	
	private String link;
	
	public MenuDTO() {
	}

	public MenuDTO(Menu menu) {
		this.id = menu.getId();
		this.title = menu.getTitle();
		this.fontAwesome = menu.getFontAwesome();
		this.link = menu.getLink();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getFontAwesome() {
		return fontAwesome;
	}

	public void setFontAwesome(String fontAwesome) {
		this.fontAwesome = fontAwesome;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}
	
}
