package com.employee.management.config;


import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
	private static String SECRET_KEY="3F4428472B4B6250655368566D597133743677397A244326452948404D635166";

	public String extractUser(String token) {
		// TODO Auto-generated method stub
		
		return extractClaim(token, Claims::getSubject);
	}
	public <T> T extractClaim(String token, Function<Claims, T> ClaimsResolver) {
		final Claims claims=extractAllClaims(token);
		return ClaimsResolver.apply(claims);
	}
	public Claims  extractAllClaims (String token) {
		return Jwts
				.parserBuilder()
				.setSigningKey(getSignInKey())
				.build()
				.parseClaimsJws(token)
				.getBody(); 
	}
	private Key getSignInKey() {
		// TODO Auto-generated method stub
		byte[] keyBytes= Decoders.BASE64.decode(SECRET_KEY);
		return Keys.hmacShaKeyFor(keyBytes);
		
	}
	public String generateToken(
			Map<String,Object> extraClaims,
			UserDetails userDetails
			) {
		return Jwts
				.builder()
				.setClaims(extraClaims)
				.setSubject(userDetails.getUsername())
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis()+ 3600000))
				.signWith(getSignInKey(), SignatureAlgorithm.HS256)
				.compact();
				
	}
	public String generateToken(UserDetails userDetails) {
		return generateToken(new HashMap(),userDetails);
	}
	public boolean isTokenValid(String token, UserDetails userDetails) {
		final String user=extractUser(token);
		return (user.equals(userDetails.getUsername())) && !isTokenExpire(token);
	}
	private boolean isTokenExpire(String token) {
		// TODO Auto-generated method stub
		return extractExpiration(token).before(new Date()) ;
	}
	private Date extractExpiration(String token) {
		// TODO Auto-generated method stub
		return extractClaim(token,Claims::getExpiration);
	}

}
