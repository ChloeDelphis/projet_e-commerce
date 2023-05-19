package ecommerce.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ecommerce.backend.model.Ligne;

public interface LigneRepository extends JpaRepository<Ligne, Integer>{

}
