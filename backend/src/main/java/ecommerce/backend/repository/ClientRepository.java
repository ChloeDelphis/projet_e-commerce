package ecommerce.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ecommerce.backend.model.Client;

public interface ClientRepository extends JpaRepository<Client, Integer> {

	public Client findByEmail(String email);
	
}
