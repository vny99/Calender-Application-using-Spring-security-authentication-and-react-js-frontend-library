package com.employee.management.entity;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;


import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection="Leave")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Leave {
	@Id
	private String id;
	private Date date;
	private ArrayList<String> day;
	private ArrayList<String> fN;
	private ArrayList <String> aN;
	public Leave() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Leave(String id, Date date, ArrayList<String> day, ArrayList<String> fN, ArrayList<String> aN) {
		super();
		this.id = id;
		this.date = date;
		this.day = day;
		this.fN = fN;
		this.aN = aN;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public ArrayList<String> getDay() {
		return day;
	}
	public void setDay(ArrayList<String> day) {
		this.day = day;
	}
	public ArrayList<String> getfN() {
		return fN;
	}
	public void setfN(ArrayList<String> fN) {
		this.fN = fN;
	}
	public ArrayList<String> getaN() {
		return aN;
	}
	public void setaN(ArrayList<String> aN) {
		this.aN = aN;
	}
	@Override
	public String toString() {
		return "Leave [id=" + id + ", date=" + date + ", day=" + day + ", fN=" + fN + ", aN=" + aN + "]";
	}
	

}
