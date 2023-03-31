import React, { Fragment, useState, useEffect } from 'react';
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useLocalStorage } from '../functions/connexion';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';
import ModalRapport from '@/composants/rapport/gms/ModalRapport';

interface Intervention {
  id: string;
  notes_precisions_intervention: string;
  date_intervention: string;
  nom_client: any | null;
  email_collaborateur: string;
  branche: string;
  id_chantier_associe: string;
  id_equipe: string;
}

interface Rapport {
  id_rapport: string;
  nom_client: string;
  adresse: string;
  date_intervention: string;
  id_chantier: string;
  url_rapport: string;
  droits_acces: string;
  id_equipe: string;
}

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const user = useLocalStorage('userPseudo');
  const role = useLocalStorage('userRole');
  const branche = useLocalStorage('userBranche');
  const branche2 = JSON.stringify(branche);
  const equipe: any = useLocalStorage('userEquipe');
  const [interventionGms, setInterventionGms] = useState<Intervention[]>([]);
  const [interventionSolaire, setInterventionSolaire] = useState<Intervention[]>([]);
  const [interventionBranche, setInterventionBranche] = useState<Intervention[]>([]);
  const [rapportGms, setRapportGms] = useState<Rapport[]>([]);
  const [rapportSolaire, setRapportSolaire] = useState<Rapport[]>([]);

  let hierBrut: any = new Date();
  hierBrut.setDate(hierBrut.getDate() + 1);
  let hier = hierBrut.toISOString().slice(0, 10).replace(/-/g, '');

  let todayBrut: any = new Date();
  let todayDisplay: any = todayBrut.toLocaleDateString("fr");
  let today = todayBrut.toISOString().slice(0, 10).replace(/-/g, '');

  let demainBrut: any = new Date();
  demainBrut.setDate(demainBrut.getDate() - 1);
  let demain = demainBrut.toISOString().slice(0, 10).replace(/-/g, '');

  const getInterventionGms = async (): Promise<void> => {
    try {
      const response = await fetch(
        'https://espacepro.jimmys-box.com/wp-json/capvert/gms-intervention/lister'
      );
      const json = await response.json();
      setInterventionGms(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getInterventionSolaire = async (): Promise<void> => {
    try {
      const response = await fetch(
        'https://espacepro.jimmys-box.com/wp-json/capvert/solaire-intervention/lister'
      );
      const json = await response.json();
      setInterventionSolaire(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getInterventionBranche = async (): Promise<void> => {
    try {
      const test = branche[0];
      const response = await fetch(
        `https://espacepro.jimmys-box.com/wp-json/capvert/gms-intervention/lister`
      );
      const json = await response.json();
      setInterventionBranche(json);
      console.error(test);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getRapportGms = async (): Promise<void> => {
    try {
      const response = await fetch(
        'https://espacepro.jimmys-box.com/wp-json/capvert/gms-rapport/lister'
      );
      const json = await response.json();
      setRapportGms(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const getRapportSolaire = async (): Promise<void> => {
    try {
      const response = await fetch(
        'https://espacepro.jimmys-box.com/wp-json/capvert/gms-rapport/lister'
      );
      const json = await response.json();
      setRapportSolaire(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getInterventionGms();
    getInterventionSolaire();
    getInterventionBranche();
    getRapportGms();
    getRapportSolaire();
  }, []);


  const filteredDataGmsHier = interventionGms.filter(config => config.date_intervention === hier);
  const filteredDataGms = interventionGms.filter(config => config.date_intervention === today);
  const filteredDataGmsDemain = interventionGms.filter(config => config.date_intervention === demain);

  const filteredDataSolaireHier = interventionSolaire.filter(config => config.date_intervention === hier);
  const filteredDataSolaire = interventionSolaire.filter(config => config.date_intervention === today);
  const filteredDataSolaireDemain = interventionSolaire.filter(config => config.date_intervention === demain);

  console.log(interventionBranche)
  return (
    <div>
      {role[0] === 'administrator' ? (
        <>
          <h1 style={{ color: 'white',textAlign:'right' }}>{todayDisplay}</h1>
          <div style={{ display: 'flex' }}>
            <div className={styles.ficheHomeOuterContainer}>
              <p className={styles.nomFicheHome}>GMS</p>
              <div style={{ marginTop: 20, marginBottom: 20 }}>
                <p className={styles.nomFicheHome}>Nombre d'intervention</p>
                <p className={styles.texteHome}>hier : {filteredDataGmsHier.length}</p>
                <p className={styles.texteHome}>aujourd'hui : {filteredDataGms.length}</p>
                <p className={styles.texteHome}>demain : {filteredDataGmsDemain.length}</p>
              </div>
              <Link href='/planning/gms' className={styles.nomFicheHome}>Voir le planning</Link>
              <hr style={{ backgroundColor: '#a0c951', height: 2 }} />
              <div style={{ marginTop: 20, marginBottom: 20 }}>
                <p className={styles.nomFicheHome}>Derniers rapports</p>
                <div
                  className="ficheClientListOuterContainer"
                  style={{ margin: 0 }}
                >
                  <div style={{ width: '20%' }}>
                    <p className="nomFicheClient" style={{ textAlign: 'center' }}>
                      Client
                    </p>
                  </div>
                  <div style={{ width: '20%' }}>
                    <p className="nomFicheClient">Lieu</p>
                  </div>
                  <div style={{ width: '20%' }}>
                    <p className="nomFicheClient">Date : </p>
                  </div>
                  <div style={{ width: '20%' }}>
                    <p className="nomFicheClient">Equipe : </p>
                  </div>
                </div>
                <div>
                  {rapportGms.slice(0, 5).map((client) => {
                    return (
                      <ModalRapport
                        key={client.id_rapport}
                        id={client.id_rapport}
                        idChantier={client.id_chantier}
                        nomClient={client.nom_client}
                        adresse={client.adresse}
                        dateIntervention={client.date_intervention}
                        urlRapport={client.url_rapport}
                      // equipe={client.id_equipe}
                      />
                    );
                  })}
                </div>
              </div>
              <Link href='/rapport/gms/liste' className={styles.nomFicheHome}>Voir tous les rapports</Link>
            </div>
            <div className={styles.ficheHomeOuterContainer}>
              <p className={styles.nomFicheHome}>Solaire</p>
              <div style={{ marginTop: 20, marginBottom: 20 }}>
              <p className={styles.nomFicheHome}>Nombre d'intervention</p>
                <p className={styles.texteHome}>hier : {filteredDataSolaireHier.length}</p>
                <p className={styles.texteHome}>aujourd'hui : {filteredDataSolaire.length}</p>
                <p className={styles.texteHome}>demain : {filteredDataSolaireDemain.length}</p>
              </div>
              <Link href='/planning/solaire' className={styles.nomFicheHome}>Voir le planning</Link>
              <hr style={{ backgroundColor: '#a0c951', height: 2 }} />
              <div style={{ marginTop: 20, marginBottom: 20 }}>
                <p className={styles.nomFicheHome}>Derniers rapports</p>
                <div
                  className="ficheClientListOuterContainer"
                  style={{ margin: 0 }}
                >
                  <div style={{ width: '20%' }}>
                    <p className="nomFicheClient" style={{ textAlign: 'center' }}>
                      Client
                    </p>
                  </div>
                  <div style={{ width: '20%' }}>
                    <p className="nomFicheClient">Lieu</p>
                  </div>
                  <div style={{ width: '20%' }}>
                    <p className="nomFicheClient">Date : </p>
                  </div>
                  <div style={{ width: '20%' }}>
                    <p className="nomFicheClient">Equipe : </p>
                  </div>
                </div>
                <div>
                  {rapportGms.slice(0, 5).map((client) => {
                    return (
                      <ModalRapport
                        key={client.id_rapport}
                        id={client.id_rapport}
                        idChantier={client.id_chantier}
                        nomClient={client.nom_client}
                        adresse={client.adresse}
                        dateIntervention={client.date_intervention}
                        urlRapport={client.url_rapport}
                      // equipe={client.id_equipe}
                      />
                    );
                  })}
                </div>
              </div>
              <Link href='/rapport/solaire/liste' className={styles.nomFicheHome}>Voir tous les rapports</Link>
            </div>


          </div>
        </>
      ) : role[0] === 'manager' ? (
        <div>
          <h2>Welcome Manager!</h2>
        </div>
      ) : (

        <>
         <h1 style={{ color: 'white',textAlign:'right' }}>{branche}</h1>
         <div className={styles.ficheHomeOuterContainer}>
              <p className={styles.nomFicheHome}>Equipe {equipe}</p>
              <div style={{ marginTop: 20, marginBottom: 20 }}>
              {interventionBranche.map((client) => {
          
                    return (
                     
                      <div key={client.id}>
                        <p>{client.nom_client !== null ? client.nom_client : "Unknown"}</p>
                        <p>{client.notes_precisions_intervention}</p>
                        </div>
                    );
                  })}
              </div>
              </div>
        </>

      )}
    </div>
  )
}
