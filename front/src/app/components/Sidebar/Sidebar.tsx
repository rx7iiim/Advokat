'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation'; // ✅ Get current URL
import styles from './sidebar.module.css'; 
import UpgradePlanBanner from '../UpgradePlanBanner';

export default function Sidebar() {
  const pathname = usePathname(); // ✅ Get current path

  // ✅ Extract the username from the path
  const pathSegments = pathname.split('/'); // Split by "/"
  const usernameIndex = pathSegments.indexOf('user') + 1; // Get index after "user"
  const username = usernameIndex > 0 && pathSegments.length > usernameIndex ? pathSegments[usernameIndex] : null;

  if (!username) {
    return <p>Loading Sidebar...</p>; // Handle missing username
  }

  return (
    <div className='fixed'>
      <aside className={styles.sidebar}>
        {/* Logo Section */}
        <div className={styles.left}>
          <Link href={`/user/${username}/home`} className={styles.logo}>
            <Image src="/logobold.png" alt="our logo" width={200} height={100} />
          </Link>
        </div>

        {/* Menu Section */}
        <h2 className={styles.menuTitle}>MAIN MENU</h2>
        <ul className={styles.menuList}>
          <li>
            <Link 
              href={`/user/${username}/home`} 
              className={`${styles.menuItem} ${pathname === `/user/${username}/home` ? styles.active : ''}`}
            >
              <Image src="/Vector.png" alt="Home" width={20} height={20} />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link 
              href={`/user/${username}/agenda`} 
              className={`${styles.menuItem} ${pathname === `/user/${username}/agenda` ? styles.active : ''}`}
            >
              <Image src="/Vectoragenda.png" alt="Agenda" width={20} height={20} />
              <span>Agenda</span>
            </Link>
          </li>
          <li>
            <Link 
              href={`/user/${username}/clients`} 
              className={`${styles.menuItem} ${pathname === `/user/${username}/clients` ? styles.active : ''}`}
            >
              <Image src="/Vectorclients.png" alt="Clients" width={20} height={20} />
              <span>Clients</span>
            </Link>
          </li>
          <li>
            <Link 
              href={`/user/${username}/files`} 
              className={`${styles.menuItem} ${pathname === `/user/${username}/files` ? styles.active : ''}`}
            >
              <Image src="/Vectorfiles.png" alt="Files" width={20} height={20} />
              <span>Files</span>
            </Link>
          </li>
        </ul>

        {/* Opened Files Section */}
        <h2 className={styles.menuTitle}>OPENED FILES</h2>

        {/* Upgrade Card using UpgradePlanBanner Component */}
        <div className={styles.upgradeCard}><UpgradePlanBanner /></div>

        {/* Profile Section */}
        <div className={styles.profileSection}>
          <Image src="/sofia.png" alt="User Avatar" width={35} height={35} className={styles.profileAvatar} />
          <div className={styles.profileDetails}>
            <p className={styles.profileName}>John Doe</p>
            <p className={styles.profileRole}>Independent Lawyer</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
