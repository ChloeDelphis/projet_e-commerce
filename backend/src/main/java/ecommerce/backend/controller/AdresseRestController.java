package ecommerce.backend.controller;

import java.util.List;

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

import ecommerce.backend.model.Adresse;
import ecommerce.backend.model.JsonViews;
import ecommerce.backend.repository.AdresseRepository;

@RestController
@RequestMapping("/adresse")
public class AdresseRestController {

	@Autowired
	private AdresseRepository repo;

	@CrossOrigin
	@GetMapping("")
	@JsonView(JsonViews.Common.class)
	public List<Adresse> findall() {
		return repo.findAll();
	}

	@CrossOrigin
	@GetMapping("{id}")
	@JsonView(JsonViews.AdresseWithClient.class)
	public Adresse findbyid(@PathVariable(name = "id") int id) {
		return repo.findById(id).get();
	}

	@CrossOrigin
	@PostMapping("")
	public void create(@RequestBody Adresse p) {
		repo.save(p);
	}

	@CrossOrigin
	@DeleteMapping("{id}")
	public void delete(@PathVariable(name = "id") int id) {
		repo.deleteById(id);
	}

	@CrossOrigin
	@PutMapping("")
	@JsonView(JsonViews.Common.class)
	public void update(@RequestBody Adresse p) {

		p.setVersion(repo.findById(p.getId()).get().getVersion());
		repo.save(p);
	}

	// @CrossOrigin
	// @GetMapping("")
	// public int findlast() {
	// return repo.findLast().getId();
	// }

	@CrossOrigin
	@PostMapping("/findbynumeroandrueandcpandville")
	public Adresse findbynumeroandrueandcpandville(@RequestBody Adresse p) {
		return repo.findByNumeroAndRueAndCpAndVille(p.getNumero(), p.getRue(), p.getCp(), p.getVille());
	}

}
