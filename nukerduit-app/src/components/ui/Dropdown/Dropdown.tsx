import clsx from "clsx";
import { useEffect, useRef } from "react";

type DropdownProps = {
  children?: React.ReactNode;
  className?: string;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  show?: boolean;
}

type DropdownItemProps = {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

function Dropdown({ children, className }: DropdownProps) {
  return <div className={clsx("dropdown relative", className)}>{children}</div>;
}

function DropdownToggle({ children, setShow, show }: DropdownProps) {
  const dropdownRef = useRef(null);

  const handleOutsideClick = (event: React.FormEvent<HTMLInputElement>) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !event?.target?.className?.includes("dropdown_menu") &&
      !event.target.className.includes("dropdown_item")
    )
      setShow(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const handleShow = () => {
    setShow(!show);
  };
  return (
    <div
      ref={dropdownRef}
      onClick={() => handleShow()}
      className="cursor-pointer"
    >
      {children}
    </div>
  );
}

function DropdownMenu({ children, className, show }: DropdownProps) {
  return show ? (
    <div
      className={clsx(
        "z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute dropdown_menu",
        className
      )}
    >
      <ul className="py-2 text-sm text-gray-700">{children}</ul>
    </div>
  ) : (
    ""
  );
}

function DropdownItem({ children, className, onClick }: DropdownItemProps) {
  return (
    <li
      onClick={onClick}
      className={clsx(
        "block px-4 py-2 hover:bg-gray-100 cursor-pointer dropdown_item",
        className
      )}
    >
      {children}
    </li>
  );
}

Dropdown.Toggle = DropdownToggle;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;

export { Dropdown };