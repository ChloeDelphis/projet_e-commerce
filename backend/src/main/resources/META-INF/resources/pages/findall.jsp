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
<jsp:include page="nav.jsp" /> 
	<a href=""></a>
	<c:set var="object" value="${liste[0]}" />
	<c:if test="${not empty object['class'].declaredFields}">
		<div class="Saisie">

		   		<h2>Create <em>${type}</em></h2>
			   	<form action= ${createMethod} method="post">
			   	<input type="hidden" id="version" name=${type} value="4" />
			   	<ul>
			        <c:forEach var="field" items="${object['class'].declaredFields}">
			        	<c:if test="${field.name != 'articles' && field.name != 'version' && field.name != 'date'}">
				            <c:catch><li><span style="font-weight: bold">
						        <label for=${field.name}>${field.name}:</label>
						        <input type="text" id=${field.name} name=${field.name}></li>	
				            </c:catch>
			            </c:if>
			        </c:forEach>
			   	</ul>
			   	<input type="submit" value="Ajouter"> 
		  	    </form>

		</div>
		
		<div class="Affichage">
			<table>
			
				<tr>
			        <c:forEach var="field" items="${object['class'].declaredFields}">
			        	<c:if test="${field.name != 'articles' }">
			        		<th>${field.name}:</th>
			        	</c:if>
			        </c:forEach>	
		        </tr>	
		        
			    <c:forEach items="${liste}" var="item">
			    <c:set var="object" value="${item}" />
			    	<tr>
				        <c:forEach var="field" items="${object['class'].declaredFields}">
				        
 				        	<c:set var="idType" value="${object['class'].declaredFields[0].name}" /> 
 				        	<c:set var="idValue" value="${object[object['class'].declaredFields[0].name]}" /> 
				        	
				        	<c:if test="${field.name != 'articles' }">
				        		<td>${object[field.name]}</td>
				        	</c:if>
				        </c:forEach>
				        <td><input type="button" value="Modifier"></td>
				        <td>
				        	<form action="${removeMethod}" method="post">
				        	 
 				        	<input type="hidden" id="${idType}" name="${idType}" value="${idValue }" />
				        	<input type="submit" value="Supprimer"></form> 
				        </td> 

			        <tr>			    
			    </c:forEach>
			    </table>
	    </div>
    </c:if> 
    	
</body>
</html>