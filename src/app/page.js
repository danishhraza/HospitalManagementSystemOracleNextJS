import Image from "next/image";
import Cards from "@/components/Cards";
import Cards2 from "@/components/Cards2";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const data = await getServerSession(authOptions);
  const userRole = data?.user?.role || null;
  console.log(userRole);
  return (
    <main className="">
      <div className="bg-[#F1F1F1] min-h-[90vh] py-[150px] px-[150px]">
        <div className="flex gap-4 flex-wrap justify-center">
          {(userRole === null || userRole === "patient") && (
            <>
              <Cards
                imageSrc="/images/appointment.png"
                title="Book Doctor's Appointment"
                buttonLabel="Book Now"
                buttonHref="/bookappointment"
              />
              <Cards
                imageSrc="/images/Doctor.png"
                title="Browse All Doctors"
                buttonLabel="Find Now"
                buttonHref="/doctors"
              />
              <Cards
                imageSrc="/images/Doctor.png"
                title="Affiliated Pharmacies"
                buttonLabel="Browse"
                buttonHref="/pharmacies"
              />
              <Cards
                imageSrc="/images/Doctor.png"
                title="Procedures"
                buttonLabel="Browse"
                buttonHref="/procedures"
              />
              <Cards
                imageSrc="/images/Doctor.png"
                title="Discontinued Procedures"
                buttonLabel="Browse"
                buttonHref="/discontinuedprocedures"
              />
              <Cards2
                imageSrc="/images/lookup.png"
                title="Lookup Your Appointment"
                buttonLabel="Lookup"
                buttonHref="/appointment"
              />
            </>
          )}
          {userRole === "patient" && (
            <>
              <Cards
                imageSrc="/images/history.png"
                title="View Previous Appointments"
                buttonLabel="View All"
                buttonHref="/myappointments"
              />
            </>
          )}
          {userRole === "doctor" && (
            <>
              <Cards
                imageSrc="/images/patient.png"
                title="Browse All Patients"
                buttonLabel="View All"
                buttonHref="/patients"
              />
              <Cards
                imageSrc="/images/lookup.png"
                title="My Appointments"
                buttonLabel="View All"
                buttonHref="/myappointmentsdoctor"
              />
              <Cards
                imageSrc="/images/lookup.png"
                title="Add Procedure"
                buttonLabel="Add"
                buttonHref="/addprocedure"
              />
              <Cards
                imageSrc="/images/lookup.png"
                title="Manage Procedures"
                buttonLabel="Manage"
                buttonHref="/manageprocedures"
              />
              <Cards
                imageSrc="/images/lookup.png"
                title="Update Appointments"
                buttonLabel="Update"
                buttonHref="/updateappointment"
              />
            </>
          )}
          {userRole === "admin" && (
            <>
              <Cards
                imageSrc="/images/patient.png"
                title="Add Doctor"
                buttonLabel="Add"
                buttonHref="/adddoctor"
              />
              <Cards
                imageSrc="/images/patient.png"
                title="Add Pharmacy"
                buttonLabel="Add"
                buttonHref="/addpharmacy"
              />
              <Cards
                imageSrc="/images/patient.png"
                title="Manage Pharmacy"
                buttonLabel="Manage"
                buttonHref="/managepharmacies"
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
