<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
 <h1>Remove ADMIN</h1>
    <form action="removeadmin" method="post">
        <label for="email">Email:</label>
        <input type="text" id="email" name="email" required><br><br>

        <input type="submit" value="Supprimer">
    </form>
    
<h1>Remove Article</h1>
    <form action="removearticle" method="post">
    
    	<label for="ref">Ref :</label>
        <input type="number" id="ref" name="ref" required><br><br>

        <input type="submit" value="Supprimer">
    </form>
</body>
</html>