import React, { Fragment, useState, useEffect } from 'react';
import { useLocalStorage } from '../../../functions/connexion';
import ModalRapport from '../../../composants/rapport/gms/ModalRapport';
import { GiDivergence } from 'react-icons/gi';
import { idText } from 'typescript';

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

const ListeRapport = (): JSX.Element => {
  const [data, setData] = useState<Rapport[]>([]);
  const [isLoading, setLoading] = useState(true);
  const role: any = useLocalStorage('userRole');

  const [show, setShow] = useState(false);

  const getRapport = async (): Promise<void> => {
    try {
      const response = await fetch(
        'https://espacepro.jimmys-box.com/wp-json/capvert/gms-rapport/lister'
      );
      const json = await response.json();
      setData(json);
      console.log(json)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRapport();
  }, []);
 
  return (
    <div className="customContent">
         {role[0] === 'administrator' ? (
      <div>
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
              <p className="nomFicheClient">Date d'intervention : </p>
            </div>
            <div style={{ width: '20%' }}>
              <p className="nomFicheClient">Equipe : </p>
            </div>
          </div>
          <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />
          <div>
            {data.map((client) => {
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
   
       ) : (
        <div style={{ textAlign: 'center', color: 'white' }}>
        <h2>Vous n'avez pas les droits pour accéder à cette page</h2>
      </div>
       )}
     </div>
   )
}

export default ListeRapport