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

<title>Connexion admin</title>
</head>
  <body
    class="d-flex flex-column justify-content-center align-items-center mt-5"
  >
    <h1 style="color: #fd7e14">
      Bienvenue sur le back-office de Fashion Store !
    </h1>
    <h2 class="mt-3 mb-5">Connexion</h2>

    <form action="login" method="post">
      <div class="mb-3 mt-3">
        <label for="email" class="form-label">Email :</label>
        <input
          type="email"
          class="form-control"
          id="email"
          placeholder="Entrez votre email"
          name="email"
          required
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Mot de passe :</label>
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Entrez votre mot de passe"
          name="password"
          requried
        />
      </div>

      <button type="submit" class="btn btn-warning">Se connecter</button>
    </form>

    <div>${error}</div>
  </body>
</html>