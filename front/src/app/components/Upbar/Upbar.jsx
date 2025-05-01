import React from 'react';
import styles from './upbar.module.css';
import Link from 'next/link';
import Image from 'next/image'
import { CgArrowTopRightO } from "react-icons/cg";
import Divider from '@mui/material/Divider';

function Upbar() {
  return (
    <div className={styles.container}>
    <div className={styles.bar}>
      <div className={styles.left}>
      <Link href="/" className={styles.logo}><Image src="/logo bold.svg" alt="our logo" width={200} height={100} /></Link>
      </div>
      <div className={styles.goback}>
        <p className={styles.text}>Home</p>
        <Link href="/" className={styles.gobackArrow}><CgArrowTopRightO /></Link>
      </div>
    </div>
    <Divider orientation="horizontal" variant="middle"/>
    </div>
  )
}

export default Upbar
