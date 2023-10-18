CREATE TABLE DOCTOR (
  DoctorID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  FirstName VARCHAR2(255) NOT NULL,
  LastName VARCHAR2(255) NOT NULL,
  Gender VARCHAR2(10) NOT NULL,
  Email VARCHAR2(255) NOT NULL,
  Password VARCHAR2(255) NOT NULL,
  ContactNumber VARCHAR2(11) NOT NULL,
  Specialization VARCHAR2(255) NOT NULL
);

CREATE TABLE PATIENT (
  PatientID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  FirstName VARCHAR2(255),
  LastName VARCHAR2(255) NOT NULL,
  Gender VARCHAR2(10),
  Email VARCHAR2(255) NOT NULL,
  Password VARCHAR2(255) NOT NULL,
  DateOfBirth DATE,
  ContactNumber VARCHAR2(11) NOT NULL,
  Address VARCHAR2(255) NOT NULL
);




CREATE TABLE APPOINTMENT (
  AppointmentID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  PatientID NUMBER NOT NULL,
  DoctorID NUMBER NOT NULL,
  AppointmentDate DATE NOT NULL,
  Status VARCHAR2(20) NOT NULL CHECK (Status IN ('Pending Approval', 'Confirmed', 'Completed', 'Canceled', 'Missed')),
  MedicationPrescribed VARCHAR2(255),
  DoctorNotes VARCHAR2(255),
  FOREIGN KEY (PatientID) REFERENCES PATIENT(PatientID),
  FOREIGN KEY (DoctorID) REFERENCES DOCTOR(DoctorID)
);



INSERT INTO Doctor (FirstName, LastName, Gender, Email, Password, ContactNumber, Specialization)
VALUES ('John', 'Doe', 'Male', 'doctor@gmail.com', 'password', '55512345567', 'Cardiologist');



-- Inserting dummy values into the PATIENT table
INSERT INTO PATIENT (FirstName, LastName, Gender, Email, Password, DateOfBirth, ContactNumber, Address)
VALUES
  ('Jane', 'Smith', 'Female', 'jane.smith@example.com', 'securepass', TO_DATE('1985-03-22', 'YYYY-MM-DD'), '9876543210', '456 Elm St');


-- Inserting dummy values into the APPOINTMENT table
INSERT INTO APPOINTMENT (PatientID, DoctorID, AppointmentDate, Status, MedicationPrescribed, DoctorNotes)
VALUES
  (1, 21, TO_DATE('2023-11-10', 'YYYY-MM-DD'), 'Confirmed', 'Ibuprofen', 'No specific instructions');



SELECT * FROM Doctor;
SELECT * FROM APPOINTMENT;
SELECT * FROM PATIENT;

SELECT * FROM APPOINTMENT WHERE PatientID = 1;

DROP TABLE DOCTOR;
DROP TABLE PATIENT;
DROP TABLE APPOINTMENT;




