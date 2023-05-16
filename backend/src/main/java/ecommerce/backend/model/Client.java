package ecommerce.backend.model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Version;

@Entity
public class Client {

	@Id
	private String email;
	private String mdp;
	private String prenom;
	private String nom;
	private String tel;
	@ManyToOne
	@JoinColumn(name = "adresse")
	private Adresse adresse;
	@OneToOne(mappedBy = "client", cascade = CascadeType.ALL)
	private Panier panier;
	@Version
	private int version;

	public Panier getPanier() {
		return panier;
	}

	public void setPanier(Panier panier) {
		this.panier = panier;
	}

	public String getMdp() {
		return mdp;
	}

	public void setMdp(String mdp) {
		this.mdp = mdp;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public Adresse getAdresse() {
		return adresse;
	}

	public void setAdresse(Adresse adresse) {
		this.adresse = adresse;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public Client(String email, String mdp, String prenom, String nom, String tel, Adresse adresse, Panier panier) {
		super();
		this.email = email;
		this.mdp = mdp;
		this.prenom = prenom;
		this.nom = nom;
		this.tel = tel;
		this.adresse = adresse;
		this.panier = panier;
	}

	public Client() {
		super();
	}

	@Override
	public String toString() {
		return "Client [email=" + email + ", mdp=" + mdp + ", prenom=" + prenom + ", nom=" + nom + ", tel=" + tel
				+ ", adresse=" + adresse + ", panier=" + panier + ", version=" + version + "]";
	}

}