package ecommerce.backend.controller;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.persistence.Id;
import javax.persistence.Version;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.annotation.JsonView;

import ecommerce.backend.model.Admin;
import ecommerce.backend.model.Adresse;
import ecommerce.backend.model.Article;
import ecommerce.backend.model.Categorie;
import ecommerce.backend.model.Client;
import ecommerce.backend.model.ClientDTO;
import ecommerce.backend.model.Commande;
import ecommerce.backend.model.JsonViews;
import ecommerce.backend.model.Panier;
import ecommerce.backend.repository.AdminRepository;
import ecommerce.backend.repository.ArticleRepository;
import ecommerce.backend.repository.CategorieRepository;
import ecommerce.backend.repository.ClientRepository;
import ecommerce.backend.repository.CommandeRepository;

@Controller
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	private AdminRepository adminRepo;
	
	@Autowired
	private ArticleRepository articleRepo;

	@Autowired
	private CategorieRepository categorieRepo;
	
	@Autowired
	private ClientRepository clientRepo;
	
	@Autowired
	private CommandeRepository commandeRepo;
	
    @RequestMapping("/test")
    public String getTest() {
        return "/test2";
    }
    
    @RequestMapping("/action")
    public String votreMethodePost() {
        // Votre logique de traitement
    	return "/test2"; // Redirection vers une page de résultat
    }
    
  //ACCES PAGES 

    @RequestMapping("/login")
    public ModelAndView login(HttpSession session) {
    	ModelAndView modelAndView;
    	Admin adminSession = (Admin) session.getAttribute("admin");
    	if( adminSession != null){
    		modelAndView = new ModelAndView("/nav");
    	}
    	else{
    		modelAndView = new ModelAndView("/login");
    	}
        return modelAndView;
    }

    
  //LOGIN Admin ----------------------------------------------------------------------
     
    @PostMapping("/login")
    public ModelAndView processLogin(HttpSession session,@ModelAttribute("admin") Admin admin) {
    	
        if (isValidCredentials(admin.getEmail(), admin.getPassword())) {
        	    session.setAttribute("admin", admin);
            return new ModelAndView("/nav");
        } else {
            ModelAndView modelAndView = new ModelAndView("/login","error", "Mauvais Mot de passe");
            return modelAndView;
        }
    }
    
    private boolean isValidCredentials(String email, String password) {
        Admin admin = adminRepo.findById(email).orElse(null);
        
        if (admin != null && admin.getPassword().equals(password)) {
            return true;
        }
        
        return false;
    }
    
    @RequestMapping("/logoff")
    public ModelAndView logOff(HttpSession session) {
    	session.setAttribute("admin", null);
    	ModelAndView modelAndView = new ModelAndView("/login");
    	return modelAndView;
    }

    //CRUD Admin ----------------------------------------------------------------------
    
    @RequestMapping("/findalladmin")
    public ModelAndView findallAdmin(HttpSession session) {
    	ModelAndView modelAndView = new ModelAndView("/login");
    	if(session.getAttribute("admin") != null){
	        modelAndView = new ModelAndView("/findall", "liste", adminRepo.findAll());
	        modelAndView.addObject("type", "Admin");
	        modelAndView.addObject("createMethod", "createadmin");
	        modelAndView.addObject("removeMethod", "removeadmin");
	        modelAndView.addObject("updateMethod", "updateadmin");
		}
	    return modelAndView;	
    }
    
    @PostMapping("/findadminbyid")
    public ModelAndView findAdminById(@RequestParam(name = "email") String email) {
        ModelAndView modelAndView = new ModelAndView("/findbyid", "item", adminRepo.findById(email).get());

        return modelAndView;
    }
    
    @PostMapping("/createadmin")
    public String createAdmin(@ModelAttribute(name = "admin") Admin admin) {
        adminRepo.save(admin);
        
        return "redirect:/admin/findalladmin";
    }
    
    @PostMapping("removeadmin")
    public String removeAdmin(@ModelAttribute(name = "email") String email, Model model) {        
        adminRepo.deleteById(email);
        
        return "redirect:/admin/findalladmin";
    }
    
    @PostMapping("updateadmin")
    public String updateadmin(@ModelAttribute(name = "admin") Admin admin, Model model) {
    	Admin a = adminRepo.findById(admin.getEmail()).get();
    	admin.setVersion(a.getVersion());
    	System.out.println(admin.getVersion());
    	adminRepo.save(admin);
        
        return "redirect:/admin/findalladmin";
    }
    
  //CRUD Articles ----------------------------------------------------------------------
    @RequestMapping("/findallarticles")
    public ModelAndView findallArticles(HttpSession session) {
    	
    	ModelAndView modelAndView = new ModelAndView("/login");
    	if(session.getAttribute("admin") != null){
            modelAndView = new ModelAndView("/findall", "liste", articleRepo.findAll());
            modelAndView.addObject("type", "Article");
            modelAndView.addObject("createMethod", "createarticle");
            modelAndView.addObject("removeMethod", "removearticle");
            modelAndView.addObject("updateMethod", "updatearticle");
		}
	    return modelAndView;	
    }

    @PostMapping("/findarticlebyid")
    public ModelAndView findAdminById(@RequestParam(name = "ref") int ref) {
        ModelAndView modelAndView = new ModelAndView("/findbyid", "item", articleRepo.findById(ref).get());

        return modelAndView;
    }
    
    @PostMapping("/createarticle")
    public String createArticle(@ModelAttribute(name = "article") Article article) {
        articleRepo.save(article);
        
        return "redirect:/admin/findallarticles";
    }
    
    @PostMapping("removearticle")
    public String update(@ModelAttribute(name = "ref") int ref, Model model) {        
        articleRepo.deleteById(ref);
        
        return "redirect:/admin/findallarticles";
    }
    
    @PostMapping("updatearticle")
    public String updateArticle(@ModelAttribute(name = "article") Article article, Model model) {
    	Article a = articleRepo.findById(article.getRef()).get();
    	article.setVersion(a.getVersion());
    	articleRepo.save(article);
        
        return "redirect:/admin/findallarticles";
    }
    
  //CRUD Categories ----------------------------------------------------------------------
    @RequestMapping("/findallcategories")
    public ModelAndView findallCategories(HttpSession session) {
    	ModelAndView modelAndView = new ModelAndView("/login");
    	if(session.getAttribute("admin") != null){
    		modelAndView = new ModelAndView("/findall", "liste", categorieRepo.findAll());
            modelAndView.addObject("type", "Categorie");
            modelAndView.addObject("createMethod", "createcategorie");
            modelAndView.addObject("removeMethod", "removecategorie");
            modelAndView.addObject("updateMethod", "updatecategorie");
		}
	    return modelAndView;	
    }
    
    @PostMapping("/createcategorie")
    public String createCategorie(@ModelAttribute(name = "article") Categorie categorie) {

    	System.out.println(categorie);
        categorieRepo.save(categorie);
        
        return "redirect:/admin/findallcategories";
    }
    
    @PostMapping("removecategorie")
    public String removeCategorie(@ModelAttribute(name = "id") int id, Model model) {        
        categorieRepo.deleteById(id);
        
        return "redirect:/admin/findallcategories";
    }
    
    @PostMapping("updatecategorie")
    public String updateCategorie(@ModelAttribute(name = "categorie") Categorie categorie, Model model) {
    	Categorie c = categorieRepo.findById(categorie.getId()).get();
    	categorie.setVersion(c.getVersion());
    	categorieRepo.save(categorie);
        
        return "redirect:/admin/findallcategories";
    }

    
    //CRUD Clients ----------------------------------------------------------------------

    
    @RequestMapping("/findallclients")
    public ModelAndView findallClients(HttpSession session) {
    	
    	ModelAndView modelAndView = new ModelAndView("/login");
    	if(session.getAttribute("admin") != null){
    		
            List<Client> clients = clientRepo.findAll();
            List<ClientDTO> clientDTOs = new ArrayList<>();
            for (Client client : clients) {

                ClientDTO clientDTO = new ClientDTO();
                clientDTO.setEmail(client.getEmail());
                clientDTO.setMdp(client.getMdp());
                clientDTO.setPrenom(client.getPrenom());
                clientDTO.setNom(client.getNom());
                clientDTO.setTel(client.getTel());
                clientDTO.setAdresse(client.getAdresse());
//                clientDTO.setPanier(client.getPanier().getId());            
                clientDTOs.add(clientDTO);

            }


            modelAndView = new ModelAndView("/findall", "liste", clientDTOs);
    	
            modelAndView.addObject("type", "Client");
            modelAndView.addObject("createMethod", "createclient");
            modelAndView.addObject("removeMethod", "removecclient");
            modelAndView.addObject("updateMethod", "updateclient");
		}
        return modelAndView;
    }
    
    @PostMapping("/createclient")
    public String createClient(@ModelAttribute(name = "client") Client client) {

        clientRepo.save(client);
        
        return "redirect:/admin/findallclients";
    }
    
    @PostMapping("removecclient")
    public String removecClient(@ModelAttribute(name = "email") String email, Model model) {        
        clientRepo.deleteById(email);
        
        return "redirect:/admin/findallclients";
    }
    
    @PostMapping("updateclient")
    public String updateClient(@ModelAttribute(name = "client") Client client, Model model) {
    	Client c = clientRepo.findById(client.getEmail()).get();

    	
    	
    	client.setVersion(c.getVersion());
    	clientRepo.save(client);
        
        return "redirect:/admin/findallclients";
    }
    
    
    

    //CRUD Commandes ----------------------------------------------------------------------
    @RequestMapping("/findallcommandes")
    public ModelAndView findallCommandes(HttpSession session) {

    	ModelAndView modelAndView = new ModelAndView("/login");
    	if(session.getAttribute("admin") != null){
    		modelAndView = new ModelAndView("/findall", "liste", commandeRepo.findAll());
            modelAndView.addObject("type", "Commande");
            modelAndView.addObject("createMethod", "createcommande");
            modelAndView.addObject("removeMethod", "removecommande");
		}
	    return modelAndView;	
    }
    
    @PostMapping("/createcommande")
    public String createCommande(@ModelAttribute(name = "commande") Commande commande) {
        commandeRepo.save(commande);
        return "redirect:/admin/findallcommandes";
    }
    
    @PostMapping("removecommande")
    public String removeCommande(@ModelAttribute(name = "idCommande") int idCommande, Model model) {        
    	commandeRepo.deleteById(idCommande);
        
        return "redirect:/admin/findallcommandes";
    }

}
