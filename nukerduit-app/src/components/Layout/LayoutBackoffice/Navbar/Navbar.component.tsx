import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiSolidDownArrow } from "react-icons/bi";
import { Dropdown } from "@/components/ui/Dropdown/Dropdown";
import { useAuthStore, useSessionAuth } from "@/stores/useAuthStore";
import { useEffect } from "react";

type NavbarProps = {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Navbar({ setSidebarOpen }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const { sessionUser } = useSessionAuth();
  const { process, logOut } = useAuthStore();

  const handleLogout = async () => {
    logOut();
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
    <div className="bg-white py-5 fixed group-[.sidebar-active]:xl:w-[95%] xl:w-[80%] w-[95%] z-10">
      <div className="flex justify-between px-10">
        <div className="flex items-center gap-10">
          <div onClick={() => setSidebarOpen(true)} className="cursor-pointer">
            <RxHamburgerMenu className="text-2xl" />
          </div>
        </div>
        <div className="ms-auto">
          <Dropdown>
            <Dropdown.Toggle setShow={setDropdownOpen} show={dropdownOpen}>
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="text-gray-800 font-semibold">
                  {sessionUser?.user?.name}
                </div>
                <BiSolidDownArrow className="text-lg text-gray-400" />
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu show={dropdownOpen} className="right-0">
              <Dropdown.Item
                {...(process?.status === "loading" && process?.type === "logout"
                  ? { disabled: true }
                  : {
                      onClick: handleLogout,
                    })}
              >
                {process?.status === "loading" && process?.type === "logout"
                  ? "Loading..."
                  : "Sign Out"}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
