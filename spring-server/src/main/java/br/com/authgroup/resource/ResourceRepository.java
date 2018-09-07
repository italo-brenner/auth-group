package br.com.authgroup.resource;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {

	@Query("select r from Resource r join fetch r.listUserGroup")
	public List<Resource> listEagerUserGroup();
	
}
