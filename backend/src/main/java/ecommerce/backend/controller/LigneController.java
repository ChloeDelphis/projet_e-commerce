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

import ecommerce.backend.model.JsonViews;
import ecommerce.backend.model.Ligne;
import ecommerce.backend.model.Panier;
import ecommerce.backend.repository.LigneRepository;
import ecommerce.backend.repository.PanierRepository;

@RestController
@RequestMapping("/ligne")
@CrossOrigin(origins = "http://localhost:3000")
public class LigneController {
	
	@Autowired LigneRepository repo;
	
	@GetMapping("/test")
	public String getTest(){
		return "test";
	}
	
	@GetMapping("")
	@JsonView(JsonViews.Common.class)
	public List<Ligne> getAll(){
		return repo.findAll();
	}
	
	@GetMapping("/{id}")
//	@JsonView(JsonViews.ArticleWithCategorie.class)
	@JsonView(JsonViews.PanierWithLigneAndClient.class)
	public Ligne getByID(@PathVariable Integer id){
		return repo.findById(id).get();
	}
	
	@PostMapping("")
	public Ligne create(@RequestBody Ligne l){
		return repo.save(l);
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable Integer id){
		repo.deleteById(id);
	}
	
	@PutMapping("/{id}")
	@JsonView(JsonViews.Common.class)
	public Ligne update(@RequestBody Ligne l, @PathVariable Integer id){
		Ligne lEnBase = repo.findById(id).orElseThrow(() -> {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND);
		});
		
		l.setId(id);
		l.setVersion(lEnBase.getVersion());
		return repo.save(l);
	}
	

}
