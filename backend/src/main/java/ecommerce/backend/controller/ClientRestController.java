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

import ecommerce.backend.model.Client;
import ecommerce.backend.repository.ClientRepository;

@RestController
@RequestMapping("/client")
public class ClientRestController {

	@Autowired
	private ClientRepository repo;

	@CrossOrigin
	@GetMapping("")
	public List<Client> findall() {
		return repo.findAll();
	}

	@CrossOrigin
	@GetMapping("/findbyemail/{email}")
	public Client findbyemail(@PathVariable(name = "email") String email) {
		return repo.findByEmail(email);
	}
	
	@CrossOrigin
	@GetMapping("/findbyemailandmdp/{email}/{mdp}")
	public Client findbyemailandmdp(@PathVariable(name = "email") String email, @PathVariable(name="mdp") String mdp) {
		return repo.findByEmailAndMdp(email, mdp);
	}

	@CrossOrigin
	@PostMapping("")
	public void create(@RequestBody Client p) {
		repo.save(p);
	}

	@CrossOrigin
	@DeleteMapping("{id}")
	public void delete(@PathVariable(name = "id") int id) {
		repo.deleteById(id);
	}

	@CrossOrigin
	@PutMapping("")
	public void update(@RequestBody Client p) {

		p.setVersion(repo.findByEmail(p.getEmail()).getVersion());
		repo.save(p);
	}

}
