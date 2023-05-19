<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>

<c:if test = "${itemType == 'Admin'}">
Bonjour
</c:if>

<h1>Find by Id</h1>

	<form action="selecttype" method="post">
        <label for="type">Choisissez une option :</label>
        <select name="select-choice" id="select-choice">
            <option value="Admin">Admin</option>
            <option value="Article">Article</option>
            <option value="Client">Client</option>
        </select>
        <input type="submit" value="Choisir">
    </form>


    <form action=${action } method="post">
        <label for=${label }>${itemType }</label>
        <input type=${inputType } id=${label } name=${label } required><br><br>

        <input type="submit" value="Chercher">
    </form>
<h1>Data</h1>
    <div>${item }</div>
<jsp:include page="update.jsp" /> 


</body>
</html>