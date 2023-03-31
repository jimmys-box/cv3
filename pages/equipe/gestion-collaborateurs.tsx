import React, { Fragment, useState, useEffect } from 'react';
import { useLocalStorage } from '../../functions/connexion';
import ModalCollaborateurs from '../../composants/equipe/ModalCollaborateurs';
import { GiDivergence } from 'react-icons/gi';

interface Collaborator {
  id: string;
  prenom_collaborateur: string;
  nom_collaborateur: string;
  telephone_collaborateur: string;
  email_collaborateur: string;
  branche: string;
  droits_acces: string;
  id_equipe: string;
}

const GestionCollaborateurs = (): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('token', '');
  const [data, setData] = useState<Collaborator[]>([]);
  const [isLoading, setLoading] = useState(true);

  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [userRole, setUserRole] = useState('');
  const [equipe, setEquipe] = useState('');
  const [branche, setBranche] = useState('');
  const role: any = useLocalStorage('userRole');
  const [show, setShow] = useState(false);
  const handleshow = () => setShow(true);
  const [disabledField, setDisabledField] = useState(true);
  const [hiddenField, setHiddenField] = useState(true);

  const getCollaborateurs = async (): Promise<void> => {
    try {
      const response = await fetch(
        'https://espacepro.jimmys-box.com/wp-json/capvert/collaborateur/lister'
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCollaborateurs();
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
                Nom
              </p>
            </div>
            <div style={{ width: '20%' }}>
              <p className="nomFicheClient">Téléphone</p>
            </div>
            <div style={{ width: '20%' }}>
              <p className="nomFicheClient">Role : </p>
            </div>
            <div style={{ width: '20%' }}>
              <p className="nomFicheClient">Equipe : </p>
            </div>
          </div>
          <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />
          <div>
            {data.map((client) => {
              return (
                <ModalCollaborateurs
                  key={client.id}
                  id={client.id}
                  prenom={client.prenom_collaborateur}
                  nom={client.nom_collaborateur}
                  phone={client.telephone_collaborateur}
                  email={client.email_collaborateur}
                  branche={client.branche}
                  role={client.droits_acces}
                  equipe={client.id_equipe}
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

export default GestionCollaborateurs