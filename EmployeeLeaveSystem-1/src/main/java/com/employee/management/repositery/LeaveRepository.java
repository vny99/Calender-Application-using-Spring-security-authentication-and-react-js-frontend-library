package com.employee.management.repositery;

import java.util.Date;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.employee.management.entity.Leave;

@Repository
public interface LeaveRepository extends MongoRepository<Leave, String> {
	Optional<Leave> findByDate(Date date);

}
