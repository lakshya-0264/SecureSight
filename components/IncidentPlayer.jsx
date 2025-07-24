"use client"
import { useState, useEffect } from "react"
import { CalendarDays, Disc, EllipsisVertical } from "lucide-react" // ✅ Uses Lucide calendar icon

export default function IncidentPlayer() {
  const cameraData = [
    { src: "/thumbnails/thumb1.png", label: "Camera - 01" },
    { src: "/thumbnails/thumb2.png", label: "Camera - 02" },
    { src: "/thumbnails/thumb3.png", label: "Camera - 03" },
  ]

  const [activeImage, setActiveImage] = useState(cameraData[0])
  const [currentTime, setCurrentTime] = useState(null)

  // useEffect(() => {
  //   const interval = setInterval(() => setCurrentTime(new Date()), 1000)
  //   return () => clearInterval(interval)
  // }, [])

  useEffect(() => {
    setCurrentTime(new Date())
  }, [])

  return (
    <div className="relative w-[60vw] h-[449px] rounded-md overflow-hidden">
      {/* Main Image */}
      <img
        src={activeImage.src}
        alt={activeImage.label}
        className="w-full h-full object-cover rounded-md"
      />

      {/* Top-left Date & Time Badge with Icon */}
      {currentTime && (
        <div className="absolute top-2 left-2 bg-black/80 text-white text-xs font-medium px-3 py-1 rounded-md flex items-center gap-2">
          <CalendarDays size={14} className="text-white" />
          {currentTime.toLocaleDateString("en-IN")} – {currentTime.toLocaleTimeString("en-IN", { hour12: false })}
        </div>
      )}

      {/* Bottom-left Camera Label with centered red dot */}
      <div className="absolute bottom-2 left-2 bg-black/90 text-white text-sm px-3 py-1 rounded-md flex items-center gap-2">
        <Disc size={14} className="text-red-500" />
        <span>{activeImage.label}</span>
      </div>

      {/* Bottom-right Thumbnails with Top Labels */}
      <div className="absolute bottom-2 right-2 flex gap-3">
        {cameraData
          .filter((img) => img.src !== activeImage.src)
          .map((item, index) => (
            <div key={index} className="flex flex-col items-center cursor-pointer">
              {/* Label Above Thumbnail */}
              <div className="w-[120px] bg-black/90 text-white text-xs font-medium rounded-t-md py-1 flex items-center justify-between px-2">
                <span className="truncate">{item.label}</span>
                <EllipsisVertical size={14} className="flex-shrink-0" />
            </div>

              {/* Thumbnail Image */}
              <div
                className="w-[120px] h-[84px] rounded-b-md overflow-hidden border-2 border-yellow-400 hover:scale-105 transition-transform"
                onClick={() => setActiveImage(item)}
              >
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
