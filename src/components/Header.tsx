"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import {
  faMoon as faSolidMoon,
  faSun as faSolidSun,
} from "@fortawesome/free-solid-svg-icons";
import avatar from "../image/logo.png";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Link from "next/link";
import { logout } from "@/services/logout";
export default function Header() {
  // const data: string | null = localStorage.getItem(
  //   "sb-mqaesyeqvgxzzdgcyspw-auth-token"
  // );  
  // const user = data ? JSON.parse(data) : null;
  // Lấy giá trị refreshToken
  
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  const Logout= async ()=>{
    await logout();
  }
  return (
    <header>
      <nav className="flex gap-4 justify-between items-center">
        <li>
          <Link href="/">
            <Image
              src={avatar}
              alt="Ảnh đại diện"
              width={50}
              height={50}
              className="rounded-lg"
            />
          </Link>
        </li>
        <div className="hidden sm:flex items-center gap-4">
          <li className="cursor-pointer hover:text-[#EBB12D]">
            <Link href="login">Login</Link>
          </li>
          <li className="cursor-pointer hover:text-[#EBB12D]">
            <Link href="resume">Resume</Link>
          </li>
   
            <div className="flex flex-row gap-3">
              <li className="cursor-pointer hover:text-[#EBB12D]">
                <Link href="admin">Admin</Link>
              </li>
              <li
                className="cursor-pointer hover:text-[#EBB12D]"
                onClick={Logout}
              >
                <div>Logout</div>
              </li>
            </div>
            

          <li onClick={toggleTheme} className="cursor-pointer">
            {theme === "light" ? (
              <FontAwesomeIcon icon={faSolidSun} />
            ) : (
              <FontAwesomeIcon icon={faSolidMoon} />
            )}
          </li>
        </div>
        <div className=" sm:hidden text-[1.4rem]">
          <FontAwesomeIcon icon={faBars} />
        </div>
      </nav>
    </header>
  );
}
