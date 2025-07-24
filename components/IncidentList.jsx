"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import {
  TriangleAlert,
  DoorOpen,
  Plus,
  UserSearch,
  CheckCheck,
  DoorOpen as UnauthorizedIcon,
  AlarmSmoke,
  Clock,
  Camera,
  ChevronRight,
  User
} from "lucide-react"

export default function IncidentList() {
  const [incidents, setIncidents] = useState([])
  const [resolvedCount, setResolvedCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [confirmingId, setConfirmingId] = useState(null)
  const [loadingResolved, setLoadingResolved] = useState(true)

  const fetchIncidents = async () => {
    setLoading(true)
    const res = await fetch("/api/incidents?resolved=false")
    const data = await res.json()
    setIncidents(data)
    setLoading(false)
  }

  const fetchResolvedIncidents = async () => {
    setLoadingResolved(true)
    const res = await fetch("/api/incidents?resolved=true")
    const data = await res.json()
    setResolvedCount(data.length)
    setLoadingResolved(false)
}


  useEffect(() => {
    fetchIncidents()
    fetchResolvedIncidents()
  }, [])

  const handleResolve = async (id) => {
    const newIncidents = incidents.filter((i) => i.id !== id)
    setIncidents(newIncidents)
    await fetch(`/api/incidents/${id}/resolve`, { method: "PATCH" })
    setResolvedCount((prev) => prev + 1)
  }

  const renderTypeIcon = (type) => {
    if (type.toLowerCase().includes("gun")) {
      return <GunIcon />
    } else if (type.toLowerCase().includes("face")) {
      return <User size={16} className="text-red-500" />
    } else if (type.toLowerCase().includes("fire")) {
        return <AlarmSmoke size={16} className="text-red-500" />
    }
    return <UnauthorizedIcon size={16} className="text-orange-400" />
  }

  return (
    <div className="w-[40vw] flex flex-col gap-[8px] text-white">
      {/* Header */}
      <div className="relative h-[48px] flex flex-row items-center px-4 gap-[8px]">
        <div className="w-6 h-6 rounded-full bg-[#7F1D1D] border-2 border-[#450A0A] flex items-center justify-center relative z-0">
          <TriangleAlert size={12} className="text-[#F87171]" />
        </div>

        <div className="flex flex-col">
          <h2 className="text-[18px] font-semibold text-[#FAFAFA] -tracking-tight">
            {incidents.length} Unresolved Incidents
          </h2>
        </div>

        <div className="absolute right-4 top-4 flex items-center">
          <div className="w-5 h-5 rounded-full bg-[#431407] flex items-center justify-center">
            <DoorOpen size={12} className="text-orange-400" />
          </div>
          <div className="-ml-[3px] w-5 h-5 rounded-full bg-[#450A0A] flex items-center justify-center">
            <Plus size={12} className="text-red-500" />
          </div>
          <div className="-ml-[3px] w-5 h-5 rounded-full bg-[#172554] flex items-center justify-center">
            <UserSearch size={12} className="text-blue-500" />
          </div>
          <div className="flex items-center px-2 py-[2px] bg-[#0B0B0B] border border-[#404040] rounded-full text-xs text-[#D4D4D4] shadow-sm gap-2 ml-[3px]">
            {loadingResolved ? (
                <div className="animate-pulse h-[10px] w-[50px] bg-gray-600 rounded-sm"></div>
            ) : (
                <>
                    <CheckCheck size={12} className="text-green-500" />
                    <span>{resolvedCount} resolved incidents</span>
                </>
            )}
          </div>
        </div>
      </div>

      {/* Incident Cards */}
      {loading ? (
        <div className="space-y-4 max-h-[394px] overflow-y-auto pr-2">
            {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-[16px] items-center animate-pulse">
                <div className="w-[120px] h-[68px] bg-gray-700 rounded-[6px]" />
                <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-700 rounded w-3/4" />
                <div className="h-3 bg-gray-700 rounded w-5/6" />
                <div className="h-3 bg-gray-700 rounded w-2/3" />
                </div>
                <div className="w-[60px] h-[20px] bg-gray-700 rounded-full" />
            </div>
            ))}
        </div>
      ) : (
        <div className="max-w-[39vw] max-h-[394px]">
        <div className="space-y-4 max-h-[394px] overflow-y-auto pr-2">
          {incidents.map((incident) => (
            <div
              key={incident.id}
              className="pt-[4px] pb-[4px] pl-[4px] pr-[12px] max-h-[75px] rounded-[6px] flex items-center gap-[16px] relative"
            >
              <Image
                src={incident.thumbnailUrl}
                alt={incident.type}
                width={120}
                height={68}
                className="rounded-[6px] border border-white/25 object-cover"
              />
              <div className="flex-1 flex flex-col justify-between h-[67px] text-white">
                <div className="flex items-center gap-[4px] text-sm font-bold">
                  {renderTypeIcon(incident.type)}
                  <span className="text-white text-[12px]">{incident.type}</span>
                </div>
                <div className="flex flex-col gap-[5px] text-white/90">
                    <div className="flex items-center h-[12px] gap-[4px] text-xs text-white/90">
                        <div><CameraIcon/></div>
                        <span className="text-[10px]">
                            {incident.camera.name} – {incident.camera.location}
                        </span>
                    </div>
                    <div className="flex items-center gap-[4px] text-xs text-white/80">
                        <Clock size={9} />
                        <span className="text-[10px]">
                            {new Date(incident.tsStart).toLocaleTimeString("en-IN", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false, // 24-hour format
                            })}{" "}
                            -{" "}
                            {new Date(incident.tsEnd).toLocaleTimeString("en-IN", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                            })}{" "}
                            on{" "}
                            {new Date(incident.tsEnd).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            })}
                        </span>
                    </div>
                </div>
            </div>
            <button
            onClick={() => setConfirmingId(incident.id)}
            className="ml-auto flex items-center gap-1 px-2 text-[#FFCC00] text-[10px] font-bold hover:text-yellow-400 transition"
            >
            Resolve <ChevronRight size={16} className="text-[#FFCC00]" />
            </button>

            {confirmingId === incident.id && (
            <div className="absolute bg-[#111] p-2 rounded shadow-lg z-50 right-2 bottom-1 text-xs w-[220px] h-[66px]">
                <div className="flex justify-between">
                <div className="text-white mt-1.5 font-bold mx-auto">Are you sure?</div>
                <button
                    onClick={() => setConfirmingId(null)}
                    className="text-white hover:text-red-500 text-lg font-bold"
                    aria-label="Close"
                >
                    ×
                </button>
                </div>
                
                <div className="flex justify-end gap-2">
                <button
                    className="px-2 py-1 bg-green-500 text-black rounded text-xs hover:bg-green-400 transition"
                    onClick={() => handleResolve(incident.id)}
                >
                    Yes, Resolve
                </button>
                <button
                    className="px-2 py-1 bg-gray-600/80 text-[#FFCC00] rounded text-xs hover:bg-gray-600 transition"
                    onClick={() => setConfirmingId(null)}
                >
                    Review Again
                </button>
                </div>
            </div>
            )}
            </div>
        ))}
        </div>
        </div>
    )}
    </div>
)
}


function CameraIcon() {
    return (
        <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.33902 2.83112L2.20945 0.142664C2.14878 0.115949 2.08339 0.101487 2.01706 0.100114C1.95074 0.0987409 1.8848 0.110484 1.82306 0.134664C1.76137 0.158955 1.70513 0.195192 1.65758 0.241278C1.61004 0.287365 1.57213 0.342386 1.54607 0.40316L0.0406464 3.9031C-0.011776 4.02497 -0.0134714 4.16259 0.0359333 4.28571C0.0853379 4.40882 0.181797 4.50734 0.304095 4.55959L3.79516 6.05007L3.17292 7.60005H1.00361V6.10007H0V10.1H1.00361V8.60003H3.17292C3.58591 8.60003 3.95173 8.35303 4.10428 7.97104L4.71748 6.44406L6.43316 7.17655C6.55492 7.22869 6.69243 7.23071 6.81568 7.18219C6.93893 7.13367 7.03792 7.03853 7.09103 6.91756L8.59645 3.48911C8.64971 3.36782 8.65252 3.23044 8.60426 3.10709C8.556 2.98374 8.46062 2.88449 8.33902 2.83112ZM8.99739 7.28605L8.06503 6.91506L9.06764 4.4151L10 4.78559L8.99739 7.28605Z" fill="white"/>
        </svg>
    )
}

function GunIcon() {
    return (
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.66668 3.63334H15.3333V6.30001H14.6667V6.96667H10.6667C10.4899 6.96667 10.3203 7.03691 10.1953 7.16194C10.0702 7.28696 10 7.45653 10 7.63334V8.30001C10 8.65363 9.85953 8.99277 9.60948 9.24282C9.35944 9.49287 9.0203 9.63334 8.66668 9.63334H6.41334C6.16001 9.63334 5.92668 9.78001 5.81334 10.0067L4.18001 13.2667C4.06668 13.4933 3.84001 13.6333 3.58668 13.6333H1.33334C1.33334 13.6333 -0.666658 13.6333 2.00001 9.63334C2.00001 9.63334 4.00001 6.96667 1.33334 6.96667V3.63334H2.00001L2.33334 2.96667H4.33334L4.66668 3.63334ZM9.33334 8.30001V7.63334C9.33334 7.45653 9.2631 7.28696 9.13808 7.16194C9.01306 7.03691 8.84349 6.96667 8.66668 6.96667H8.00001C8.00001 6.96667 7.33334 7.63334 8.00001 8.30001C7.64639 8.30001 7.30725 8.15953 7.0572 7.90948C6.80715 7.65944 6.66668 7.3203 6.66668 6.96667C6.48986 6.96667 6.3203 7.03691 6.19527 7.16194C6.07025 7.28696 6.00001 7.45653 6.00001 7.63334V8.30001C6.00001 8.47682 6.07025 8.64639 6.19527 8.77141C6.3203 8.89644 6.48986 8.96667 6.66668 8.96667H8.66668C8.84349 8.96667 9.01306 8.89644 9.13808 8.77141C9.2631 8.64639 9.33334 8.47682 9.33334 8.30001Z" fill="#EF4444"/>
        </svg>
    )
}