CREATE DATABASE moderntech_hr;
USE moderntech_hr;

CREATE TABLE departments (
  dept_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(100) NOT NULL
  ) AUTO_INCREMENT = 100;
  
CREATE TABLE employees (
  employee_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  role VARCHAR(50),
  hire_date date NOT NULL,
  dept_id INT,
  FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
  ON DELETE SET NULL
  ON UPDATE CASCADE
);

CREATE TABLE login (
  log_id INT PRIMARY KEY AUTO_INCREMENT,
  employee_id INT NOT NULL,
  password VARCHAR(255) NOT NULL,

  FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
    ON DELETE CASCADE
) AUTO_INCREMENT = 200;

CREATE TABLE payroll (
  payroll_id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id INT,
  month VARCHAR(20),
  hours_worked DECIMAL(5,2),
  net_pay DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
) AUTO_INCREMENT = 30;

CREATE TABLE attendance (
  attendance_id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id INT,
  date DATE,
  status ENUM('Present', 'Absent', 'Leave', 'Late'),
  FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
)  AUTO_INCREMENT = 60;

CREATE TABLE leave_requests (
  leave_id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id INT NOT NULL,
  type VARCHAR(50) NOT NULL,         -- Annual, Sick, Unpaid, Study
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason TEXT,
  leave_status VARCHAR(20) DEFAULT 'Pending',   -- Pending, Approved, Rejected
  date_applied TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE performance (
  performance_id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id INT NOT NULL,
  review_date DATE NOT NULL,
  score INT CHECK (score BETWEEN 0 AND 20),
  remarks TEXT,

  FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
    ON DELETE CASCADE
) AUTO_INCREMENT = 140;

-- 🌐 Insert HR staff from 5 countries
INSERT INTO employees (name, role, hire_date, dept_id)
VALUES  ('Nomvula Dlamini', 'HR Manager', '2015-01-10', 100),
		('Akira Tanaka', 'HR Coordinator', '2016-02-20', 101),
		('Luca Rossi', 'HR Officer', '2017-03-15', 102),
		('Sofia Jiménez', 'HR Analyst', '2018-04-25', 103),
		('Arjun Patel', 'HR Consultant', '2019-06-05', 104),
		('Thabo Mokoena', 'Developer', '2020-07-18', 105),
		('Emily Clarke', 'Designer', '2021-08-22', 106),
		('Ahmed Nasser', 'Support Agent', '2022-09-30', 107),
		('Chen Wei', 'Accountant', '2020-05-14', 108),
		('Olivia Smith', 'Copywriter', '2021-12-02', 109),
		('Carlos Mendes', 'Backend Developer', '2019-11-11', 110),
		('Yvonne Ng', 'Frontend Developer', '2020-10-10', 111),
		('Jonas Richter', 'Data Analyst', '2021-03-28', 112),
		('Mei Lin', 'QA Tester', '2022-06-17', 113),
		('Rajesh Kumar', 'Systems Engineer', '2023-01-05', 114);

INSERT INTO payroll (employee_id, month, hours_worked, net_pay) 
VALUES  (1, 'July 2025', 160, 30000.00),
		(2, 'July 2025', 160, 29500.00),  
		(3, 'July 2025', 160, 28500.00),  
		(4, 'July 2025', 160, 27500.00),  
		(5, 'July 2025', 160, 29000.00),  
		(6, 'July 2025', 160, 28000.00),  
		(7, 'July 2025', 150, 26000.00),  
		(8, 'July 2025', 160, 25500.00),  
		(9, 'July 2025', 160, 27000.00),  
		(10, 'July 2025', 150, 25000.00), 
		(11, 'July 2025', 160, 26500.00),
		(12, 'July 2025', 160, 27500.00), 
		(13, 'July 2025', 160, 27000.00), 
		(14, 'July 2025', 160, 25500.00), 
		(15, 'July 2025', 160, 26800.00); 

INSERT INTO attendance (employee_id, date, status)
 VALUES (1, '2025-07-01', 'Present'),
		(1, '2025-07-02', 'Present'),
		(2, '2025-07-01', 'Leave'),
		(2, '2025-07-02', 'Present'),
		(3, '2025-07-01', 'Present'),
		(3, '2025-07-02', 'Leave'),
		(4, '2025-07-01', 'Absent'),
		(4, '2025-07-02', 'Present'),
		(5, '2025-07-01', 'Present'),
		(5, '2025-07-03', 'Leave'),
		(6, '2025-07-01', 'Present'),
		(6, '2025-07-02', 'Leave'),
		(7, '2025-07-01', 'Leave'),
		(7, '2025-07-02', 'Present'),
		(8, '2025-07-01', 'Present'),
		(8, '2025-07-03', 'Present'),
		(9, '2025-07-01', 'Present'),
		(9, '2025-07-02', 'Absent'),
		(10, '2025-07-01', 'Leave'),
		(10, '2025-07-03', 'Present'),
		(11, '2025-07-01', 'Present'),
		(11, '2025-07-02', 'Leave'),
		(12, '2025-07-01', 'Present'),
		(12, '2025-07-03', 'Present'),
		(13, '2025-07-01', 'Present'),
		(13, '2025-07-02', 'Leave'),
		(14, '2025-07-01', 'Present'),
		(14, '2025-07-02', 'Present'),
		(15, '2025-07-01', 'Present'),
		(15, '2025-07-03', 'Absent');
        
INSERT INTO leave_requests (employee_id, type, start_date, end_date, reason, leave_status)
VALUES  (1, 'Annual', '2025-08-05', '2025-08-10', 'Family road trip to Mpumalanga', 'Approved'),
		(2, 'Sick', '2025-07-28', '2025-07-30', 'Recovering from flu and fever', 'Pending'),
		(3, 'Study', '2025-09-01', '2025-09-03', 'Preparing for final exams', 'Approved'),
		(4, 'Unpaid', '2025-07-15', '2025-07-17', 'Moving house and setup delay', 'Rejected'),
		(5, 'Annual', '2025-08-15', '2025-08-19', 'Attending cousin’s wedding in EC', 'Pending'),
		(6, 'Sick', '2025-07-23', '2025-07-24', 'Migraine and rest required', 'Approved'),
		(7, 'Annual', '2025-08-10', '2025-08-15', 'Vacation leave for mental reset', 'Pending'),
		(8, 'Study', '2025-09-10', '2025-09-12', 'IT certification final prep', 'Approved'),
		(9, 'Annual', '2025-07-22', '2025-07-25', 'Long weekend in Drakensberg', 'Rejected'),
		(10, 'Unpaid', '2025-08-01', '2025-08-02', 'Transport issues and delays', 'Approved');
        
        
INSERT INTO departments (name, location)
VALUES  ('Human Resources', 'Cape Town'),
		('Human Resources', 'Osaka'),
		('Human Resources', 'Rome'),
		('Human Resources', 'Guadalajara'),
		('Human Resources', 'Mumbai'),
		('IT', 'Johannesburg'),
		('Marketing', 'London'),
		('Customer Service', 'Cairo'),
		('Finance', 'Shanghai'),
		('Marketing', 'Sydney'),
		('IT', 'Rio de Janeiro'),
		('IT', 'Singapore'),
		('Operations', 'Berlin'),
		('IT', 'Taipei'),
		('IT', 'New Delhi');
-- Only HR employees have the loging details        
INSERT INTO login (employee_id, password)
VALUES  (1, 'nomvula123'),
		(2, 'akira456'),
		(3, 'lucarossi'),
		(4, 'sofiaHR'),
		(5, 'arjun@India'); 
        
INSERT INTO performance (employee_id, review_date, score, remarks)
VALUES
(6, '2025-06-30', 15, 'Strong technical foundation, missed two sprint deadlines'),
(7, '2025-06-30', 16, 'Visual creativity is excellent, could improve team engagement'),
(8, '2025-06-30', 14, 'Positive client interactions, but slow ticket resolution'),
(9, '2025-06-30', 17, 'Consistent financial accuracy, proactive during audits'),
(10, '2025-06-30', 16, 'Creative messaging, quick turnaround on urgent campaigns'),
(11, '2025-06-30', 15, 'Reliable backend delivery, but occasional delays on deployments'),
(12, '2025-06-30', 18, 'Clean UI builds, great collaboration across teams'),
(13, '2025-06-30', 19, 'Outstanding data modeling and reporting clarity'),
(14, '2025-06-30', 16, 'Thorough testing coverage, needs improved bug documentation'),
(15, '2025-06-30', 17, 'Resolves system issues quickly, good root cause analysis');





