"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import avatar from "../../../image/logo.png";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { logout } from "@/services/logout";
// import { useRouter } from "next/navigation";
// import { initAccessToken } from "@/lib/utils";
export default function Header() {
  const Logout= async ()=>{
    await logout();
  }
//   const router = useRouter();

//   useEffect(() => {
//     (async () => {
//       const token = await initAccessToken();
//       if (!token) {
//         router.push("/login");
//       }
//     })();
//   }, [router]);
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
            <Link href="/admin/">Product </Link>
          </li>
   
            <div className="flex flex-row gap-3">

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
