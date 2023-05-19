<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@page import="ecommerce.backend.model.*" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>

<c:set var="object" value="${liste[0]}" />
	<c:if test="${not empty object['class'].declaredFields}">
	   	<h2>Create <em>${type}</em></h2>
	   	<form action="createadmin" method="post">
	   	<input type="hidden" id="version" name=${type} value="4" />
	   	<ul>
	        <c:forEach var="field" items="${object['class'].declaredFields}">
	            <c:if test="${field.name != 'articles' }">
		            <c:catch><li><span style="font-weight: bold">
				        <label for=${field.name}>${field.name}:</label>
				        <input type="text" id=${field.name} name=${field.name} required><br>	
		            </c:catch>
	       		</c:if>
	        </c:forEach>
	   	</ul>
	   	<input type="submit" value="Ajouter"> 
	  	    </form>
</c:if> 

<c:forEach items="${liste}" var="item">
		<li>${item}</li>
</c:forEach>	
</body>
</html>