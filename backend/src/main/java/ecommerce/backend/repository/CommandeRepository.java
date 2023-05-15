package ecommerce.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import ecommerce.backend.model.Commande;


public interface CommandeRepository extends JpaRepository<Commande, Integer> {
	public List<Commande> findByEmailClient(String x);

}
