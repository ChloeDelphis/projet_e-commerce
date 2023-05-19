<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
		
	<h2>Create <em>${type}</em></h2>
	<form action= ${postMethod} method="post">
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
</body>
</html>