import React, { ReactNode } from 'react';
import SideMenu from './menu/SideMenu';
import styles from '@/styles/Home.module.css';
import { useLocalStorage } from '../functions/connexion';
import Login from '../pages/login';
type LayoutProps = {
    children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    const logged = useLocalStorage('logged');
    const user = useLocalStorage('userPseudo');
    const role: any = useLocalStorage('userRole');
    return (
        <div>
            {logged[0] ? (
                <div className={styles.HailToJ}>
                    <div className={styles.leftMenu}>
                        <SideMenu />
                    </div>
                    <div className={styles.mainContent}>
                        <main>{children}</main>
                    </div>
                </div>
            ) : (
                <div className={styles.HailToJ} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className={styles.loggedOutMainContent}>

                        <img style={{ width: 200, margin: '5px auto', padding: '5%' }} src="/logo.png" />
                        <Login />
                    </div>
                </div>
            )}
        </div>
    )
}