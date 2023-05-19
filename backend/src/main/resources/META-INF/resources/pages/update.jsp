<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
 <h1>Insert ADMIN</h1>
    <form action="createadmin" method="post">
        <label for="email">Email:</label>
        <input type="text" id="email" name="email" required><br><br>

        <label for="password">Mot de passe:</label>
        <input type="password" id="password" name="password" required><br><br>
        
        <label for="prenom">Prenom :</label>
        <input type="prenom" id="prenom" name="prenom" required><br><br>

        <input type="submit" value="Ajouter">
    </form>
    
<h1>Insert Article</h1>
    <form action="createarticle" method="post">
    
    	<label for="ref">Ref :</label>
        <input type="number" id="ref" name="ref" required><br><br>
    
        <label for="nom">Nom:</label>
        <input type="text" id="nom" name="nom"><br><br>
        
        <label for="marque">Marque:</label>
        <input type="text" id="marque" name="marque"><br><br>
       
        <label for="description">Description:</label>
        <input type="text" id="description" name="description"><br><br>

        <label for="categorie">Categorie :</label>
        <input type="number" id="categorie" name="categorie"><br><br>
        
        <label for="prix">Prix :</label>
        <input type="number" id="prix" name="prix"><br><br>
        
        <label for="img">Iamage :</label>
        <input type="text" id="img" name="img"><br><br>
        
        <label for="mea">Mea :</label>
        <input type="number" id="mea" name="mea"><br><br>


        <input type="submit" value="Ajouter">
    </form>
</body>
</html>