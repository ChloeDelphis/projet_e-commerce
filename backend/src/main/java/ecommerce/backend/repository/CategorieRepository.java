package ecommerce.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ecommerce.backend.model.Categorie;

public interface CategorieRepository extends JpaRepository<Categorie, Integer> {

}
