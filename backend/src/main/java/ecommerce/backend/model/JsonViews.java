package ecommerce.backend.model;

// Pour éviter les boucles infinies
public class JsonViews {
	public static class Common {

	}
	
	public static class ClientWithAdresseAndPanier extends Common {

	}
	
	public static class AdresseWithClient extends Common {

	}

	public static class ArticleWithCategorie extends Common {

	}

	public static class CategorieWithArticle extends Common {

	}
	
	public static class PanierWithLigneAndClient extends Common{
		
		
	}
	
	public static class LigneWithPanierAndArticle extends Common{
		
	}


}
