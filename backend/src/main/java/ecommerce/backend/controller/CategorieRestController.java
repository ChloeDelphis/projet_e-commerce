package ecommerce.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import ecommerce.backend.model.Categorie;
import ecommerce.backend.model.JsonViews;
import ecommerce.backend.repository.CategorieRepository;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "*")
public class CategorieRestController {

	@Autowired
	CategorieRepository repo;

	// (GET) FIND ALL
	@CrossOrigin
	@GetMapping("")
	@JsonView(JsonViews.Common.class)
	public List<Categorie> findall() {
		return repo.findAll();
	}

	// (GET) FIND BY ID
	@GetMapping("/{id}")
	@JsonView(JsonViews.CategorieWithArticle.class)
	public Optional<Categorie> getByID(@PathVariable int id) {
		return repo.findById(id);
	}

	
	// (GET) FIND FIRST BY MEA
	@GetMapping("/mea/{x}")
	@JsonView(JsonViews.CategorieWithArticle.class)
	public Categorie findFirstByMea (@PathVariable int x){
		return repo.findFirstByMea(x);
	}
	
	// (POST) CREATE
	@CrossOrigin
	@PostMapping("")
	@JsonView(JsonViews.Common.class)
	public void create(@RequestBody Categorie a) {
		repo.save(a);
	}

	// (DELETE) BY ID
	@CrossOrigin
	@DeleteMapping("{id}")
	public void delete(@PathVariable(name = "id") int id) {
		repo.deleteById(id);
	}

	// (PUT) UPDATE
	@CrossOrigin
	@PutMapping("")
	public void update(@RequestBody Categorie a) {
		a.setVersion(repo.findById(a.getId()).get().getVersion());
		repo.save(a);
	}

}
