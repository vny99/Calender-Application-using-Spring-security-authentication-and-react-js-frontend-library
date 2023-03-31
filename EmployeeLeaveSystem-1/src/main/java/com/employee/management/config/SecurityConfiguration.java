package com.employee.management.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
	@Autowired
	private  JWTAuthenticationFilter jwtAuthFilter;
	@Autowired
	private AuthenticationProvider authenticationProvider;
@Bean
public SecurityFilterChain securityFilterchain(HttpSecurity http) throws Exception {
	http
	.cors()
	.and()
	.csrf()
	.disable()
	.authorizeHttpRequests()
	.requestMatchers("/api/auth/**")
	.permitAll()
	.anyRequest()
	.authenticated()
	.and()
	.sessionManagement()
	.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
	.and()
	.authenticationProvider(authenticationProvider)
	.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
	
	return http.build();
	
	
	
	
}
@Bean
public CorsConfigurationSource corsconfigureSource() {
	CorsConfiguration configuration =new CorsConfiguration();
	configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
	configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE","OPTIONS"));
	configuration.setAllowedHeaders(Arrays.asList("Authorization","Content_Type"));
	UrlBasedCorsConfigurationSource source=new UrlBasedCorsConfigurationSource();
	source.registerCorsConfiguration("/**", configuration);
	return source;
}

}
