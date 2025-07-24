"use client";
import IncidentList from "@/components/IncidentList";
import IncidentPlayer from "@/components/IncidentPlayer";
import Navbar from "@/components/Navbar";
import ControlBar from "@/components/ControlBar";
import TimelineWidget from "@/components/TimelineWidget";
import Footer from "@/components/Footer";

export default function Home() {

  return (
    <>
      <Navbar />
      <main className="flex flex-col top-[76px] gap-[24px] p-[24px] ">
        <div className="flex-1 flex gap-[24px] h-[820px]">
          {/* Left section */}
          <IncidentPlayer/>
          {/* Right section */}
          <IncidentList/>
        </div>
        <div className="flex-1">
          <ControlBar />
        </div>
        <div className="flex-1">
          <TimelineWidget />
        </div>
      </main>
      <Footer/>
    </>
  );
}
