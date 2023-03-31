package com.employee.management.entity;

import java.util.Date;

public class LeaveBrief {
private String user;
private Date date;
private String day;
public LeaveBrief() {
	super();
	// TODO Auto-generated constructor stub
}
public LeaveBrief(String user, Date date, String day) {
	super();
	this.user = user;
	this.date = date;
	this.day = day;
}
public String getUser() {
	return user;
}
public void setUser(String user) {
	this.user = user;
}
public Date getDate() {
	return date;
}
public void setDate(Date date) {
	this.date = date;
}
public String getDay() {
	return day;
}
public void setDay(String day) {
	this.day = day;
}
@Override
public String toString() {
	return "LeaveBrief [user=" + user + ", date=" + date + ", day=" + day + "]";
}

	
}
