'use client'
import Link from "next/link";
import styles from './appSidebar.module.scss'
import {usePathname} from "next/navigation";
import Image from 'next/image';
import personOutline from "../../../assets/svg/personOutline.svg"
import creditCardOutline from "../../../assets/svg/creditCardOutline.svg"
import tradingUp from "../../../assets/svg/trandingUp.svg"


export const AppSidebar = () => {

    const pathname = usePathname()

    return (
        <>
            <nav className={styles.sidebar}>
                <ul className={styles.list}>
                    <li className={`${styles.item} ${pathname === 'usersList' ? styles.itemActive : ''}`}>
                        <Link className={styles.link} href={'/usersList'}>
                            <Image src={personOutline} width={24} height={24} alt=""/>
                            <span className={styles.notMobile}>Users list</span>
                        </Link>
                    </li>
                    <li className={`${styles.item} ${pathname === '/' ? styles.itemActive : ''}`}>
                        <Link className={styles.link} href={'/'}>
                            <Image src={personOutline} width={24} height={24} alt=""/>
                            <span className={styles.notMobile}>Statistics</span>
                        </Link>
                    </li>
                    <li className={`${styles.item} ${pathname === '/' ? styles.itemActive : ''}`}>
                        <Link className={styles.link} href={'/'}>
                            <Image src={creditCardOutline} width={24} height={24} alt=""/>
                            <span className={styles.notMobile}>Payments list</span>
                        </Link>
                    </li>
                    <li className={`${styles.item} ${pathname === '' ? styles.itemActive : ''}`}>
                        <Link className={styles.link} href={'/'}>
                            <Image src={tradingUp} width={24} height={24} alt=""/>
                            <span className={styles.notMobile}>Posts list</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
};