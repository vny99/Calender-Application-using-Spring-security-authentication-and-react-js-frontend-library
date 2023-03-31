package com.employee.management.repositery;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.employee.management.entity.Employee;

@Repository
public interface EmployeeRepository extends MongoRepository<Employee, String>{
	Optional<Employee> findByEmail(String email);

}
