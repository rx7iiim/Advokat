"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // ✅ Get current URL
import styles from "./sidebar.module.css";
import UpgradePlanBanner from "../UpgradePlanBanner";

export default function Sidebar() {
  const pathname = usePathname(); 

 
  const username = useMemo(() => {
    const pathSegments = pathname.split("/"); 
    const usernameIndex = pathSegments.indexOf("user") + 1;
    return usernameIndex > 0 && pathSegments.length > usernameIndex ? pathSegments[usernameIndex] : null;
  }, [pathname]);

  if (!username) return <p>Loading Sidebar...</p>;

  return (
    <div className=" overflow-hidden flex fixed">
      <aside className={styles.sidebar}>
     
        <div className={styles.left}>
          <Link href={`/user/${username}/home`} className={styles.logo}>
            <Image src="/logobold.png" alt="our logo" width={200} height={100} />
          </Link>
        </div>

  
        <h2 className={styles.menuTitle}>MAIN MENU</h2>
        <ul className={styles.menuList}>
          {[
            { href: "home", icon: "/home.svg", label: "Home" },
            { href: "agenda", icon: "/agenda.svg", label: "Agenda" },
            { href: "clients", icon: "/client.svg", label: "Clients" },
            { href: "files", icon: "/file.svg", label: "Files" },
            { href: "lawyers", icon: "/lawyer.svg", label: "Lawyers" },
            { href: "dashboard", icon: "/dashbord.svg", label: "Dashboard" },
       

          ].map(({ href, icon, label }) => (
            <li key={href}>
              <Link
                href={`/user/${username}/${href}`}
                className={`${styles.menuItem} ${
                  pathname.startsWith(`/user/${username}/${href}`) ? styles.active : ""
                }`}
              >
                <Image src={icon} alt={label} width={20} height={20} />
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>

      
        <h2 className={styles.menuTitle}>OPENED FILES</h2>


        <div className={styles.upgradeCard}>
          <UpgradePlanBanner />
        </div>


        <div className={styles.profileSection}>
          <Image src="/sofia.png" alt="User Avatar" width={35} height={35} className={styles.profileAvatar} />
          <div className={styles.profileDetails}>
            <p className={styles.profileName}>{username}</p>
            <p className={styles.profileRole}>Independet lawyer</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
