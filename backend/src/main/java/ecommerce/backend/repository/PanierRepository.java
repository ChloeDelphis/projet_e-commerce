package ecommerce.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ecommerce.backend.model.Panier;

public interface PanierRepository extends JpaRepository<Panier, Integer> {

}
