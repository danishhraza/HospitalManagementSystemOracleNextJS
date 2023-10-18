import Image from "next/image";
import Cards from "@/components/Cards";
import Cards2 from "@/components/Cards2";

export default function Home() {
  return (
    <main className="">
      <div className="bg-[#F1F1F1] min-h-[90vh] py-[150px] px-[150px]">
        <div className="flex gap-4 flex-wrap justify-center">
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
          <Cards
            imageSrc="/images/history.png"
            title="View Previous Appointments"
            buttonLabel="View All"
            buttonHref="/myappointments"
          />
          <Cards
            imageSrc="/images/patient.png"
            title="Browse All Patients"
            buttonLabel="View All"
            buttonHref="/patients"
          />
        </div>
      </div>
    </main>
  );
}
