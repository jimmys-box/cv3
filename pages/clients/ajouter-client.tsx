
import React, { Fragment, useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styles from '@/styles/Client.module.css';
import AjoutClientGms from '../../composants/clients/gms/ajout';
import AjoutClientSolaire from '../../composants/clients/solaire/ajout';
import { useLocalStorage } from '../../functions/connexion';
 
export default function AjoutClient() {
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
            <AjoutClientGms />
          </TabPanel>
          <TabPanel className={styles.ficheContainer}>
            <AjoutClientSolaire />
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