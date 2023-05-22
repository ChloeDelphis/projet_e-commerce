package ecommerce.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import ecommerce.backend.model.Commentaires;


public interface CommentairesRepository extends JpaRepository<Commentaires, Integer> {
	public List<Commentaires> findByIdProduit(int articleID);

}
