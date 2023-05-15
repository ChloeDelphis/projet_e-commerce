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

import ecommerce.backend.repository.PanierRepository;
import ecommerce.backend.model.Panier;

@RestController
@RequestMapping("/panier")
@CrossOrigin(origins = "http://localhost:3000")
public class PanierController {
	
	@Autowired PanierRepository repo;
	
	@GetMapping("/test")
	public String getTest(){
		return "test";
	}
	
	@GetMapping("")
	public List<Panier> getAll(){
		return repo.findAll();
	}
	
	@GetMapping("/{id}")
	public Panier getByID(@PathVariable Integer id){
		return repo.findById(id).get();
	}
	
	@PostMapping("")
	public Panier create(@RequestBody Panier p){
		return repo.save(p);
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable Integer id){
		repo.deleteById(id);
	}
	
	@PutMapping("/{id}")
	public Panier update(@RequestBody Panier p, @PathVariable Integer id){
		Panier pEnBase = repo.findById(id).orElseThrow(() -> {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND);
		});
		
		p.setId(id);
		p.setVersion(pEnBase.getVersion());
		return repo.save(p);
	}
	

}
