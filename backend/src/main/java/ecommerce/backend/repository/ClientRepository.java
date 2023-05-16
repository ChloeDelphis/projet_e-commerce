package ecommerce.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ecommerce.backend.model.Client;

public interface ClientRepository extends JpaRepository<Client, String> {

	public Client findByEmail(String email);
	public Client findByEmailAndMdp(String email, String mdp);
	
}
