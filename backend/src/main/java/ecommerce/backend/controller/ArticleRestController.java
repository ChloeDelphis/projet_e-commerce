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
import ecommerce.backend.repository.ArticleRepository;

@RestController
@RequestMapping("/articles")
@CrossOrigin(origins = "*")
public class ArticleRestController {

	@Autowired
	ArticleRepository repo;

	// (GET) FIND ALL
	@CrossOrigin
	@GetMapping("")
	@JsonView(JsonViews.ArticleWithCategorie.class)
	public List<Article> findall() {
		return repo.findAll();
	}

	// (GET) FIND BY REF
	@GetMapping("/{ref}")
//	@JsonView(JsonViews.ArticleWithCategorie.class)
	@JsonView(JsonViews.PanierWithLigneAndClient.class)
	public Article getByID(@PathVariable Integer ref) {
		return repo.findById(ref).orElseThrow(() -> {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND);
		});
	}

	// (POST) CREATE
	@CrossOrigin
	@PostMapping("")
	public void create(@RequestBody Article a) {
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
	@JsonView(JsonViews.Common.class)
	public void update(@RequestBody Article a) {
		a.setVersion(repo.findById(a.getRef()).get().getVersion());
		repo.save(a);
	}

}
