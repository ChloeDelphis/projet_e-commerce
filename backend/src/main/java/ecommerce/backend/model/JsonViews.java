
package ecommerce.backend.model;

// Pour éviter les boucles infinies
public class JsonViews {
	public static class Common {

	}

	public static class ArticleWithCategorie extends Common {

	}

	public static class CategorieWithArticle extends Common {

	}
	
	public static class ClientWithAdresse extends Common {
		
	}
	
	public static class AdresseWithClient extends Common{
		
	}
	
	public static class ClientWithPanier extends Common {
		
	}
	
	public static class PanierWithClient extends Common {
		
	}
}

