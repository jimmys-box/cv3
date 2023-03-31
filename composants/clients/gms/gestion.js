import React, { Fragment, useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styles from '@/styles/Client.module.css';
import GmsCard from './card';
import GmsList from './list';




const GestionGms = () => {
  const [isLoading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [searchTerm] = useState(["ville_commercial"]);
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [dataFranchise, setDataFranchise] = useState([]);

  function search(items) {
    return items.filter((item) => {
      return searchTerm.some((newItem) => {
        return (
          item[newItem]
            .toString()
            .toLowerCase()
            .indexOf(q.toLowerCase()) > -1
        );
      });
    });
  }
  const getClients = async () => {
    try {
      const response = await fetch('https://espacepro.jimmys-box.com/wp-json/capvert/gms-chantier/lister');
      const json = await response.json();
      setData(json)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getClients();
    getFranchise();
  }, []);

  useEffect(() => {
    if (selectedOption) {
      const newData = data.filter(
        (client) =>
          client.nom_franchise
            .toLowerCase()
            .includes(selectedOption.toLowerCase())
      );
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  }, [selectedOption, data]);
  
  const getFranchise = async () => {
    try {
        const response = await fetch('https://espacepro.jimmys-box.com/wp-json/capvert/franchise/lister');
        const json = await response.json();
        setDataFranchise(json)
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
}

  useEffect(() => {

    getFranchise();
  }, []);

  return (
    <div style={{ width: '100%' }}>
    
          <Tabs>
            <TabList className={styles.tabsGestionClientsSubTab} >
              <input
                type="search"
                placeholder="Saisissez une ville"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              <select value={selectedOption} onChange={(e) => {
                setSelectedOption(e.target.value);
                console.log('valuuuue', e.target.value);
              }}>
              <option value="">Tous</option>
              {dataFranchise.map((item, index) => (
                <option key={index} value={item.nom_franchise}>
                 {item.nom_franchise}
              
                </option>
              ))}
            </select>
              <Tab>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-grid-3x2-gap-fill" viewBox="0 0 16 16">
                  <path d="M1 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V4zM1 9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V9zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V9z" />
                </svg>
              </Tab>
              <Tab>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
              </Tab>
            </TabList>

            <TabPanel className={styles.ficheContainer}>

              {search(filteredData).map((client) => {
                const dateParts = client.date_de_dernier_nettoyage.match(/(\d{4})(\d{2})(\d{2})/);
                const formattedDate = dateParts ? `${dateParts[3]}/${dateParts[2]}/${dateParts[1]}` : '';
              
                return (
          
                  <GmsCard
                    key={client.id}
                    id={client.id}
                    logo={client.url_logo_franchise}
                    nomMagasin={client.identite_commercial}
                    phoneCommercial={client.telephone_commercial}
                    nomCommercial={client.identite_commercial}
                    emailCommercial={client.email_commercial}
                    adresseChantier={client.adresse_du_chantier}
                    code_postalCommercial={client.code_postal_commercial}
                    ville_cedexCommercial={client.ville_commercial}
                    adresseCommercial={client.adresse_du_chantier}
                    emailRapport={client.email_rapport}
                    equipe={client.equipe}

                    franchise={client.nom_franchise}

                    identiteFacturation={client.infos_client_associe.identite_client_facturation}
                    phoneFacturation={client.infos_client_associe.telephone_commercial}
                    nomFacturation={client.infos_client_associe.nom_contact_facturation}
                    marqueFacturation={client.infos_client_associe.nom_magasin_facturation}
                    emailFacturation={client.infos_client_associe.email_facturation}
                    adresseFacturation={client.infos_client_associe.adresse_facturation}
                    code_postalFacturation={client.infos_client_associe.code_postal_facturation}
                    ville_cedexFacturation={client.infos_client_associe.ville_facturation}


                    dateDernierNettoyage={formattedDate}
                    frequenceNettoyage={client.frequence_de_nettoyage}
                    ca={client.ca_ht}
                    interdictionIntervention={client.interdiction_dintervention}

                    eau={client.acces_eau}
                    stationService={client.caracteristiques_de_la_station_service}
                    auvent={client.type_auvent}
                    portiqueLavage={client.nombre_de_portiques_de_lavage}
                    pisteHautePression={client.nombre_de_pistes_haute_pression}
                    abrisChariotsSimple={client.nombre_dabris_chariots_simples}
                    abrisChariotsDouble={client.nombre_dabris_chariots_doubles}
                    totem={client.totem}
                    nombreDairesAspirateurGonflage={client.nombre_daires_aspirateur_gonflage}
                    hauteurBardage={client.hauteur_du_bardage}
                    nbrEntreeMagasin={client.nombre_entrees_de_magasin}
                    toitureNettoyable={client.nettoyabilite_toiture}
                    GouttiereApparente={client.visibilite_gouttiere}
                  />

                );
              })}
            </TabPanel>

            <TabPanel style={{ textAlign: 'center' }}>
              <div>
                <div className="ficheClientListOuterContainer">
                  <div style={{ width: '20%' }}>
                    <p className={styles.nomFicheClient} style={{ textAlign: 'center' }}>Nom</p>
                  </div>
                  <div style={{ width: '20%' }}>
                    <p className={styles.nomFicheClient}>Localisation</p>
                  </div>
                  <div style={{ width: '20%' }}>
                    <p className={styles.nomFicheClient}>Dernier nettoyage : </p>

                  </div>
                  <div style={{ width: '20%' }}>
                    <p className={styles.nomFicheClient}>Chiffre d'affaire : </p>
                  </div>
                </div>
                <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />
                {search(filteredData).map((client) => {
                  const dateParts = client.date_de_dernier_nettoyage.match(/(\d{4})(\d{2})(\d{2})/);
                  const formattedDate = dateParts ? `${dateParts[3]}/${dateParts[2]}/${dateParts[1]}` : '';
                

                  return (
               
                    <GmsList
                      key={client.id}
                      id={client.id}
                      logo={client.url_logo_franchise}
                      nomMagasin={client.identite_commercial}
                      phoneCommercial={client.telephone_commercial}
                      nomCommercial={client.identite_commercial}
                      emailCommercial={client.email_commercial}
                      adresseChantier={client.adresse_du_chantier}
                      code_postalCommercial={client.code_postal_commercial}
                      ville_cedexCommercial={client.ville_commercial}
                      adresseCommercial={client.adresse_du_chantier}
                      emailRapport={client.email_rapport}
                      equipe={client.equipe}
                      franchise={client.nom_franchise}

                      identiteFacturation={client.infos_client_associe.identite_client_facturation}
                      phoneFacturation={client.infos_client_associe.telephone_commercial}
                      nomFacturation={client.infos_client_associe.nom_contact_facturation}
                      marqueFacturation={client.infos_client_associe.nom_magasin_facturation}
                      emailFacturation={client.infos_client_associe.email_facturation}
                      adresseFacturation={client.infos_client_associe.adresse_facturation}
                      code_postalFacturation={client.infos_client_associe.code_postal_facturation}
                      ville_cedexFacturation={client.infos_client_associe.ville_facturation}


                      dateDernierNettoyage={formattedDate}
                      frequenceNettoyage={client.frequence_de_nettoyage}
                      ca={client.ca_ht}
                      interdictionIntervention={client.interdiction_dintervention}

                      eau={client.acces_eau}
                      stationService={client.caracteristiques_de_la_station_service}
                      auvent={client.type_auvent}
                      portiqueLavage={client.nombre_de_portiques_de_lavage}
                      pisteHautePression={client.nombre_de_pistes_haute_pression}
                      abrisChariotsSimple={client.nombre_dabris_chariots_simples}
                      abrisChariotsDouble={client.nombre_dabris_chariots_doubles}
                      totem={client.totem}
                      nombreDairesAspirateurGonflage={client.nombre_daires_aspirateur_gonflage}
                      hauteurBardage={client.hauteur_du_bardage}
                      nbrEntreeMagasin={client.nombre_entrees_de_magasin}
                      toitureNettoyable={client.nettoyabilite_toiture}
                      GouttiereApparente={client.visibilite_gouttiere}
                    />

                  );
                })}
              </div>

            </TabPanel>
          </Tabs>
 
    </div>
  )
}

export default GestionGms
