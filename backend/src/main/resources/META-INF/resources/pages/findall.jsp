<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@page import="ecommerce.backend.model.*"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>FINDALL</title>
</head>
<body>
	<jsp:include page="nav.jsp" />
	<h1>Gestion des XX</h1>

	<c:set var="object" value="${liste[0]}" />
	<c:if test="${not empty object['class'].declaredFields}">
	    <div class="mt-5 m-3">
		<h2>
			Ajouter <em>${type}</em>
		</h2>
		<form action="createadmin" method="post">
		
		
		
			<input type="hidden" id="version" name=${type } value="4" />
			<ul>
				<c:forEach var="field" items="${object['class'].declaredFields}">
					<c:catch>
						<li><span style="font-weight: bold"> <label
								for=${field.name}>${field.name}:</label> <input type="text"
								id=${field.name } name=${field.name } required><br>
					</c:catch>
				</c:forEach>
			</ul>
			<input type="submit" class="btn btn-success" value="Ajouter">
		</form>
		    </div>


		<div class="mt-5 m-3">
			<h2>Liste</h2>
			<table class="table table-hover">
				<tr>
					<c:forEach var="field" items="${object['class'].declaredFields}">
						<th>${field.name}:</th>
					</c:forEach>
					<th>Modifier:</th>
					<th>Supprimer:</th>
				</tr>

				<c:forEach items="${liste}" var="item">
					<c:set var="object" value="${item}" />
					<tr>

						<c:forEach var="field" items="${object['class'].declaredFields}">

							<td class="editable">${object[field.name]}</td>

						</c:forEach>
						<td><input type="button" class="btn btn-warning"
							value="Modifier"></td>
						<td><input type="button" class="btn btn-danger"
							value="Supprimer"></td>
					<tr>
				</c:forEach>
			</table>
		</div>

	</c:if>

	<script>

    // On sélectionne les éléments éditables
    const editableElmts = document.querySelectorAll('.editable');

    // On leur pose un listener sur le clic à chacun
    editableElmts.forEach(elmt => {
      elmt.addEventListener("click", handleEdit);
    });

    // On tranforme en input type texte
    function handleEdit(event) {
      const cell = event.target;
      const text = cell.innerHTML;
      cell.innerHTML = '<input type="text" value="' + text + '">';
    }
  </script>


</body>
</html>