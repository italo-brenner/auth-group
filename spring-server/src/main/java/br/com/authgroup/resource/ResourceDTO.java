package br.com.authgroup.resource;

public class ResourceDTO {
	
	private Long id;

	private String method;
	
	private String name;
	
	public ResourceDTO() {
	}

	public ResourceDTO(Resource resource) {
		this.id = resource.getId();
		this.method = resource.getMethod();
		this.name = resource.getName();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMethod() {
		return method;
	}

	public void setMethod(String method) {
		this.method = method;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
}
