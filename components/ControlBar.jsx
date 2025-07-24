"use client";
import { Play, Rewind, FastForward, Circle, Pause } from "lucide-react";

const currentTime = new Date();
const formattedTime =
  currentTime.toLocaleTimeString("en-IN", { hour12: false }) +
  " (" + currentTime.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric"}) + ")";


export default function ControlBar({
  time =  formattedTime,
  speed = "1x",
}) {
  
  const btn = "flex justify-center items-center p-[2px] rounded-[6px] bg-transparent hover:bg-[#232323] transition-colors duration-75";

  return (
    <div
      className="w-full max-w-[1392px] h-[44px] flex flex-row items-center justify-between px-4 bg-[#131313] rounded-[6px]"
      style={{
        minWidth: 0,
        gap: 0,
        margin: "0 auto",
      }}
    >
      {/* Left Section */}
      <div className="flex flex-row items-center gap-[16px] min-w-[388px] h-[36px]">
        <button type="button" className={btn} aria-label="Skip back">
            <VideoBackButton/>
        </button>
        <button type="button" className={btn} aria-label="Step back">
            <LoopButton/>
        </button>
        <button
          className="flex justify-center items-center p-[2px] rounded-[6px] bg-transparent hover:bg-[#232323] transition-colors duration-75"
          style={{ width: 36, height: 36 }}
          aria-label="Play"
        >
          <svg width={32} height={32} viewBox="0 0 32 32">
            <circle cx={16} cy={16} r={16} fill="#FFF" />
            <polygon
              points="13,10 23,16 13,22"
              fill="#131313"
            />
          </svg>
        </button>
        <button type="button" className={btn} aria-label="Step forward">
          <LoopButton/>
        </button>
        <button type="button" className={btn} aria-label="Skip forward">
          <VideoForwardButton/>
        </button>
        
        <span
          className="ml-4 font-['Plus_Jakarta_Sans'] text-xs leading-4 text-white"
          style={{ fontSize: 12, height: 16, width: 132 }}
        >
          {time}
        </span>
        {/* Speed */}
        <span
          className="ml-4 font-['DM_Sans'] text-xs leading-4 text-white flex items-center gap-2"
          style={{ width: 44, height: 20 }}
        >
          <span>{speed}</span> <span><SpeedIcon /></span>
        </span>
      </div>
      <div className="flex flex-row items-center gap-[16px] h-[20px]" />
    </div>
  );
}

function VideoBackButton() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.33333 14.6667V5.33335M14.6667 15.3334L8 10L14.6667 4.66669V15.3334Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

function LoopButton(){
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.66667 4.99998L10 3.33331C6.318 3.33331 3.33334 6.31798 3.33334 9.99998C3.33334 13.682 6.318 16.6666 10 16.6666C13.682 16.6666 16.6667 13.682 16.6667 9.99998C16.6667 7.26665 15.0213 4.91665 12.6667 3.88798" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 8.99996L8.66667 7.66663V12.3333" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.3333 11.1666V8.83329C10.3333 8.52387 10.4563 8.22713 10.675 8.00833C10.8938 7.78954 11.1906 7.66663 11.5 7.66663C11.8094 7.66663 12.1062 7.78954 12.325 8.00833C12.5438 8.22713 12.6667 8.52387 12.6667 8.83329V11.1666C12.6667 11.476 12.5438 11.7728 12.325 11.9916C12.1062 12.2104 11.8094 12.3333 11.5 12.3333C11.1906 12.3333 10.8938 12.2104 10.675 11.9916C10.4563 11.7728 10.3333 11.476 10.3333 11.1666Z" stroke="white" strokeLinecap="round"/>
        </svg>
    )
}

function VideoForwardButton() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.6667 5.33335V14.6667M5.33333 4.66669L12 10L5.33333 15.3334V4.66669Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

function SpeedIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 2.83301C13.9581 2.83301 17.1669 6.04197 17.167 10C17.1668 13.958 13.958 17.166 10 17.166L9.5918 17.1553C9.18655 17.1325 8.78931 17.0758 8.4043 16.9883L8.51562 16.501L8.62598 16.0127C8.95665 16.0879 9.29837 16.1366 9.64746 16.1562L10 16.166C13.4057 16.166 16.1668 13.4057 16.167 10C16.1669 6.59425 13.4058 3.83301 10 3.83301C9.52752 3.83303 9.06704 3.88606 8.62598 3.98633L8.51562 3.49902L8.4043 3.01172C8.9176 2.89503 9.45243 2.83303 10 2.83301ZM8.62598 16.0127L8.4043 16.9883C8.13542 16.9268 7.96716 16.6587 8.02832 16.3896C8.08961 16.1208 8.35706 15.952 8.62598 16.0127ZM4.08789 13.124C4.3214 12.9771 4.63012 13.047 4.77734 13.2803C5.20892 13.9657 5.77192 14.5609 6.43066 15.0293L6.71875 15.2227L6.79883 15.2842C6.96682 15.445 7.00372 15.7076 6.875 15.9121C6.72774 16.1454 6.41906 16.2154 6.18555 16.0684C5.27576 15.4954 4.50354 14.7233 3.93066 13.8135C3.78387 13.5799 3.85442 13.2711 4.08789 13.124ZM7.5 8.14258C7.50004 7.19333 8.49786 6.48454 9.38281 7.00586H9.38379L12.5303 8.86328L12.6797 8.96582C13.329 9.48333 13.3287 10.5155 12.6797 11.0332L12.5303 11.1367L9.38379 12.9941L9.38281 12.9951C8.55266 13.484 7.6246 12.8898 7.51172 12.0322L7.5 11.8574V8.14258ZM8.875 7.86719C8.79465 7.82 8.71273 7.82543 8.63965 7.87109C8.56419 7.91831 8.50002 8.01036 8.5 8.14258V11.8574L8.51074 11.9492C8.53232 12.0333 8.58291 12.0944 8.63965 12.1299C8.71292 12.1757 8.79478 12.18 8.875 12.1328L12.0215 10.2754L12.0811 10.2275C12.1343 10.1716 12.166 10.0926 12.166 10C12.166 9.90737 12.1343 9.8284 12.0811 9.77246L12.0215 9.72461L8.875 7.86719ZM3.60938 8.02832C3.87847 8.0895 4.04721 8.35688 3.98633 8.62598C3.88606 9.06706 3.83303 9.5275 3.83301 10C3.83303 10.4724 3.88611 10.9321 3.98633 11.373C4.04751 11.6423 3.87863 11.9105 3.60938 11.9717C3.34034 12.0325 3.07296 11.8637 3.01172 11.5947C2.89507 11.0815 2.83303 10.5475 2.83301 10C2.83303 9.45241 2.89502 8.91762 3.01172 8.4043C3.07317 8.13557 3.34049 7.96749 3.60938 8.02832ZM4.77734 6.71875C4.63021 6.95243 4.32157 7.02213 4.08789 6.875C3.85449 6.72778 3.7836 6.41911 3.93066 6.18555L4.77734 6.71875ZM6.18555 3.93066C6.41911 3.7836 6.72778 3.85448 6.875 4.08789C7.02213 4.32157 6.95243 4.63021 6.71875 4.77734C5.93541 5.2706 5.27059 5.93541 4.77734 6.71875L4.35449 6.45215L3.93066 6.18555C4.50361 5.27566 5.27567 4.50362 6.18555 3.93066ZM8.62598 3.98633C8.3569 4.04716 8.08949 3.87845 8.02832 3.60938C7.96746 3.3405 8.13559 3.0732 8.4043 3.01172L8.62598 3.98633Z" fill="white"/>
    </svg>
  )
}
