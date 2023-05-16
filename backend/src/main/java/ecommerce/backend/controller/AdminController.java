package ecommerce.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import ecommerce.backend.model.Admin;
import ecommerce.backend.repository.AdminRepository;

@Controller
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	private AdminRepository adminRepo;
	
    @RequestMapping("/test")
    public String getTest() {
        return "/test";
    }
    
    @RequestMapping("/findall")
    public ModelAndView findall() {
        ModelAndView modelAndView = new ModelAndView("/findall", "liste", adminRepo.findAll());

        return modelAndView;
    }
    
    @RequestMapping("/findbyid/{email}")
    public ModelAndView findbyid(Model model, @PathVariable(name = "email") String email) {
        ModelAndView modelAndView = new ModelAndView("/findbyid", "admin", adminRepo.findById(email).get());

        return modelAndView;
    }
    
    @RequestMapping("/delete/{id}")
    public String delete(Model model, @PathVariable(name = "email") String email) {
        adminRepo.deleteById(email);

        return "redirect:/findall";
    }
    
    @RequestMapping("/create/{email}/{password}/{prenom}")
    public String create(@PathVariable(name = "email") String email, @PathVariable(name = "nom") String nom,
            @PathVariable(name = "prenom") String prenom) {
    	
        Admin a = new Admin(email, nom, prenom);
        adminRepo.save(a);
        
        return "redirect:/findall";
    }
    
    @PostMapping("/insert")
    public String insert(@ModelAttribute(name = "admin") Admin admin) {
        adminRepo.save(admin);
        
        return "redirect:/findall";
    }
    
    @PostMapping("remove")
    public String update(@ModelAttribute(name = "email") String email, Model model) {        
        adminRepo.deleteById(email);
        
        return "redirect:/findall";
    }
    
    @PostMapping("update")
    public String update(@ModelAttribute(name = "admin") Admin admin, Model model) {
        adminRepo.save(admin);
        
        return "redirect:/findall";
    }


}
