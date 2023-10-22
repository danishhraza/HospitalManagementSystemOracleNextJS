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
            </>
          )}
        </div>
      </div>
    </main>
  );
}
