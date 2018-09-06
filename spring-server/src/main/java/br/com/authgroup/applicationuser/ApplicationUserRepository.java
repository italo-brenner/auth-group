package br.com.authgroup.applicationuser;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface ApplicationUserRepository extends JpaRepository<ApplicationUser, Long> {

	@Transactional(readOnly=true)
	Optional<ApplicationUser> findByUsername(String username);
	
}
