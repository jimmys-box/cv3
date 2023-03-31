import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Menu.module.css';
import Link from 'next/link';
import MenuItem from './MenuItem';
import { BiHome } from 'react-icons/bi';
import { GiIdCard } from 'react-icons/gi';
import { BsPeople, BsCalendar3, BsHouseGear, BsFill2CircleFill, BsFill1CircleFill, BsJournalRichtext } from 'react-icons/bs';
import { GrUserSettings, GrUserAdd, GrLogout } from 'react-icons/gr';
import { useLocalStorage } from '../../functions/connexion';
import { FaSolarPanel } from 'react-icons/fa';
import { MdOutlineLocalGasStation } from 'react-icons/md';



export default function SideMenu() {
    const [isOpen, setIsOpen] = useState(true);
    const [openItem, setOpenItem] = useState('');
    const router = useRouter();


    useEffect(() => {
        setIsOpen(false);
    }, [router.asPath]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const [user, setUser] = useLocalStorage('userPseudo', '');
    const [role, setRole] = useLocalStorage('userRole', '');
    const [equipe, setEquipe] = useLocalStorage('userEquipe', '');
    const [logged, setLoggedIn] = useLocalStorage('logged', '');

    const handleLogout = () => {
        setUser('');
        setRole('');
        setEquipe('');
        setLoggedIn(false);
        window.location.replace('/login');
    };

    return (
        <div>
            <div className={styles.menuOpenBtn} onClick={toggleMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="white" className="bi bi-list" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
            </div>
            <nav className={`side-menu ${isOpen ? 'open' : ''}`}>
                <Link href="/"> <img style={{ width: '80%', margin: '5px auto', padding: '5%' }} src="/logo.png" /></Link>
                <div className={styles.menuCloseBtn} onClick={toggleMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="black" className="bi bi-arrow-bar-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5ZM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5Z" />
                    </svg>
                </div>
                {role === 'administrator' ? (
                    <ul>
                        {/* ONGLET Accueil */}
                        <li>
                            <Link href="/">
                                <div className={styles.desktopMenuLinks}>
                                    <div className={router.pathname === "/" ? "activeMenu" : ""}>
                                        <BiHome size="36" />
                                        <p>Accueil</p>
                                    </div>
                                </div>

                            </Link>
                        </li>

                        {/* ONGLET Client */}
                        <li>
                            <div className={styles.desktopSubMenuLinks}>
                                <div>
                                    <MenuItem label="Client" isOpen={openItem === 'Client'} setOpenItem={setOpenItem} icon={BsPeople}>
                                        <nav>
                                            <Link href="/clients/gestion-clients">
                                                <div className={styles.desktopMenuLinks}>
                                                    <div className={router.pathname === "/clients/gestion-clients" ? "activeMenu" : ""}>
                                                        <GrUserSettings size="18" />
                                                        <p>Gestion clients</p>
                                                    </div>
                                                </div>
                                            </Link>
                                            <Link href="/clients/ajouter-client">
                                                <div className={styles.desktopMenuLinks}>
                                                    <div className={router.pathname === "/clients/ajouter-client" ? "activeMenu" : ""}>
                                                        <GrUserAdd size="18" />
                                                        <p>Ajouter client</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </nav>
                                    </MenuItem>
                                </div>
                            </div>
                        </li>

                        {/* ONGLET Equipe */}
                        <li>
                            <div className={styles.desktopSubMenuLinks}>
                                <div>
                                    <MenuItem label="Equipe" isOpen={openItem === 'Equipe'} setOpenItem={setOpenItem}  icon={GiIdCard}>
                                        <nav>
                                            <Link href="/equipe/gestion-collaborateurs">
                                                <div className={styles.desktopMenuLinks}>
                                                    <div className={router.pathname === "/equipe/gestion-collaborateurs" ? "activeMenu" : ""}>
                                                        <GrUserSettings size="18" />
                                                        <p>Gestion collaborateurs</p>
                                                    </div>
                                                </div>
                                            </Link>
                                            <Link href="/equipe/ajouter-collaborateur">
                                                <div className={styles.desktopMenuLinks}>
                                                    <div className={router.pathname === "/equipe/ajouter-collaborateur" ? "activeMenu" : ""}>
                                                        <GrUserAdd size="18" />
                                                        <p>Ajouter collaborateur</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </nav>
                                    </MenuItem>
                                </div>
                            </div>
                        </li>

                        {/* ONGLET planning */}
                        <li>
                            <div className={styles.desktopSubMenuLinks}>
                                <div>
                                    <MenuItem label="Planning" isOpen={openItem === 'Planning'} setOpenItem={setOpenItem}  icon={BsCalendar3}>
                                        <nav>
                                            <Link href="/planning/gms">
                                                <div className={styles.desktopMenuLinks}>
                                                    <div className={router.pathname === "/planning/gms" ? "activeMenu" : ""}>
                                                        <MdOutlineLocalGasStation size="30" />
                                                        <p>GMS</p>
                                                    </div>
                                                </div>
                                            </Link>
                                            <Link href="/planning/gms-equipe-1">
                                                <div className={styles.desktopMenuLinks}>
                                                    <div className={router.pathname === "/planning/gms-equipe-1" ? "activeMenu" : ""}>
                                                        <MdOutlineLocalGasStation size="16" /><BsFill1CircleFill size="14" />
                                                        <p>GMS équipe 1</p>
                                                    </div>
                                                </div>
                                            </Link>
                                            <Link href="/planning/gms-equipe-2">
                                                <div className={styles.desktopMenuLinks}>
                                                    <div className={router.pathname === "/planning/gms-equipe-2" ? "activeMenu" : ""}>
                                                        <MdOutlineLocalGasStation size="16" /><BsFill2CircleFill size="14" />
                                                        <p>GMS équipe 2</p>
                                                    </div>
                                                </div>
                                            </Link>
                                            <Link href="/planning/solaire">
                                                <div className={styles.desktopMenuLinks}>
                                                    <div className={router.pathname === "/planning/solaire" ? "activeMenu" : ""}>
                                                        <FaSolarPanel size="30" />
                                                        <p>Solaire</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </nav>
                                    </MenuItem>
                                </div>
                            </div>
                        </li>

                        {/* ONGLET rapport */}
                        <li>
                            <div className={styles.desktopSubMenuLinks}>
                                <div>
                                    <MenuItem label="Rapport" isOpen={openItem === 'Rapport'} setOpenItem={setOpenItem}  icon={BsJournalRichtext}>
                                        <nav>
                                            <Link href="/rapport/gms/liste">
                                                <div className={styles.desktopMenuLinks}>
                                                    <div className={router.pathname === "/rapport/gms/liste" ? "activeMenu" : ""}>
                                                        <MdOutlineLocalGasStation size="18" />
                                                        <p>GMS</p>
                                                    </div>
                                                </div>
                                            </Link>
                                            <Link href="/rapport/solaire/liste">
                                                <div className={styles.desktopMenuLinks}>
                                                    <div className={router.pathname === "/rapport/solaire/liste" ? "activeMenu" : ""}>
                                                        <FaSolarPanel size="18" />
                                                        <p>Solaire</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </nav>
                                    </MenuItem>
                                </div>
                            </div>
                        </li>

                        {/* ONGLET parametres */}
                        <Link href="/parametres">
                            <div className={styles.desktopMenuLinks}>
                                <div className={router.pathname === "/parametres" ? "activeMenu" : ""}>
                                    <BsHouseGear size="36" />
                                    <p>Paramètres</p>
                                </div>
                            </div>
                        </Link>
                    </ul>
                ) : role === 'manager' ? (
                    <ul>
                        {/* ONGLET Accueil */}
                        <li>
                            <Link href="/">
                                <div className={styles.desktopMenuLinks}>
                                    <div className={router.pathname === "/" ? "activeMenu" : ""}>
                                        <BiHome size="36" />
                                        <p>Accueil</p>
                                    </div>
                                </div>

                            </Link>
                        </li>

                        {/* ONGLET Equipe */}
                        <li>
                            <Link href="/equipe/gestion-collaborateurs">
                                <div className={styles.desktopMenuLinks}>
                                    <div className={router.pathname === "/equipe/gestion-collaborateurs" ? "activeMenu" : ""}>
                                        <GiIdCard size="18" />
                                        <p>Collaborateurs</p>
                                    </div>
                                </div>
                            </Link>
                        </li>

                        {/* ONGLET planning */}
                        <li>
                            <Link href="/planning/gms">
                                <div className={styles.desktopMenuLinks}>
                                    <div className={router.pathname === "/planning/gms" ? "activeMenu" : ""}>
                                        <BsCalendar3 size="30" />
                                        <p>Planning</p>
                                    </div>
                                </div>
                            </Link>
                        </li>

                        {/* ONGLET rapport */}
                        <li>
                            <Link href="/rapport/gms/liste">
                                <div className={styles.desktopMenuLinks}>
                                    <div className={router.pathname === "/rapport/gms/liste" ? "activeMenu" : ""}>
                                        <BsJournalRichtext size="18" />
                                        <p>Rapport</p>
                                    </div>
                                </div>
                            </Link>
                        </li>


                    </ul>
                ) : (
                    <ul>

                        {/* ONGLET Accueil */}
                        <li>
                            <Link href="/">
                                <div className={styles.desktopMenuLinks}>
                                    <div className={router.pathname === "/" ? "activeMenu" : ""}>
                                        <BiHome size="36" />
                                        <p>Accueil</p>
                                    </div>
                                </div>

                            </Link>
                        </li>

                        {/* ONGLET planning */}
                        <Link href="/planning">
                            <div className={styles.desktopMenuLinks}>
                                <div className={router.pathname === "/planning" ? "activeMenu" : ""}>
                                    <BsCalendar3 size="36" />
                                    <p>Planning</p>
                                </div>
                            </div>
                        </Link>

                    </ul>
                )}
                <div style={{ margin: '0px auto', flexDirection: 'column' }}>
                    <button onClick={handleLogout} className="btn ml-3" data-toggle="tooltip" data-placement="bottom" title="déconnexion" style={{ margin: 'auto', display:'flex', alignItems:'center' }}>
                        <p style={{marginRight:10,marginBottom:0,fontSize:24,lineHeight:1}}>{user}</p>
                        <GrLogout size="24" />
                    </button>
                    <div>
                        <p style={{ marginBottom: '0px', color: '#ffd633', textAlign: 'center' }}>KeMieTech®</p>
                    </div>
                </div>
            </nav>
        </div>
    );
}