CREATE TABLE USERS (
  UserID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  Email VARCHAR2(255) NOT NULL,
  Password VARCHAR2(255) NOT NULL,
  Role VARCHAR2(20) DEFAULT 'patient' NOT NULL
);

CREATE TABLE DOCTOR (
  UserID NUMBER NOT NULL,
  DoctorID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  FirstName VARCHAR2(255) NOT NULL,
  LastName VARCHAR2(255) NOT NULL,
  Gender VARCHAR2(10) NOT NULL,
  ContactNumber VARCHAR2(11) NOT NULL,
  Specialization VARCHAR2(255) NOT NULL,
  CONSTRAINT FK_Doctor_User FOREIGN KEY (UserID) REFERENCES USERS(UserID)
);

CREATE TABLE PATIENT (
  UserID NUMBER NOT NULL,
  PatientID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  FirstName VARCHAR2(255) NOT NULL,
  LastName VARCHAR2(255),
  Gender VARCHAR2(10) NOT NULL,
  DateOfBirth VARCHAR2(255) NOT NULL,
  ContactNumber VARCHAR2(11) NOT NULL,
  Address VARCHAR2(255) NOT NULL,
  CONSTRAINT FK_Patient_User FOREIGN KEY (UserID) REFERENCES USERS(UserID)
);


CREATE TABLE APPOINTMENT (
  AppointmentID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  PatientID NUMBER NOT NULL,
  DoctorID NUMBER NOT NULL,
  AppointmentDate DATE NOT NULL,
  Status VARCHAR2(20) DEFAULT 'Pending Approval' CHECK (Status IN ('Pending Approval', 'Confirmed', 'Completed', 'Canceled', 'Missed')),
  MedicationPrescribed VARCHAR2(255),
  DoctorNotes VARCHAR2(255),
  FOREIGN KEY (PatientID) REFERENCES PATIENT(PatientID),
  FOREIGN KEY (DoctorID) REFERENCES DOCTOR(DoctorID)
);


CREATE TABLE PHARMACY (
  PharmacyID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  PharmacyName VARCHAR2(255) NOT NULL,
  Location VARCHAR2(255) NOT NULL,
  ContactNumber VARCHAR2(11) NOT NULL
);


CREATE TABLE PROCEDURE (
  ProcedureID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ProcedureName VARCHAR2(100) NOT NULL UNIQUE,
  Description VARCHAR2(255),
  Price NUMBER,
  DoctorID NUMBER NOT NULL,
  FOREIGN KEY (DoctorID) REFERENCES DOCTOR(DoctorID)
);

INSERT INTO USERS (Email, Password, Role)
VALUES ('doctor3@example.com', 'doctorpass', 'doctor');

INSERT INTO USERS (Email, Password, Role)
VALUES ('admin@example.com', 'admin', 'admin');

INSERT INTO USERS (Email, Password, Role)
VALUES ('patient@example.com', 'patientpass');

-- Insert dummy data for a doctor
INSERT INTO DOCTOR (FirstName, LastName, Gender, ContactNumber, Specialization, UserID)
VALUES ('John', 'Doe', 'Male', '55512345567', 'Cardiologist', 4);

-- Insert dummy data for a patient
INSERT INTO PATIENT (FirstName, LastName, Gender, DateOfBirth, ContactNumber, Address, UserID)
VALUES ('Jane', 'Smith', 'Female', TO_DATE('1985-03-22', 'YYYY-MM-DD'), '9876543210', '456 Elm St', 2);

INSERT INTO APPOINTMENT (PatientID, DoctorID, AppointmentDate, Status)
VALUES (41, 2, TO_DATE('2024-11-15', 'YYYY-MM-DD'), 'Pending Approval');

INSERT INTO PROCEDURE (ProcedureName, Description, Price, DoctorID)
VALUES ('Eye Examination', 'Comprehensive eye examination', 60, 3);

INSERT INTO PHARMACY (PharmacyName, Location, ContactNumber)
VALUES ('Best Meds', '789 Maple Drive', '555-9876');


SELECT * FROM USERS;
SELECT * FROM Doctor;
SELECT * FROM PATIENT;
SELECT * FROM APPOINTMENT;
SELECT * FROM PROCEDURE;


DELETE FROM USERS
WHERE UserID = 2;

DELETE FROM PATIENT
WHERE UserID = 66;

DELETE FROM DOCTOR
WHERE UserID = 1;

DROP TABLE DOCTOR;
DROP TABLE PATIENT;
DROP TABLE APPOINTMENT;




