package ecommerce.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ecommerce.backend.model.Article;

public interface ArticleRepository extends JpaRepository<Article, Integer> {

}
