package ecommerce.backend.model;

public class ClientDTO {

	private String email;
	private String mdp;
	private String prenom;
	private String nom;
	private String tel;
	private Adresse adresse;
	private int panier;
	private int version;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
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

	public int getPanier() {
		return panier;
	}

	public void setPanier(int panier) {
		this.panier = panier;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	public ClientDTO(String email, String mdp, String prenom, String nom, String tel, Adresse adresse, int panier) {
		super();
		this.email = email;
		this.mdp = mdp;
		this.prenom = prenom;
		this.nom = nom;
		this.tel = tel;
		this.adresse = adresse;
		this.panier = panier;
	}

	public ClientDTO() {
		super();
	}

	@Override
	public String toString() {
		return "ClientDTO [email=" + email + ", mdp=" + mdp + ", prenom=" + prenom + ", nom=" + nom + ", tel=" + tel
				+ ", adresse=" + adresse + ", panier=" + panier + ", version=" + version + "]";
	}

}
