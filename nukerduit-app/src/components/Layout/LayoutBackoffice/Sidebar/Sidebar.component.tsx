import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SidebarData, SidebarDataProps } from "./Sidebar.constants";
import { useAuthStore } from "@/stores/useAuthStore";
import Swal from 'sweetalert2';

type SidebarProps = {
  sidebarRef: React.ForwardedRef<HTMLDivElement>;
};

export default function Sidebar({ sidebarRef }: SidebarProps) {
  const location = useLocation();
  const { process, logOut } = useAuthStore();

  const handleLogout = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out of the application!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed)
        logOut();
    })
  };

  useEffect(() => {
    const handleProcessStatus = () => {
      if (process?.status === "success" && process?.type == "logout") {
        window.location.reload();
      }
    };
    handleProcessStatus();
  }, [process]);

  return (
    <div
      ref={sidebarRef}
      className="w-20 transition-all duration-200 group-[.sidebar-active]:w-80 group-[.sidebar-active]:xl:w-20 group-[.sidebar-active]:z-20 xl:w-[290px] fixed bg-white h-screen flex-col justify-between xl:flex ease-in z-0"
    >
      <div className="px-8 flex flex-col justify-between h-full">
        <div className="h-full w-full">
          <div className="h-16 w-full group-[.sidebar-active]:flex group-[.sidebar-active]:xl:hidden xl:flex items-center justify-center mt-4 hidden">
            <div className="text-3xl text-gray-800 font-bold">NukerDuit!</div>
          </div>
          <ul className="xl:mt-6 group-[.sidebar-active]:mt-10 group-[.sidebar-active]:xl:mt-20 mt-24">
            {SidebarData.map((item: SidebarDataProps, index: number) => (
              <React.Fragment key={index}>
                <li
                  className={`hover:xl:bg-blue-600  group-[.sidebar-active]:xl:bg-transparent group/nav_link__sidebar rounded-md transition-all ${
                    location.pathname === item.link
                      ? "group item_sidebar__active xl:bg-blue-600"
                      : ""
                  }`}
                >
                  <Link
                    className="flex items-center gap-4 line-height-1 my-2 py-3 xl:px-3 xl:py-[10px] group-[.sidebar-active]:px-3 group-[.sidebar-active]:py-4 group-[.sidebar-active]:xl:px-0 group-[.sidebar-active]:xl:py-3"
                    to={item?.link ?? ""}
                  >
                    <div className="hidden xl:block group-[.sidebar-active]:block group-[.sidebar-active]:xl:hidden">
                      <div
                        className={` group-hover/nav_link__sidebar:xl:text-white font-normal
                          ${location.pathname === item.link ? "text-white" : ""}
                        `}
                      >
                        {item.name}
                      </div>
                    </div>
                  </Link>
                </li>
              </React.Fragment>
            ))}
            <li
              onClick={() => handleLogout()}
              className={`hover:xl:bg-blue-600 cursor-pointer group-[.sidebar-active]:xl:bg-transparent group/nav_link__sidebar rounded-md transition-all group item_sidebar__active`}
            >
              <div className="flex items-center gap-4 line-height-1 my-2 py-3 xl:px-3 xl:py-[10px] group-[.sidebar-active]:px-3 group-[.sidebar-active]:py-4 group-[.sidebar-active]:xl:px-0 group-[.sidebar-active]:xl:py-3">
                <div className="hidden xl:block group-[.sidebar-active]:block group-[.sidebar-active]:xl:hidden">
                  <div
                    className={` group-hover/nav_link__sidebar:xl:text-white font-normal`}
                  >
                    Logout
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
