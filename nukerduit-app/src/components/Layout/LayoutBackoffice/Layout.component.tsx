import { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar/Navbar.component";
import Sidebar from "./Sidebar/Sidebar.component";

type Layout = {
  children: React.ReactNode;
}

type OutsideClickHandler = (event: MouseEvent) => void;

function LayoutDashboard({ children }: Layout) {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleOutsideClick: OutsideClickHandler = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick, true);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick, true);
    };
  }, [handleOutsideClick]);

  return (
    <div
      className={`flex flex-no-wrap min-h-screen bg-gray-100 w-full ${
        sidebarOpen ? "group sidebar-active" : ""
      }`}
    >
      <Sidebar sidebarRef={sidebarRef} />
      <div className="page_container w-full xl:pl-72 pl-20 group-[.sidebar-active]:xl:pl-20">
        <Navbar setSidebarOpen={setSidebarOpen} />
        <div className="container w-full h-full mx-auto py-24 min-h-screen px-10 group-[.sidebar-active]:xl:px-0">
          {children}
        </div>
      </div>
    </div>
  );
}

export default LayoutDashboard;
