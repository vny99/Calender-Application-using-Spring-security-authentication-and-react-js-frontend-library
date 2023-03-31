package com.employee.management.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.employee.management.entity.Employee;
import com.employee.management.repositery.EmployeeRepository;
@CrossOrigin( origins = ("*"),maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {
	@Autowired
	private EmployeeRepository empRepo;
	@GetMapping("/{email}")
	private ResponseEntity<String> getEmployeeByEmail(@PathVariable String email) {
		Employee user= empRepo.findByEmail(email).get();
		String name=user.getFirstName()+" "+user.getLastName();
		return ResponseEntity.ok(name);
		
		
	}
	

}
