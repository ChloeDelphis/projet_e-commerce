package ecommerce.backend.controller;

import java.util.Date;
import java.util.Optional;

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

import ecommerce.backend.model.Admin;
import ecommerce.backend.model.Article;
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
        return "/test";
    }
    
  //ACCES PAGES 
    
    @RequestMapping("successlogin")
    public String successLogin(){
    	return "/successLogin";
    }

    @RequestMapping("/login")
    public ModelAndView login(HttpServletRequest request, HttpSession session) {
    	ModelAndView modelAndView;
    	Admin adminSession = (Admin)request.getSession().getAttribute("admin");
    	if( adminSession != null){
    		modelAndView = new ModelAndView("/successLogin", "message", "Vous êtes déja connecté");
    	}
    	else{
    		modelAndView = new ModelAndView("/login");
    	}
        return modelAndView;
    }
    
    @RequestMapping("insert")
    public String insert(){
    	return "/insert";
    }
    
    @RequestMapping("delete")
    public String delete(){
    	return "/delete";
    }
    
    @RequestMapping("findbyid")
    public String findById(){
    	return "/findbyid";
    }
    
    @PostMapping("/selecttype")
    public ModelAndView selectType(@RequestParam(name = "select-choice") String type) {
    	ModelAndView modelAndView = new ModelAndView("/findbyid");
    	
    	String action;
    	String inputType;
    	String label;
    	
    	
    	switch (type) {
		case "Admin":
			action = "findadminbyid";
			inputType = "text";
			label = "email";

			
			break;
		case "Article":
			action = "findarticlebyid";
			inputType = "number";
			label = "ref";
			break;
		case "Client":
			action = "findclientbyid";
			inputType = "text";
			label = "email";
			break;
		default:
			action = "";
			inputType = "";
			label = "";
			break;
		}
    	
    	modelAndView.addObject("action", action);
    	modelAndView.addObject("inputType", inputType);
    	modelAndView.addObject("itemType", type);
    	modelAndView.addObject("label", label);
        return modelAndView;
    }
    
  //LOGIN Admin ----------------------------------------------------------------------
     
    @PostMapping("/login")
    public ModelAndView processLogin(HttpSession session,@ModelAttribute("admin") Admin admin) {

        if (isValidCredentials(admin.getEmail(), admin.getPassword())) {
        	    session.setAttribute("admin", admin);
            return new ModelAndView("/successLogin", "message", "Bienvenu !");
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

    //CRUD Admin ----------------------------------------------------------------------
    
    @RequestMapping("/findalladmin")
    public ModelAndView findallAdmin() {
        ModelAndView modelAndView = new ModelAndView("/findall", "liste", adminRepo.findAll());
        return modelAndView;
    }
    
//    @RequestMapping("/findadminbyid/{email}")
//    public ModelAndView findAdminById(Model model, @PathVariable(name = "email") String email) {
//        ModelAndView modelAndView = new ModelAndView("/findbyid", "item", adminRepo.findById(email).get());
//
//        return modelAndView;
    
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
    public String update(@ModelAttribute(name = "email") String email, Model model) {        
        adminRepo.deleteById(email);
        
        return "redirect:/admin/findalladmin";
    }
    
    @PostMapping("update")
    public String update(@ModelAttribute(name = "admin") Admin admin, Model model) {
        adminRepo.save(admin);
        
        return "redirect:/findall";
    }
    
  //CRUD Articles ----------------------------------------------------------------------
    @RequestMapping("/findallarticles")
    public ModelAndView findallArticles() {
        ModelAndView modelAndView = new ModelAndView("/findall", "liste", articleRepo.findAll());
        return modelAndView;
    }
    
//    @RequestMapping("/findarticlebyid/{id}")
//    public ModelAndView findArticleById(Model model, @PathVariable(name = "id") int id) {
//        ModelAndView modelAndView = new ModelAndView("/findbyid", "item", articleRepo.findById(id).get());
//
//        return modelAndView;
//    }
    
    @PostMapping("/findarticlebyid")
    public ModelAndView findAdminById(@RequestParam(name = "ref") int ref) {
        ModelAndView modelAndView = new ModelAndView("/findbyid", "item", articleRepo.findById(ref).get());

        return modelAndView;
    }
    
    @PostMapping("/createarticle")
    public String createArticle(@ModelAttribute(name = "article") Article article) {
//    	article.setDate(new Date());
    	System.out.println(article);
        articleRepo.save(article);
        
        return "redirect:/admin/findallarticles";
    }
    
    @PostMapping("removearticle")
    public String update(@ModelAttribute(name = "ref") int ref, Model model) {        
        articleRepo.deleteById(ref);
        
        return "redirect:/admin/findallarticles";
    }
    
  //CRUD Categories ----------------------------------------------------------------------
    @RequestMapping("/findallcategories")
    public ModelAndView findallCategories() {
        ModelAndView modelAndView = new ModelAndView("/findall", "liste", categorieRepo.findAll());
        return modelAndView;
    }
    
    //CRUD Clients ----------------------------------------------------------------------
    @RequestMapping("/findallclients")
    public ModelAndView findallClients() {
        ModelAndView modelAndView = new ModelAndView("/findall", "liste", clientRepo.findAll());
        return modelAndView;
    }
    
    //CRUD Commandes ----------------------------------------------------------------------
    @RequestMapping("/findallcommandes")
    public ModelAndView findallCommandes() {
        ModelAndView modelAndView = new ModelAndView("/findall", "liste", commandeRepo.findAll());
        return modelAndView;
    }

}
