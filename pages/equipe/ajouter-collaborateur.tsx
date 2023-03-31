import React, { Fragment, useState, useEffect } from 'react';
import { useLocalStorage } from '../../functions/connexion';
import axios from 'axios';



const AjoutCollaborateur = () => {
  const [isLoading, setLoading] = useState(true);
  const role: any = useLocalStorage('userRole');
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [userRole, setUserRole] = useState('');
  const [equipe, setEquipe] = useState('');
  const [branche, setBranche] = useState('');


  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {

    // Empêche le rechargement de la page
    e.preventDefault();

    // Déclaration des paramètres de requête API

    let url = `https://espacepro.jimmys-box.com/wp-json/capvert/collaborateur/ajouter?prenomcollaborateur=${prenom}&nomcollaborateur=${nom}&telephonecollaborateur=${phone}&emailcollaborateur=${email}&idequipe=${equipe}&droitsacces=${role}`;

    // Appel API en requête GET
    axios.get(url)
      .then(response => {
        alert('Collaborateur créé');
        // window.location.href = "/equipe/gestion-collaborateurs";
      })
      .catch(err => {
        console.error(err);
      });

  }




  return (
    <div>
    {role[0] === 'administrator' ? (
    
          <form onSubmit={submitHandler}>
            <div className="formSection dFlex justifyCenter alignCenter flexColumn" >
              <h3 className="formSectionNom">Nouveau collaborateur</h3>
              <div className="formSectionInner dFlex justifyBetween width500" >
                <div className="formSectionChamp">
                  <p className="formSectionLabel">Prénom</p>
                  <input required className="formSectionInput" type="text" value={prenom} onChange={(e) => { setPrenom(e.target.value) }} />
                </div>
                <div className="formSectionChamp">
                  <p className="formSectionLabel">Nom</p>
                  <input required className="formSectionInput" type="text" value={nom} onChange={(e) => { setNom(e.target.value) }} />
                </div>
              </div>
              <div className="formSectionInner dFlex justifyBetween width500" >
                <div className="formSectionChamp">
                  <p className="formSectionLabel">Numéro de téléphone</p>
                  <input className="formSectionInput" type="text" value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                </div>
                <div className="formSectionChamp">
                  <p className="formSectionLabel">Adresse email</p>
                  <input className="formSectionInput" type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </div>
              </div>
              <div className="formSectionInner dFlex justifyBetween width500" >
                <div className="formSectionChamp">
                  <p className="formSectionLabel">Equipe</p>
                  <select className="formSectionInput" name={equipe} id="equipe" onChange={(e) => { setEquipe(e.target.value) }}>
                    <option value="" style={{ color: 'gray', backgroundColor: 'darkgray' }}>...</option>
                    <option value="S1">S1</option>
                    <option value="S2">S2</option>
                    <option value="S3">S3</option>
                    <option value="S4">S4</option>
                    <option value="S5">S5</option>
                    <option value="G1">G1</option>
                    <option value="G2">G2</option>
                    <option value="G3">G3</option>
                    <option value="G4">G4</option>
                    <option value="G5">G5</option>
                  </select>
                </div>

                <div className="formSectionChamp">
                  <p className="formSectionLabel">Branche</p>
                  <select className="formSectionInput" name={branche} id="branche" onChange={(e) => { setBranche(e.target.value) }}>
                    <option value="" style={{ color: 'gray', backgroundColor: 'darkgray' }}>...</option>
                    <option value="A">GMS</option>
                    <option value="B">SOLAIRE</option>
                  </select>
                </div>

              </div>
              <div className="formSectionChamp width500">
                <p className="formSectionLabel">Role</p>
                <select className="formSectionInput" name={role} id="equipe" onChange={(e) => { setUserRole(e.target.value) }}>
                  <option value="" style={{ color: 'gray', backgroundColor: 'darkgray' }}>...</option>
                  <option value="administrateur">Administrateur</option>
                  <option value="manager">Chef d'équipe</option>
                  <option value="collaborateur">Collaborateur</option>
                </select>
              </div>
            </div>
            <div className="dFlex formSectionInner justifyCenter" >

              <button type="submit" style={{ margin: 'auto' }}>
                Ajouter le collaborateur
              </button>

            </div>
          </form>


      ) : (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2>Vous n'avez pas les droits pour accéder à cette page</h2>
        </div>
      )}
    </div>
  )
}


export default AjoutCollaborateur;

