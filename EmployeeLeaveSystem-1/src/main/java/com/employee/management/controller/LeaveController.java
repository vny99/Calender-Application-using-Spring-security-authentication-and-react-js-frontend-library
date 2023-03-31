package com.employee.management.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.employee.management.entity.Leave;
import com.employee.management.entity.LeaveBrief;
import com.employee.management.repositery.EmployeeRepository;
import com.employee.management.repositery.LeaveRepository;

@CrossOrigin(origins = ("*"), maxAge = 3600)
@RestController
@RequestMapping("/api/leave")
public class LeaveController {
	@Autowired
	private LeaveRepository repo;
	@Autowired
	private EmployeeRepository eRepo;

	@GetMapping("/get/{leaveDate}")
	public ResponseEntity<Leave> getLeave(@PathVariable Date leaveDate) throws NoSuchElementException {
		if (!repo.findByDate(leaveDate).isEmpty()) {
			Leave l = repo.findByDate(leaveDate).get();
			return ResponseEntity.ok(l);
		}
		return null;
	}

	@PostMapping("/set")
	public ResponseEntity<String> setLeave(@RequestBody LeaveBrief leaveBrief) {
		String msg = "leave added successfully";
		String emsg = "solt is already occupied";
		if (repo.findByDate(leaveBrief.getDate()).isEmpty()) {
			Leave leave = new Leave();
			leave.setDate(leaveBrief.getDate());
			ArrayList<String> day = new ArrayList<String>();
			day.add(eRepo.findByEmail(leaveBrief.getUser()).get().getFirstName() + " "
					+ eRepo.findByEmail(leaveBrief.getUser()).get().getLastName());
			if (leaveBrief.getDay().equals("FD")) {
				leave.setDay(day);
			} else if (leaveBrief.getDay().equals("FN")) {
				leave.setfN(day);
			} else {
				leave.setaN(day);
			}
			repo.save(leave);
			return ResponseEntity.ok(msg);

		} else {
			Leave l = repo.findByDate(leaveBrief.getDate()).get(); 
			ArrayList<String> day = new ArrayList<String>();
			if (leaveBrief.getDay().equals("FD")) {
				if (l.getDay() == null) {
					if (l.getfN() != null && l.getaN() != null) {
						if (l.getaN().size() < 2 && l.getfN().size() < 2) {
							day = l.getDay();
							day.add(eRepo.findByEmail(leaveBrief.getUser()).get().getFirstName() + " "
									+ eRepo.findByEmail(leaveBrief.getUser()).get().getLastName());
							l.setDay(day);
							repo.save(l);
							return ResponseEntity.ok(msg);

						} else {
							return ResponseEntity.ok(emsg);
						}
					} else if (l.getaN() != null) {
						if (l.getaN().size() < 2) {
							day = l.getDay();
							day.add(eRepo.findByEmail(leaveBrief.getUser()).get().getFirstName() + " "
									+ eRepo.findByEmail(leaveBrief.getUser()).get().getLastName());
							l.setDay(day);
							repo.save(l);
							return ResponseEntity.ok(msg);
						} else {
							return ResponseEntity.ok(emsg);
						}

					} else if (l.getfN() != null) {
						if (l.getfN().size() < 2) {
							day = l.getDay();
							day.add(eRepo.findByEmail(leaveBrief.getUser()).get().getFirstName() + " "
									+ eRepo.findByEmail(leaveBrief.getUser()).get().getLastName());
							l.setDay(day);
							repo.save(l);
							return ResponseEntity.ok(msg);
						} else {
							return ResponseEntity.ok(emsg);
						}

					}

				} else if (l.getDay().size() == 1) {

					if (l.getaN() == null && l.getfN() == null) {
						day = l.getDay();
						day.add(eRepo.findByEmail(leaveBrief.getUser()).get().getFirstName() + " "
								+ eRepo.findByEmail(leaveBrief.getUser()).get().getLastName());
						l.setDay(day);
						repo.save(l);
						return ResponseEntity.ok(msg);

					}

				} else if (l.getDay().size() == 2) {
					return ResponseEntity.ok(emsg);

				}

			}
			if (leaveBrief.getDay().equals("FN")) {
				if (l.getDay() == null) {
					if (l.getfN() != null) {
						if (l.getfN().size() < 2) {
							day = l.getfN();
							day.add(eRepo.findByEmail(leaveBrief.getUser()).get().getFirstName() + " "
									+ eRepo.findByEmail(leaveBrief.getUser()).get().getLastName());
							l.setfN(day);
							repo.save(l);
							return ResponseEntity.ok(msg);

						} else {
							return ResponseEntity.ok(emsg);
						}

					} else {
						day.add(eRepo.findByEmail(leaveBrief.getUser()).get().getFirstName() + " "
								+ eRepo.findByEmail(leaveBrief.getUser()).get().getLastName());
						l.setfN(day);
						repo.save(l);
						return ResponseEntity.ok(msg);

					}

				} else if (l.getDay().size() == 1) {
					if (l.getfN() == null) {
						day.add(eRepo.findByEmail(leaveBrief.getUser()).get().getFirstName() + " "
								+ eRepo.findByEmail(leaveBrief.getUser()).get().getLastName());
						l.setfN(day);
						repo.save(l);
						return ResponseEntity.ok(msg);

					} else {
						return ResponseEntity.ok(emsg);

					}

				} else {
					return ResponseEntity.ok(emsg);
				}
			}
			if (leaveBrief.getDay().equals("AN")) {
				if (l.getDay() == null) {
					if (l.getaN() != null) {
						if (l.getaN().size() < 2) {
							day = l.getaN();
							day.add(eRepo.findByEmail(leaveBrief.getUser()).get().getFirstName() + " "
									+ eRepo.findByEmail(leaveBrief.getUser()).get().getLastName());
							l.setaN(day);
							repo.save(l);
							return ResponseEntity.ok(msg);

						} else {
							return ResponseEntity.ok(emsg);
						}

					} else {
						day.add(eRepo.findByEmail(leaveBrief.getUser()).get().getFirstName() + " "
								+ eRepo.findByEmail(leaveBrief.getUser()).get().getLastName());
						l.setaN(day);
						repo.save(l);
						return ResponseEntity.ok(msg);

					}

				} else if (l.getDay().size() == 1) {
					if (l.getaN() == null) {
						day.add(eRepo.findByEmail(leaveBrief.getUser()).get().getFirstName() + " "
								+ eRepo.findByEmail(leaveBrief.getUser()).get().getLastName());
						l.setaN(day);
						repo.save(l);
						return ResponseEntity.ok(msg);

					} else {
						return ResponseEntity.ok(emsg);

					}

				} else {
					return ResponseEntity.ok(emsg);
				}
			}

		}
		return ResponseEntity.ok("leave added successfully");

	}

}
