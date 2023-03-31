package com.employee.management.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.employee.management.config.JwtService;
import com.employee.management.entity.Employee;
import com.employee.management.entity.Role;
import com.employee.management.repositery.EmployeeRepository;

@Service
public class AuthenticationService {
	@Autowired
	private EmployeeRepository repo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private JwtService jwtService;
	@Autowired
	private AuthenticationManager authenticationManager;

	public AuthenticationResponse register(RegisterRequest request) {
		// TODO Auto-generated method stub
	   if(repo.findByEmail(request.getEmail())!=null) {
	    
	   }
	   Employee emp=new Employee();
	   emp.setEmpId(request.getEmpId());
	   emp.setFirstName(request.getFirstName());
	   emp.setLastName(request.getLastName());
	   emp.setEmail(request.getEmail());
	   emp.setPassWord(passwordEncoder.encode(request.getPassword()));
	   emp.setRole(request.getRole());
	   repo.save(emp);
		var jwtToken= jwtService.generateToken(emp);
		AuthenticationResponse asp=new AuthenticationResponse(jwtService.generateToken(emp));
		return asp;
		
	}

	public AuthenticationResponse authenticate(AuthenticationRequest request) {
		// TODO Auto-generated method stub
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
				);
		var user=repo.findByEmail(request.getEmail())
				.orElseThrow();
		var jwtToken= jwtService.generateToken(user);
		AuthenticationResponse asp=new AuthenticationResponse(jwtToken);
		return asp;
	}

}
