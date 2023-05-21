package ecommerce.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.annotation.JsonView;

import ecommerce.backend.model.Article;
import ecommerce.backend.model.JsonViews;
import ecommerce.backend.model.Stock;
import ecommerce.backend.repository.StockRepository;

@RestController
@RequestMapping("/stock")
@CrossOrigin(origins = "*")
public class StockController {
	
	@Autowired
	StockRepository repo;
	
	// (GET) FIND ALL
	@GetMapping("")
	public List<Stock> findall() {
		return repo.findAll();
	}
	
	//(GET) FIND BY REF AND TAILLE
	@GetMapping("/findbyrefandtaille/{ref}/{taille}")
	public Stock getByRefAndTaille(@PathVariable(name = "ref") int ref,
			@PathVariable(name = "taille") String taille) {
		return repo.findByRefArticleAndTaille(ref, taille);
	}
	
	// (GET) FIND BY ID
	@GetMapping("/{id}")
	public Stock getByID(@PathVariable Integer id) {
		return repo.findById(id).orElseThrow(() -> {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND);
		});
	}
	
	// (POST) CREATE
	@CrossOrigin
	@PostMapping("")
	public void create(@RequestBody Stock s) {
		repo.save(s);
	}

	// (DELETE) BY ID
	@DeleteMapping("{id}")
	public void delete(@PathVariable(name = "id") int id) {
		repo.deleteById(id);
	}

	// (PUT) UPDATE
	@PutMapping("")
	public void update(@RequestBody Stock s) {
		s.setVersion(repo.findById(s.getId()).get().getVersion());
		repo.save(s);
	}

}
