package br.com.authgroup.usergroup;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserGroupRepository extends JpaRepository<UserGroup, Long> {
	
	@Query("select ug from UserGroup ug where not exists (select 1 from UserGroup ug2 join ug2.listResource lr where ug.id = ug2.id and lr.id = :id)")
	public List<UserGroup> getNotUserGroupFromResource(@Param("id") Long id);
	
	@Query("select ug from UserGroup ug where not exists (select 1 from UserGroup ug2 join ug2.listMenu lm where ug.id = ug2.id and lm.id = :id)")
	public List<UserGroup> getNotUserGroupFromMenu(@Param("id") Long id);
	
}
