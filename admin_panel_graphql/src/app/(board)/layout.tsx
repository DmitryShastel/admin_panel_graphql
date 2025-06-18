import {ReactNode} from 'react';
import {AppSidebar} from "@/common/components/AppSidebar/AppSidebar";
import {Header} from "@/common/components/Header/Header";
import styles from './board.module.scss'

export default function CorLayout({children}: { children: ReactNode }) {
    return (
        <div className={styles.bodyContainer}>
            <Header />
            <div className={styles.mainBody}>
                <AppSidebar />
                <main className={styles.main}>{children}</main>
            </div>
        </div>

    );
}