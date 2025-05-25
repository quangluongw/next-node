"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import avatar from "../image/logo.png";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Link from "next/link";
import { logout } from "@/services/logout";
import { User } from "@/types/user";
export default function Header() {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("user") || "";

      setUser(JSON.parse(data));
    }
  }, []);
  const Logout = async () => {
    await logout();
  };
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
            <Link href="/login">Login</Link>
          </li>
          <li className="cursor-pointer hover:text-[#EBB12D]">
            <Link href="resume">Resume</Link>
          </li>

          <div className="flex flex-row gap-3">
            {user?.role && (
              <li className="cursor-pointer hover:text-[#EBB12D]">
                <Link href="/admin">Admin</Link>
              </li>
            )}
            <li className="cursor-pointer hover:text-[#EBB12D]">
              <div>{user?.username}</div>
            </li>
            <li
              className="cursor-pointer hover:text-[#EBB12D]"
              onClick={Logout}
            >
              <div>Logout</div>
            </li>
          </div>
        </div>
        <div className=" sm:hidden text-[1.4rem]">
          <FontAwesomeIcon icon={faBars} />
        </div>
      </nav>
    </header>
  );
}
