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

import ecommerce.backend.model.Commande;
import ecommerce.backend.repository.CommandeRepository;

@RestController
@RequestMapping("/commandes")
public class CommandeController {

    @Autowired
    private CommandeRepository repo;

	@CrossOrigin
    @GetMapping("/test")
    public String geTest() {
        return "Test Commande Return API";
    }
	
	// (GET) FIND COMMANDE BY EMAIL CLIENT
    @CrossOrigin
    @GetMapping("/findbyemail/{emailClient}")
    public List<Commande> findbyemail(@PathVariable(name = "emailClient") String emailClient) {
        return repo.findByEmailClient(emailClient);
    }
	
	// (GET) FIND ALL
	@CrossOrigin
    @GetMapping("")
    public List<Commande> findall() {
        return repo.findAll();
    }
	
	// (GET) FIND BY ID
	@CrossOrigin
    @GetMapping("{id}")
    public Commande findbyid(@PathVariable(name = "id") int id) {
        return repo.findById(id).get();
    }
	
	// (POST) CREATE(
    @CrossOrigin
    @PostMapping("")
    public void create(@RequestBody Commande c) {
        repo.save(c);
    }
    
    // DELETE
    @CrossOrigin
    @DeleteMapping("{id}")
    public void delete(@PathVariable(name = "id") int id) {
        repo.deleteById(id);
    }
    
    // UPDATE => PUT
    @CrossOrigin
    @PutMapping("")
    public void update(@RequestBody Commande c) {
    	c.setVersion(repo.findById(c.getIdCommande()).get().getVersion());
        repo.save(c);
    }
}
