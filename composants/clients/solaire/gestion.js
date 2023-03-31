import React, { Fragment, useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


import SolairesCard from './card';
import SolaireList from './list';




const GestiontSolaire = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [showSolaires, setshowSolaires] = useState(false);
  const handleClose = () => setshowSolaires(false);
  const handleshowSolaires = () => setshowSolaires(true);
  const [q, setQ] = useState('');
  const [searchTerm] = useState(["ville_commercial"]);
  const [data, setData] = useState([]);
  const [dataClient, setDataClient] = useState([]);
  const [dataSingleClient, setDataSingleClient] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [filteredData, setFilteredData] = useState([]);
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
  const getChantier = async () => {
    try {
      const response = await fetch('https://espacepro.jimmys-box.com/wp-json/capvert/solaire-chantier/lister');
      const json = await response.json();
      console.log(json);
      setData(json)

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getChantier();
  }, []);



const possibleValues = dataClient.map((array) => array.identite_client_facturation);

useEffect(() => {
  if (selectedOption) {
    const newData = data.filter(
      (client) =>
        client.infos_client_associe.identite_client_facturation
          .toLowerCase()
          .includes(selectedOption.toLowerCase())
    );
    setFilteredData(newData);
  } else {
    setFilteredData(data);
  }
}, [selectedOption, data]);


console.log(selectedOption);

const getClients = async () => {
  try {
    const response = await fetch('https://espacepro.jimmys-box.com/wp-json/capvert/solaire-client/lister');
    const json = await response.json();
    setDataClient(json);

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

useEffect(() => {
  getClients();
}, []);

  return (
    <div className="" style={{ width: '100%' }}>

          <Tabs>
            <TabList className="tabsGestionClientsSubTab" >
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
              {dataClient.map((array, index) => (
                <option key={index} value={array.identite_client_facturation}>
                  {array.map((item, i) => (
                    <span key={i}>{item.identite_client_facturation}</span>
                  ))}
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

            <TabPanel className="ficheContainer">

              {search(filteredData).map((client) => {
                const dateParts = client.date_de_dernier_nettoyage.match(/(\d{4})(\d{2})(\d{2})/);
                const formattedDate = dateParts ? `${dateParts[3]}/${dateParts[2]}/${dateParts[1]}` : '';
              
                return (
                  <SolairesCard
                  logo={client.infos_client_associe.identite_client_facturation}
                    key={client.id}
                    id={client.id}
                    nomMagasin={client.identite_commercial}
                    phoneCommercial={client.telephone_commercial}
                    nomCommercial={client.identite_commercial}
                    emailCommercial={client.email_commercial}
                    adresseChantier={client.adresse_du_chantier}
                    code_postalCommercial={client.code_postal_commercial}
                    ville_cedexCommercial={client.ville_commercial}
                    emailRapport={client.email_rapport}
                    //equipe={client.equipe}
                    identiteFacturation={client.infos_client_associe.identite_client_facturation}
                    phoneFacturation={client.infos_client_associe.telephone_facturation}
                    nomFacturation={client.infos_client_associe.nom_contact_facturation}
                    marqueFacturation={client.infos_client_associe.identite_client_facturation}
                    emailFacturation={client.infos_client_associe.email_facturation}
                    adresseFacturation={client.infos_client_associe.adresse_facturation}
                    code_postalFacturation={client.infos_client_associe.code_postal_facturation}
                    ville_cedexFacturation={client.infos_client_associe.ville_facturation}

                    surfaceEnM={client.surface}
                    dureeIntervention={client.duree_totale_dintervention}
                    ca={client.ca_ht}
                    dateDernierNettoyage={formattedDate}
                    anneeInstalation={client.annee_installation_panneaux}

                    nbreBatiment={client.nombre_de_batiments}
                    typePanneau={client.type_panneaux}
                    pente={client.pourcentage_de_pente}
                    accessibilite={client.accessibilite}
                    eau={client.acces_eau}
                    electricite={client.acces_electricite}
                    hauteurToiture={client.hauteur_bas_de_toiture}
                    volumeEau={client.volume_deau}
                    commentaires={client.commentaires}
                  />

                );
              })}
            </TabPanel>

            <TabPanel style={{ textAlign: 'center' }}>
              <div className="">
                <div className="ficheClientListOuterContainer">
                  <div style={{ width: '20%' }}>
                    <p className='nomFicheClient' style={{ textAlign: 'center' }}>Nom</p>
                  </div>
                  <div style={{ width: '20%' }}>
                    <p className='nomFicheClient'>Localisation</p>
                  </div>
                  <div style={{ width: '20%' }}>
                    <p className='nomFicheClient'>Dernier nettoyage : </p>

                  </div>
                  <div style={{ width: '20%' }}>
                    <p className='nomFicheClient'>Surface : </p>
                  </div>
                </div>
                {search(filteredData).map((client) => {
                  const dateParts = client.date_de_dernier_nettoyage.match(/(\d{4})(\d{2})(\d{2})/);
                  const formattedDate = dateParts ? `${dateParts[3]}/${dateParts[2]}/${dateParts[1]}` : '';
                

                  return (
                    <SolaireList
                    logo={client.infos_client_associe.identite_client_facturation}
                      key={client.id}
                      id={client.id}
                      nomMagasin={client.identite_commercial}
                      phoneCommercial={client.telephone_commercial}
                      nomCommercial={client.identite_commercial}
                      emailCommercial={client.email_commercial}
                      adresseChantier={client.adresse_du_chantier}
                      code_postalCommercial={client.code_postal_commercial}
                      ville_cedexCommercial={client.ville_commercial}
                      emailRapport={client.email_rapport}
                      //equipe={client.equipe}
                      identiteFacturation={client.infos_client_associe.identite_client_facturation}
                      phoneFacturation={client.infos_client_associe.telephone_facturation}
                      nomFacturation={client.infos_client_associe.nom_contact_facturation}
                      marqueFacturation={client.infos_client_associe.identite_client_facturation}
                      emailFacturation={client.infos_client_associe.email_facturation}
                      adresseFacturation={client.infos_client_associe.adresse_facturation}
                      code_postalFacturation={client.infos_client_associe.code_postal_facturation}
                      ville_cedexFacturation={client.infos_client_associe.ville_facturation}
  
  
                      surfaceEnM={client.surface}
                      dureeIntervention={client.duree_totale_dintervention}
                      ca={client.ca_ht}
                      dateDernierNettoyage={formattedDate}
                      anneeInstalation={client.annee_installation_panneaux}
  
                      nbreBatiment={client.nombre_de_batiments}
                      typePanneau={client.type_panneaux}
                      pente={client.pourcentage_de_pente}
                      accessibilite={client.accessibilite}
                      eau={client.acces_eau}
                      electricite={client.acces_electricite}
                      hauteurToiture={client.hauteur_bas_de_toiture}
                      volumeEau={client.volume_deau}
                      commentaires={client.commentaires}
                    />
                  );
                })}
              </div>

            </TabPanel>
          </Tabs>

    </div>
  )
}

export default GestiontSolaire