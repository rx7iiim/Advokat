import Link from 'next/link';
import Image from 'next/image';
import styles from './sidebar.module.css'; // Import the CSS file
import UpgradePlanBanner from '../UpgradePlanBanner';

export default function Sidebar() {
  return (
   
    <aside className={styles.sidebar}>
      {/* Logo Section */}
   <div className={styles.left}>
         <Link href="/" className={styles.logo}><Image src="/logobold.png" alt="our logo" width={200} height={100} /></Link>
         </div>

      {/* Menu Section */}
      <h2 className={styles.menuTitle}>MAIN MENU</h2>
        <ul className={styles.menuList}>
        <li>
          <Link href="/" className={styles.menuItem}>
            <Image src="/Vector.png" alt="Home" width={20} height={20} />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link href="/agenda" className={`${styles.menuItem} ${styles.active}`}>
            <Image src="/Vectoragenda.png" alt="Agenda" width={20} height={20} />
            <span>Agenda</span>
          </Link>
        </li>
        <li>
          <Link href="/clients" className={styles.menuItem}>
            <Image src="/Vectorclients.png" alt="Clients" width={20} height={20} />
            <span>Clients</span>
          </Link>
        </li>
        <li>
          <Link href="/files" className={styles.menuItem}>
            <Image src="/Vectorfiles.png" alt="Files" width={20} height={20} />
            <span>Files</span>
          </Link>
        </li>
      </ul>

       {/* Opened Files Section */}
       <h2 className={styles.menuTitle}>OPENED FILES</h2>

{/* Upgrade Card using UpgradePlanner Component */}
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
  
  );
}
