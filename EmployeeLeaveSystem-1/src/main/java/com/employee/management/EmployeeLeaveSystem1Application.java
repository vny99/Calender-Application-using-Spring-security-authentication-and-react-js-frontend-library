package com.employee.management;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;


@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class EmployeeLeaveSystem1Application {

	public static void main(String[] args) {
		SpringApplication.run(EmployeeLeaveSystem1Application.class, args);
	}

}
