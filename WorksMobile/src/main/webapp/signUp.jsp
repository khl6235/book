<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>회원가입</title>
</head>
<body>

<center>
<h1>회원가입</h1>
<hr>
<form action="signup.do" method="post">
<table border="1" cellpadding="0" cellspacing="0">
	<tr>
		<td bgcolor="orange">아이디</td>
		<td><input type="text" name="id" value="${userVO.id }"/></td>
	</tr>
	<tr>
		<td bgcolor="orange">비밀번호</td>
		<td><input type="password" name="password" value="${userVO.password }"/></td>
	</tr>
	<tr>
		<td bgcolor="orange">비밀번호 확인</td>
		<td><input type="password" name="passwordCheck" value="${userVO.passwordCheck }"/></td>
	<tr>
		<td colspan="2" align="center">
			<input type="submit" value="회원가입"/>
		</td>
	</tr>
</table>
</form>
<hr>
</center>

</body>
</html>