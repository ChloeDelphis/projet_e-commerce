package ecommerce.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ecommerce.backend.model.Stock;


public interface StockRepository extends JpaRepository<Stock, Integer> {

	public Stock findByRefArticleAndTaille(int refArticle, String taille);
}
