import React, { Fragment } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styles from '@/styles/Client.module.css';
import GestionGms from '../../composants/clients/gms/gestion';
import GestionSolaire from '../../composants/clients/solaire/gestion';
import { useLocalStorage } from '../../functions/connexion';
export default function GestionClient() {
  const role: any = useLocalStorage('userRole');

  return (
    <div>
      {role[0] === 'administrator' ? (
        <Tabs>
          <TabList className={styles.tabsGestionClients}>
            <Tab>GMS</Tab>
            <Tab>SOLAIRE</Tab>
          </TabList>
          <TabPanel className={styles.ficheContainer}>
            <GestionGms />
          </TabPanel>
          <TabPanel className={styles.ficheContainer}>
            <GestionSolaire />
          </TabPanel>
        </Tabs>
      ) : (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2>Vous n'avez pas les droits pour accéder à cette page</h2>
        </div>
      )}
    </div>
  )
}