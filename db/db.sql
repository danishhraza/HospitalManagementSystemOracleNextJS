CREATE TABLE USERS (
  UserID NUMBER PRIMARY KEY,
  Email VARCHAR2(255) NOT NULL,
  Password VARCHAR2(255) NOT NULL,
  Role VARCHAR2(20) DEFAULT 'patient' NOT NULL
);

CREATE TABLE DOCTOR (
  UserID NUMBER NOT NULL,
  DoctorID NUMBER PRIMARY KEY,
  FirstName VARCHAR2(255) NOT NULL,
  LastName VARCHAR2(255) NOT NULL,
  Gender VARCHAR2(10) NOT NULL,
  ContactNumber VARCHAR2(11) NOT NULL,
  Specialization VARCHAR2(255) NOT NULL,
  CONSTRAINT FK_Doctor_User FOREIGN KEY (UserID) REFERENCES USERS(UserID)
);

CREATE TABLE PATIENT (
  UserID NUMBER NOT NULL,
  PatientID NUMBER PRIMARY KEY,
  FirstName VARCHAR2(255) NOT NULL,
  LastName VARCHAR2(255),
  Gender VARCHAR2(10) NOT NULL,
  DateOfBirth VARCHAR2(255) NOT NULL,
  ContactNumber VARCHAR2(11) NOT NULL,
  Address VARCHAR2(255) NOT NULL,
  CONSTRAINT FK_Patient_User FOREIGN KEY (UserID) REFERENCES USERS(UserID)
);


CREATE TABLE APPOINTMENT (
  AppointmentID NUMBER PRIMARY KEY,
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

CREATE TABLE DISCONTINUED_PROCEDURES (
  ProcedureID NUMBER PRIMARY KEY,
  ProcedureName VARCHAR2(100) NOT NULL,
  Description VARCHAR2(255),
  Price NUMBER,
  DoctorID NUMBER,
  DeletionDate DATE,
  FOREIGN KEY (DoctorID) REFERENCES DOCTOR(DoctorID)
);

CREATE OR REPLACE TRIGGER trg_backup_procedure
BEFORE DELETE ON PROCEDURE
FOR EACH ROW
BEGIN
  INSERT INTO DISCONTINUED_PROCEDURES (ProcedureID, ProcedureName, Description, Price, DoctorID, DeletionDate)
  VALUES (:old.ProcedureID, :old.ProcedureName, :old.Description, :old.Price, :old.DoctorID, SYSDATE);
END;
/



CREATE SEQUENCE seq_users_id
START WITH 1000
INCREMENT BY 1;

CREATE OR REPLACE TRIGGER trg_generate_user_id
BEFORE INSERT ON USERS
FOR EACH ROW
BEGIN
  IF :new.UserID IS NULL THEN
    SELECT seq_users_id.NEXTVAL INTO :new.UserID FROM dual;
  END IF;
END;
/

CREATE SEQUENCE seq_doctors_id
START WITH 2000
INCREMENT BY 1;

CREATE OR REPLACE TRIGGER trg_generate_doctor_id
BEFORE INSERT ON DOCTOR
FOR EACH ROW
BEGIN
  IF :new.DoctorID IS NULL THEN
    SELECT seq_doctors_id.NEXTVAL INTO :new.DoctorID FROM dual;
  END IF;
END;
/


CREATE SEQUENCE seq_patients_id
START WITH 3000
INCREMENT BY 1;

CREATE OR REPLACE TRIGGER trg_generate_patient_id
BEFORE INSERT ON PATIENT
FOR EACH ROW
BEGIN
  IF :new.PatientID IS NULL THEN
    SELECT seq_patients_id.NEXTVAL INTO :new.PatientID FROM dual;
  END IF;
END;
/



INSERT INTO USERS (Email, Password, Role)
VALUES ('admin@example.com', 'admin', 'admin');


SELECT * FROM USERS;
SELECT * FROM Doctor;
SELECT * FROM PATIENT;
SELECT * FROM APPOINTMENT;
SELECT * FROM PROCEDURE;
SELECT * FROM PHARMACY;
SELECT * FROM DISCONTINUED_PROCEDURES;


-- INSERT INTO USERS (Email, Password, Role)
-- VALUES ('doctor3@example.com', 'doctorpass', 'doctor');

-- INSERT INTO USERS (Email, Password, Role)
-- VALUES ('patient@example.com', 'patientpass');

-- Insert dummy data for a doctor
-- INSERT INTO DOCTOR (FirstName, LastName, Gender, ContactNumber, Specialization, UserID)
-- VALUES ('John', 'Doe', 'Male', '55512345567', 'Cardiologist', 4);

-- Insert dummy data for a patient
-- INSERT INTO PATIENT (FirstName, LastName, Gender, DateOfBirth, ContactNumber, Address, UserID)
-- VALUES ('Jane', 'Smith', 'Female', TO_DATE('1985-03-22', 'YYYY-MM-DD'), '9876543210', '456 Elm St', 2);

-- INSERT INTO APPOINTMENT (PatientID, DoctorID, AppointmentDate, Status)
-- VALUES (41, 2, TO_DATE('2024-11-15', 'YYYY-MM-DD'), 'Pending Approval');

-- INSERT INTO PROCEDURE (ProcedureName, Description, Price, DoctorID)
-- VALUES ('Eye Examination', 'Comprehensive eye examination', 60, 23);

-- INSERT INTO PHARMACY (PharmacyName, Location, ContactNumber)
-- VALUES ('Best Meds', '789 Maple Drive', '555-9876');

-- DELETE FROM USERS
-- WHERE UserID = 2;

-- DELETE FROM PATIENT
-- WHERE UserID = 66;

-- DELETE FROM DOCTOR
-- WHERE UserID = 1;


-- DROP TABLE PROCEDURE;
-- DROP TABLE PHARMACY;
-- DROP TABLE APPOINTMENT;
-- DROP TABLE DOCTOR;
-- DROP TABLE PATIENT;
-- DROP TABLE USERS;


-- DROP SEQUENCE seq_users_id;
-- DROP SEQUENCE seq_doctors_id;
-- DROP SEQUENCE seq_patients_id;





