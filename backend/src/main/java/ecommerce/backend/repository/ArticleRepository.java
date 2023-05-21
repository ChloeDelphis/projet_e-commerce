package ecommerce.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import ecommerce.backend.model.Article;

public interface ArticleRepository extends JpaRepository<Article, Integer> {
	
	@Query("SELECT MAX(a.ref) FROM Article a")
    String findMaxRef();

}
