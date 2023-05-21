package ecommerce.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import ecommerce.backend.model.Stock;


public interface StockRepository extends JpaRepository<Stock, Integer> {

	public Stock findByRefArticleAndTaille(int refArticle, String taille);
	public List<Stock> findByQteLessThan(int qte);
}
