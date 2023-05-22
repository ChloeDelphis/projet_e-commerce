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

import ecommerce.backend.model.Commentaires;
import ecommerce.backend.repository.CommentairesRepository;

@RestController
@RequestMapping("/commentaires")
@CrossOrigin(origins = "*")
public class CommentairesRestController {
	
	@Autowired
	CommentairesRepository repo;
	
	// (GET) FIND ALL
	@GetMapping("")
	public List<Commentaires> findall() {
		return repo.findAll();
	}
	
	// (POST) CREATE
	@CrossOrigin
	@PostMapping("")
	public void create(@RequestBody Commentaires c) {
		repo.save(c);
	}
	
	// (GET) FIND BY ID
	@GetMapping("/{id}")
	public Commentaires getByID(@PathVariable Integer id) {
		return repo.findById(id).orElseThrow(() -> {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND);
		});
	}
	
	// (DELETE) BY ID
	@DeleteMapping("{id}")
	public void delete(@PathVariable(name = "id") int id) {
		repo.deleteById(id);
	}
	
	// (PUT) UPDATE
	@PutMapping("")
	public void update(@RequestBody Commentaires c) {
		c.setVersion(repo.findById(c.getId()).get().getVersion());
		repo.save(c);
	}

}
