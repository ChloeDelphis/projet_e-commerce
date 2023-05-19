package ecommerce.backend.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Version;

@Entity
public class Admin {
	@Id
	private String email;
	private String password;
	private String prenom;
	@Version
	
	private int version;
	
	public Admin() {
	}
	
	public Admin(String email, String password, String prenom) {
		this.email = email;
		this.password = password;
		this.prenom = prenom;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	@Override
	public String toString() {
		return "Admin [email=" + email + ", password=" + password + ", prenom=" + prenom + "]";
	}
	
}
