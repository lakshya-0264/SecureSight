"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Camera, Lock, CheckCircle, Car, AlertTriangle, Siren, DoorOpen as UnauthorizedIcon, Users, UserSearch,} from 'lucide-react';

const TimelineWidget = () => {
  const [currentTime, setCurrentTime] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const timelineRef = useRef(null);
  const rulerRef = useRef(null);

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const staticTimeInHours = hours + minutes / 60 + seconds / 3600;
    setCurrentTime(staticTimeInHours);
  }, []);

const drawRuler = () => {
  const canvas = rulerRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Set display width correctly
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  // Clear and fill background
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#131313";
  ctx.fillRect(0, 0, width, height);

  // Time configuration
  const totalMinutes = 24 * 60;
  const pxPerMin = width / totalMinutes;

  for (let i = 0; i <= totalMinutes; i += 5) {
    const x = i * pxPerMin;
    const isHour = i % 60 === 0;

    // Tick
    ctx.beginPath();
    ctx.moveTo(x, height);
    ctx.lineTo(x, isHour ? height - 20 : height - 10);
    ctx.strokeStyle = isHour ? "#aaa" : "#666";
    ctx.lineWidth = isHour ? 1 : 0.5;
    ctx.stroke();

    // Label
    if (isHour) {
      const hour = String(i / 60).padStart(2, "0");
      ctx.fillStyle = "#aaa";
      ctx.font = "10px 'Segoe UI', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`${hour}:00`, x, 12);
    }
  }
};

useEffect(() => {
  const drawAndResize = () => drawRuler();
  drawAndResize();
  window.addEventListener("resize", drawAndResize);
  return () => window.removeEventListener("resize", drawAndResize);
}, []);

  // Incident data with positions and types
  const incidents = [
    // Camera 1
    { id: 1, camera: 1, type: 'unauthorized', position: 11.5, time: '02:02', label: 'Unauthorised Access' },
    { id: 2, camera: 1, type: 'face', position: 35.2, time: '14:45', label: 'Face Recognised' },
    { id: 3, camera: 1, type: 'multiple', position: 65, time: '20:24', label: '4 Multiple Events' },
    { id: 4, camera: 1, type: 'gun', position: 92, time: '22:48', label: 'Gun Threat' },
    
    // Camera 2
    { id: 5, camera: 2, type: 'unauthorized', position: 6.8, time: '01:38', label: 'Unauthorised Access' },
    { id: 6, camera: 2, type: 'face', position: 72, time: '17:17', label: 'Face Recognised' },
    
    // Camera 3
    { id: 7, camera: 3, type: 'traffic', position: 25, time: '06:00', label: 'Traffic congestion' },
    { id: 8, camera: 3, type: 'unauthorized', position: 88, time: '21:07', label: 'Unauthorised Access' }
  ];

  const hoursToTimeString = (hours) => {
    const h = Math.floor(hours);
    const m = Math.floor((hours - h) * 60);
    const s = Math.floor(((hours - h) * 60 - m) * 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Handle scrubber dragging
  const handleMouseDown = (e) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !timelineRef.current) return;
    
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - 150;
    const maxX = rect.width - 150;
    const clampedX = Math.max(0, Math.min(x, maxX));
    
    const hours = (clampedX / maxX) * 24;
    setCurrentTime(hours);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle timeline click
  const handleTimelineClick = (e) => {
    if (!timelineRef.current) return;
    
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - 150;
    const maxX = rect.width - 150;
    const clampedX = Math.max(0, Math.min(x, maxX));
    
    const hours = (clampedX / maxX) * 24;
    setCurrentTime(hours);
  };

  // Handle incident click
  const handleIncidentClick = (incident, e) => {
    e.stopPropagation();
    const hours = (incident.position / 100) * 24;
    setCurrentTime(hours);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const getIncidentIcon = (type) => {
    switch (type) {
      case 'unauthorized': return <UnauthorizedIcon className="w-3 h-3" />;
      case 'face': return <UserSearch className="w-3 h-3" />;
      case 'traffic': return <Users className="w-3 h-3" />;
      case 'gun': return <Siren className="w-3 h-3" />;
      case 'multiple': return <AlertTriangle className="w-3 h-3" />;
      default: return <AlertTriangle className="w-3 h-3" />;
    }
  };

  const getIncidentStyles = (type) => {
    switch (type) {
      case 'unauthorized': return 'bg-[#431407] border-[#F97316] text-white';
      case 'face': return 'bg-[#172554] border-[#3B82F6] text-white';
      case 'traffic': return 'bg-[#042F2E] border-[#14B8A6] text-white';
      case 'gun': return 'bg-[#450A0A] border-[#F43F5E] text-white';
      case 'multiple': return 'bg-[#1C1917] border-[#D6D3D1] text-white';
      default: return 'bg-[#431407] border-[#F97316] text-white';
    }
  };

  const currentTimePercentage = (currentTime / 24) * 100;

  return (
    <div className="w-full h-[246px] bg-[#131313] rounded-md flex flex-row justify-between items-start p-0 relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-[#131313] flex items-center px-5 z-20">
        <div className="text-white font-medium w-[150px]">Camera List</div>
        {/* Canvas Ruler */}
        <canvas
          ref={rulerRef}
          className="absolute left-[160px] top-0 right-0 h-[40px] bg-[#131313] z-10 w-[calc(100%-150px)]"
        />
      </div>

      {/* Camera List */}
      <div className="absolute left-0 top-10 bottom-0 w-[150px] bg-[#131313] z-10">
        {[1,2,3].map((camera) => (
          <div key={camera} className={`flex items-center gap-2 px-4 h-[65.33px] ${camera === 1 ? 'bg-[#2a2a2a]' : 'bg-[#131313]'}`}>
            <CameraIcon/>
            <span className="text-white text-sm">Camera - {camera.toString().padStart(2, '0')}</span>
          </div>
        ))}
      </div>

      {/* Timeline Area */}
      <div 
        ref={timelineRef}
        className="absolute left-[150px] top-10 right-0 bottom-0 cursor-pointer"
        onClick={handleTimelineClick}
      >

        {/* Camera Tracks */}
        <div className="absolute top-0 left-0 right-0 bottom-0">
          {[1, 2, 3].map((camera) => (
            <div key={camera} className={`relative h-[65.33px] ${camera === 1 ? 'bg-[#2a2a2a]' : 'bg-[#131313]'}`}>
              {/* Incidents for this camera */}
              {incidents
                .filter(incident => incident.camera === camera)
                .map((incident) => (
                  <div
                    key={incident.id}
                    className={`absolute h-6 px-2 top-[20px] rounded-md text-[10px] flex items-center gap-1 cursor-pointer transition-transform hover:scale-105 border-l-2 ${getIncidentStyles(incident.type)}`}
                    style={{ left: `${incident.position}%` }}
                    onClick={(e) => handleIncidentClick(incident, e)}
                    title={`${incident.label} - ${incident.time}`}
                  >
                    {getIncidentIcon(incident.type)}
                    <span className="whitespace-nowrap">{incident.label}</span>
                    {incident.type === 'face' && incident.time && (
                      <span className="ml-1">{incident.time}</span>
                    )}
                    {incident.type === 'multiple' && (
                      <span className="ml-1">△</span>
                    )}
                  </div>
                ))}
            </div>
          ))}
        </div>

        {/* Current Time Indicator */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-amber-400 pointer-events-none z-15"
          style={{ left: `${currentTimePercentage}%` }}
        />

        {/* Timeline Scrubber */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-[#ff6b35] cursor-ew-resize z-20"
          style={{ left: `${currentTimePercentage}%` }}
          onMouseDown={handleMouseDown}
        >
          <div className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 bg-[#ff6b35] rounded-full cursor-ew-resize" />
          <div className="absolute -top-8 -left-5 bg-black/80 text-white px-2 py-1 rounded text-[11px] whitespace-nowrap">
            {hoursToTimeString(currentTime)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineWidget;


function CameraIcon(){
  return(
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.02 8.02003L5.35333 10.3334L3.66667 12.4534L1.33333 8.41336L4.02 8.02003ZM11.3333 12V10.1934C11.92 9.93336 12.3333 9.35336 12.3333 8.6667C12.3333 8.2867 12.2 7.93336 11.98 7.6667L13.2933 6.90003C13.9667 6.5067 14.2 5.6467 13.8067 4.97336L12.8867 3.37336C12.6991 3.05004 12.3913 2.81395 12.0304 2.71655C11.6695 2.61914 11.2848 2.66832 10.96 2.85336L5.54 6.00003C4.90667 6.35336 4.68667 7.1667 5.05333 7.8067L6.05333 9.54003C6.42 10.1734 7.24 10.3934 7.87333 10.0267L9.12667 9.3067C9.29333 9.70003 9.60667 10.02 10 10.1934V12C10 12.7334 10.6 13.3334 11.3333 13.3334H14.6667V12H11.3333Z" fill="white"/>
    </svg>
  )
}