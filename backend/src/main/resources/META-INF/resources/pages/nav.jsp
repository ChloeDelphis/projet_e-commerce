<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
      crossorigin="anonymous"
    />
<title>Insert title here</title>
</head>
<body>
	<% if(session.getAttribute("admin") != null){ %>
    <nav class="navbar navbar-expand-sm bg-light">
      <div class="container-fluid">
        <!-- Links -->
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="/site/admin/findallcategories">Catégories</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/site/admin/findallarticles">Produits</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/site/admin/findallstock">Stocks</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/site/admin/findallclients">Clients</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/site/admin/findallcommandes">Commandes</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/site/admin/findalladmin">Administrateurs</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/site/admin/logoff">Deconnexion</a>
          </li>
        </ul>
      </div>
    </nav>
	<% }
	else{
	%>
    <nav class="navbar navbar-expand-sm bg-light">
      <div class="container-fluid">
        <!-- Links -->
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="/site/admin/login">Connexion</a>
          </li>
        </ul>
      </div>
    </nav>	
	<% } %>
</body>
</html>