<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@page import="ecommerce.backend.model.*" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>FINDALL</title>
</head>
<body>
<% if(session.getAttribute("admin") != null){ %>
	<jsp:include page="nav.jsp" />
	<h1>Gestion des ${type }</h1>

	<c:set var="object" value="${liste[0]}" />
	<c:if test="${not empty object['class'].declaredFields}">
	    <div class="mt-5 m-3">
		    <div class="row">
	        	<div class="col">
					<h2>
						Ajouter <em>${type}</em>
					</h2>
					<form action= ${createMethod} method="post">
					
						<input type="hidden" id="version" name=${type } value="4" />
						<ul>
							<c:forEach var="field" items="${object['class'].declaredFields}">
								<c:if test="${field.name != 'articles' && field.name != 'version' && field.name != 'date'}">
									<c:catch>
										<li>
											<span style="font-weight: bold"> 
											<label for=${field.name}>${field.name}:</label> 
											<input type="text" id=${field.name } name=${field.name }>
										</li>
									</c:catch>
								</c:if>
							</c:forEach>
						</ul>
						<input type="submit" class="btn btn-success" value="Ajouter">
					</form>
				</div>
				
				<c:if test="${isAdresse == true}">
					<div class="col">
						<h2>
							Modifier <em>Adresse</em>
						</h2>
						<form action="createAdresse" method="post">
							<ul>
								<li>
									<span style="font-weight: bold"> 
									<label>id :</label> 
									<input type="text" id="id" name="id" value=>
								</li>
								<li>
									<span style="font-weight: bold"> 
									<label>numero :</label> 
									<input type="text" id="numero" name="numero">
								</li>
								<li>
									<span style="font-weight: bold"> 
									<label>rue :</label> 
									<input type="text" id="rue" name="rue">
								</li>
								<li>
									<span style="font-weight: bold"> 
									<label>complement :</label> 
									<input type="text" id="complement" name="complement">
								</li>
								<li>
									<span style="font-weight: bold"> 
									<label>code postal :</label> 
									<input type="text" id="cp" name="cp">
								</li>
								<li>
									<span style="font-weight: bold"> 
									<label>ville :</label> 
									<input type="text" id="ville" name="ville">
								</li>
							</ul>
							<input type="submit" class="btn btn-success" value="Valider">
						</form>
					</div>
				</c:if>
			</div>
		</div>


		<div class="mt-5 m-3">
			<h2>Liste</h2>
			<table class="table table-hover">
				<tr>
					<c:forEach var="field" items="${object['class'].declaredFields}">
						<c:if test="${field.name != 'articles' && field.name != 'version' && field.name != 'panier'}">	
							<th style="text-align:center;">${field.name}:</th>
						</c:if>
					</c:forEach>
					<th>Modifier:</th>
					<th>Supprimer:</th>
				</tr>

				<c:forEach items="${liste}" var="item">
					<c:set var="object" value="${item}"/>
					<tr>
						<form action="${updateMethod }" method="post"> 
							<c:forEach var="field" items="${object['class'].declaredFields}">
								<c:if test="${field.name != 'articles' && field.name != 'version' && field.name != 'panier'}">
									<c:set var="idType" value="${object['class'].declaredFields[0].name}" /> 
									<c:set var="idValue" value="${object[object['class'].declaredFields[0].name]}" />
										<c:if test="${field.name == 'date'}">
											<td> ${object[field.name]}</td>
										</c:if>
										<c:if test="${field.name == 'adresse' }">
											<%-- <td> ${object[field.name]}</td> --%>
											<td><a href="<c:url value='/admin/action'/>">Test</a></td>
										</c:if>
										<c:if test="${field.name != 'categorie' && field.name != 'date' && field.name != 'adresse'}">
											<td> <input type="text" id="${field.name }" name="${field.name }" value ="${object[field.name]}" style="border:none; text-align:center;" ></input></td>
										</c:if>
										<c:if test="${field.name == 'categorie'}">
											<td> <input type="text" id="${field.name }" name="${field.name }" value ="${object[field.name].getId()}" style="border:none; text-align:center;" ></input></td>
										</c:if>
								</c:if>
							</c:forEach>
							<td><input type="submit" class="btn btn-warning" value="Modifier"></td>
						</form>
						<td>
							<form action="${removeMethod}" method="post">       	 
	 				        	<input type="hidden" id="${idType}" name="${idType}" value="${idValue }" />
								<input type="submit" class="btn btn-danger" value="Supprimer">
							</form>
						</td>
							
					<tr>
				</c:forEach>
			</table>
		</div>

	</c:if>
<% } %>
    	
</body>
</html>