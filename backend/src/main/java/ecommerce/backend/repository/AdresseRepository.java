package ecommerce.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ecommerce.backend.model.Adresse;

public interface AdresseRepository extends JpaRepository<Adresse, Integer> {

	public Adresse findByNumeroAndRueAndCpAndVille(int i, String r, String c, String v);
	// public Adresse findLast();
}
