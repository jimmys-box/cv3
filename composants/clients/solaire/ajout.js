import React, { Fragment, useState, useEffect } from 'react';

import axios from 'axios';

const AjoutClientSolaire = (identite_client) => {
  const [isLoading, setLoading] = useState(true);
  const [nomMagasin, setNomMagasin] = useState('');
  const [phoneCommercial, setPhoneCommercial] = useState('');
  const [nomCommercial, setNomCommercial] = useState('');
  const [emailCommercial, setEmailCommercial] = useState('');
  const [adresseChantier, setAdresseChantier] = useState('');
  const [code_postalCommercial, setCode_postalCommercial] = useState('');
  const [ville_cedexCommercial, setVille_cedexCommercial] = useState('');
  const [emailRapport, setEmailRapport] = useState('');
  const [equipe, setEquipe] = useState('');

  const [data, setData] = useState([]);
  const [idClient, setIdclient] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [identiteFacturation, setIdentiteFacturation] = useState('');
  const [phoneFacturation, setPhoneFacturation] = useState('');
  const [nomFacturation, setNomFacturation] = useState('');
  const [marqueFacturation, setMarqueFacturation] = useState('');
  const [emailFacturation, setEmailFacturation] = useState('');
  const [adresseFacturation, setAdresseFacturation] = useState('');
  const [code_postalFacturation, setCode_postalFacturation] = useState('');
  const [ville_cedexFacturation, setVille_cedexFacturation] = useState('');

  const [surfaceEnM, setSurfaceEnM] = useState();
  const [tarif, setTarif] = useState('0.75');
  const [dureeIntervention, setDureeIntervention] = useState('');
  const [ca, setCa] = useState('');
  const [dateDernierNettoyage, setdateDernierNettoyage] = useState('');
  const [anneeInstalation, setAnneeInstalation] = useState('');



  const [nbreBatiment, setPortiqueLavage] = useState('');
  const [typePanneau, setTypePanneau] = useState('');
  const [pente, setPente] = useState('');
  const [accessibilite, setAccessibilite] = useState('');
  const [eau, setEau] = useState('');
  const [electricite, setElectricite] = useState('');
  const [hauteurToiture, setHauteurToiture] = useState('');
  const [volumeEau, setVolumeEau] = useState('');
  const [commentaires, setCommentaires] = useState('');

  const checkboxContactHandler = () => {
    setIdentiteFacturation(nomMagasin);
    setPhoneFacturation(phoneCommercial);
    setNomFacturation(nomCommercial);
    setMarqueFacturation(nomMagasin);
    setEmailFacturation(emailCommercial);
    setAdresseFacturation(adresseChantier);
    setCode_postalFacturation(code_postalCommercial);
    setVille_cedexFacturation(ville_cedexCommercial);
  };


  const submitHandler = (e) => {

    // Empêche le rechargement de la page
    e.preventDefault();

    // Déclaration des paramètres de requête API
    let headers = { "Content-Type": "application/json" };
    let idClient;
    if (selectedCustomer === null || selectedCustomer === "null" || selectedCustomer === "") {
      idClient = "";
    } else {
      idClient = `idclient=${selectedCustomer}&`;
    }
    
    let url = `https://espacepro.jimmys-box.com/wp-json/capvert/solaire-chantier/ajouter?${idClient}identitefacturation=${identiteFacturation}&emailfacturation=${emailFacturation}&nomcontactfacturation=${nomFacturation}&telephonefacturation=${phoneFacturation}&nommagasinfacturation=${marqueFacturation}&adressefacturation=${adresseFacturation}&codepostalfacturation=${code_postalFacturation}&villefacturation=${ville_cedexFacturation}&identitecommercial=${nomMagasin}&adressechantier=${adresseChantier}&codepostalcommercial=${code_postalCommercial}&emailcommercial=${emailCommercial}&villecommercial=${ville_cedexCommercial}&telephonecommercial=${phoneCommercial}&surface=${surfaceEnM}&tarifaumetrecarre=${tarif}&dureetotaledintervention=${dureeIntervention}&caht=${ca}&datedederniernettoyage=${dateDernierNettoyage}&anneeinstallationpanneaux=${anneeInstalation}&nombredebatiments=${nbreBatiment}&typepanneaux=${typePanneau}&pourcentagedepente=${pente}&accessibilite=${accessibilite}&acceseau=${eau}&acceselectricite=${electricite}&hauteurbasdetoiture=${hauteurToiture}&volumedeau=${volumeEau}&commentaires=${commentaires}&changementdateinterventionfuturemanuelle=&dateprochaineinterventionprevue=&frequencedenettoyage=`;

    // Appel API en requête GET
    axios.get(url, headers)
      .then(response => {
        console.log(response);
        alert('Nouveau chantier créé');
        window.location.replace('/clients/gestion-clients');
      })
      .catch(err => {
        console.error(err);
        alert('Une erreur s\'est produite');
      });

  }
  const getClients = async () => {
    try {
      const response = await fetch('https://espacepro.jimmys-box.com/wp-json/capvert/solaire-client/lister');
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
  }, []);

  const handleCustomerSelection = (event) => {
    const index = event.target.value;

    setSelectedCustomer(data[index][0].id); // Set the selected customer
    setIdentiteFacturation(data[index][0].identite_client_facturation);
    setPhoneFacturation(data[index][0].telephone_client_facturation);
    setNomFacturation(data[index][0].nom_contact_facturation);
    setMarqueFacturation(data[index][0].marque_client_facturation);
    setEmailFacturation(data[index][0].email_facturation);
    setAdresseFacturation(data[index][0].adresse_facturation);
    setCode_postalFacturation(data[index][0].code_postal_facturation);
    setVille_cedexFacturation(data[index][0].ville_facturation);
  };
console.log('selectedCustomer', selectedCustomer)
  return (
    <div className="customContent">

          <form onSubmit={submitHandler}>

            <div className="formSection dFlex justifyCenter alignCenter flexColumn" >
              <h3 className="formSectionNom">Identité client</h3>
              <div className="formSectionInner dFlex justifyBetween width500" >
                <div className="formSectionChamp">
                  <p className="formSectionLabel">Nom du magasin</p>
                  <input className="formSectionInput" type="text" value={nomMagasin} onChange={(e) => { setNomMagasin(e.target.value) }} />
                </div>
                <div className="formSectionChamp">
                  <p className="formSectionLabel">Numéro de télephone</p>
                  <input className="formSectionInput" type="tel" value={phoneCommercial} onChange={(e) => { setPhoneCommercial(e.target.value) }} />
                </div>
              </div>
              <div className="dFlex formSectionInner" >
                <div className="formSectionChamp formSectionLongChamp">
                  <p className="formSectionLabel">Nom du contact</p>
                  <input className="formSectionInput width500" type="text" value={nomCommercial} onChange={(e) => { setNomCommercial(e.target.value) }} />
                </div>
              </div>
              <div className="dFlex formSectionInner" >
                <div className="formSectionChamp formSectionLongChamp">
                  <p className="formSectionLabel">E-mail</p>
                  <input className="formSectionInput width500" type="email" value={emailCommercial} onChange={(e) => { setEmailCommercial(e.target.value) }} />
                </div>
              </div>
              <div className="dFlex formSectionInner" >
                <div className="formSectionChamp formSectionLongChamp">
                  <p className="formSectionLabel">Adresse du site</p>
                  <input className="formSectionInput width500" type="text" value={adresseChantier} onChange={(e) => { setAdresseChantier(e.target.value) }} />
                </div>
              </div>
              <div className="dFlex justifyBetween width500 formSectionInner" >
                <div className="formSectionChamp">
                  <p className="formSectionLabel">Code postal</p>
                  <input className="formSectionInput" type="text" value={code_postalCommercial} onChange={(e) => { setCode_postalCommercial(e.target.value) }} />
                </div>
                <div className="formSectionChamp">
                  <p className="formSectionLabel">Ville et cedex</p>
                  <input className="formSectionInput" type="tel" value={ville_cedexCommercial} onChange={(e) => { setVille_cedexCommercial(e.target.value) }} />
                </div>
              </div>
            </div>

            <div className="formSection dFlex justifyCenter alignCenter flexColumn" >
              <h3 className="formSectionNom">Détails facturation</h3>
              <div className="dFlex formSectionInner" >
              <div className="formSectionChamp formSectionLongChamp">
                <p className="formSectionLabel">Client déjà existant</p>
                <select   className="formSectionInput" onChange={handleCustomerSelection}>
                <option value="" style={{ color: 'gray', backgroundColor: 'darkgray' }}>Veuillez selectionner un client</option>
                {data.map((array, index) => (
                  <option key={index} value={index}>
                    {array.map((item, i) => (
                      <span key={i}>{item.identite_client_facturation}</span>
                    ))}
                  </option>
                ))}
              </select>
              </div>
            </div>
              <label for="vehicle1"><input type="checkbox" onChange={checkboxContactHandler} />Identique au contact commercial</label>
              <div className="formSectionInner dFlex justifyBetween width500" >
                <div className="formSectionChamp">
                  <p className="formSectionLabel">Identité facturation</p>
                  <input className="formSectionInput" type="text" name="identite_facturation" value={identiteFacturation} onChange={(e) => { setIdentiteFacturation(e.target.value) }} />
                </div>
                <div className="formSectionChamp">
                  <p className="formSectionLabel">Numéro de télephone</p>
                  <input className="formSectionInput" type="tel" name="telephone" id="phone_facturation" value={phoneFacturation} onChange={(e) => { setPhoneFacturation(e.target.value) }} />
                </div>
              </div>
              <div className="formSectionInner dFlex justifyBetween width500" >
                <div className="formSectionChamp">
                  <p className="formSectionLabel">Nom du contact</p>
                  <input className="formSectionInput" type="text" name="nom_facturation" value={nomFacturation} onChange={(e) => { setNomFacturation(e.target.value) }} />
                </div>
                <div className="formSectionChamp">
                  <p className="formSectionLabel">Nom de la marque</p>
                  <input className="formSectionInput" type="text" name="marque_facturation" value={marqueFacturation} onChange={(e) => { setMarqueFacturation(e.target.value) }} />
                </div>
              </div>
              <div className="dFlex formSectionInner" >
                <div className="formSectionChamp formSectionLongChamp">
                  <p className="formSectionLabel">E-mail pour l'envoi du rapport</p>
                  <input className="formSectionInput width500" type="email" value={emailRapport} onChange={(e) => { setEmailRapport(e.target.value) }} />
                </div>
              </div>
              <div className="dFlex formSectionInner" >
                <div className="formSectionChamp formSectionLongChamp">
                  <p className="formSectionLabel">E-mail</p>
                  <input className="formSectionInput width500" type="email" name="email_facturation" value={emailFacturation} onChange={(e) => { setEmailFacturation(e.target.value) }} />
                </div>
              </div>
              <div className="dFlex formSectionInner" >
                <div className="formSectionChamp formSectionLongChamp">
                  <p className="formSectionLabel">Adresse </p>
                  <input className="formSectionInput width500" type="text" name="adresse_facturation" value={adresseFacturation} onChange={(e) => { setAdresseFacturation(e.target.value) }} />
                </div>
              </div>
              <div className="dFlex justifyBetween width500 formSectionInner" >
                <div className="formSectionChamp">
                  <p className="formSectionLabel">Code postal </p>
                  <input className="formSectionInput" type="text" name="code_postal_facturation" value={code_postalFacturation} onChange={(e) => { setCode_postalFacturation(e.target.value) }} />
                </div>
                <div className="formSectionChamp">
                  <p className="formSectionLabel">Ville et cedex </p>
                  <input className="formSectionInput" type="tel" name="ville_cedex_facturation" value={ville_cedexFacturation} onChange={(e) => { setVille_cedexFacturation(e.target.value) }} />
                </div>
              </div>


            </div>


            <div className="formSection dFlex justifyCenter alignCenter flexColumn" >
              <h3 className="formSectionNom">Informations générales du chantier</h3>
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
                  </select>
                </div>
              </div>
              <div className="formSectionInner dFlex justifyBetween width500" >
                <div className="formSectionChamp">
                  <p className="formSectionLabel">Surface m²</p>
                  <input className="formSectionInput" type="number" pattern="[0-9]" onChange={(e) => { setSurfaceEnM(e.target.value) }} />
                </div>
                <div className="formSectionChamp">

                  <p className="formSectionLabel">Tarif m²</p>
                  <select className="formSectionInput" id="cars" value={tarif} onChange={(e) => { setTarif(e.target.value) }} >
                    <option value="0.75">0,75€</option>
                    <option value="0.5">0,5€</option>

                    <option value="1">1€</option>
                    <option value="1.25">1,25€</option>
                  </select>
                </div>
              </div>
              <div className="formSectionInner dFlex justifyBetween width500" >
                <div className="formSectionChamp">
                  <p className="formSectionLabel">Durée d'intervention totale</p>
                  <input className="formSectionInput" type="text" value={dureeIntervention} onChange={(e) => { setDureeIntervention(e.target.value) }} />
                </div>
                <div className="formSectionChamp">
                  <p className="formSectionLabel">CA HT</p>
                  <input className="formSectionInput" type="number" pattern="[0-9]" value={ca} onChange={(e) => { setCa(e.target.value) }} />
                </div>
              </div>
              <div className="formSectionInner dFlex justifyBetween width500" >
                <div className="formSectionChamp">
                  <p className="formSectionLabel">Date du dernier nettoyage</p>
                  <input className="formSectionInput" type="date" value={dateDernierNettoyage} onChange={(e) => { setdateDernierNettoyage(e.target.value) }} />
                </div>
                <div className="formSectionChamp">
                  <p className="formSectionLabel">Année d'instalation des panneaux</p>
                  <input className="formSectionInput" type="number" min="1900" max="2022" step="1" value={anneeInstalation} onChange={(e) => { setAnneeInstalation(e.target.value) }} />
                </div>
              </div>
            </div>


            <div className="formSection dFlex justifyCenter alignCenter flexColumn" >
              <h3 className="formSectionNom">Détails intervention</h3>
              <div className="formSectionInner dFlex justifyBetween width500" >
                <div className="formSectionChamp">
                  <p className="formSectionLabel">Nombre de batiment</p>
                  <input className="formSectionInput" type="number" pattern="[0-9]" value={nbreBatiment} onChange={(e) => { setPortiqueLavage(e.target.value) }} />
                </div>
                <div className="formSectionChamp">
                  <p className="formSectionLabel">Type de panneau</p>
                  <select className="formSectionInput" id="cars" value={typePanneau} onChange={(e) => { setTypePanneau(e.target.value) }}>
                    <option value="" style={{ color: 'gray', backgroundColor: 'darkgray' }}>...</option>
                    <option value="Petit">Petit</option>
                    <option value="Normal">Normal</option>
                  </select>
                </div>
              </div>
              <div className="formSectionInner dFlex justifyBetween width500" >
                <div className="formSectionChamp">
                  <p className="formSectionLabel">Pourcentage de pente  </p>
                  <input className="formSectionInput" type="number" pattern="[0-9]" value={pente} onChange={(e) => { setPente(e.target.value) }} />
                </div>
                <div className="formSectionChamp">
                  <p className="formSectionLabel">Accessibilité</p>
                  <select className="formSectionInput" id="cars" value={accessibilite} onChange={(e) => { setAccessibilite(e.target.value) }} >
                    <option value="" style={{ color: 'gray', backgroundColor: 'darkgray' }}>...</option>
                    <option value="Côté">Côté</option>
                    <option value="De face">De face </option>

                  </select>
                </div>
              </div>
              <div className="formSectionInner dFlex justifyBetween width500" >
                <div className="formSectionChamp">
                  <p className="formSectionLabel">Eau</p>
                  <select className="formSectionInput" id="cars" value={eau} onChange={(e) => { setEau(e.target.value) }}>
                    <option value="" style={{ color: 'gray', backgroundColor: 'darkgray' }}>...</option>
                    <option value="1">Oui</option>
                    <option value="0">Non</option>
                  </select>
                </div>
                <div className="formSectionChamp">
                  <p className="formSectionLabel">Electricité</p>
                  <select className="formSectionInput" id="cars" value={electricite} onChange={(e) => { setElectricite(e.target.value) }}>
                    <option value="" style={{ color: 'gray', backgroundColor: 'darkgray' }}>...</option>
                    <option value="1">Oui</option>
                    <option value="0">Non</option>
                  </select>
                </div>
              </div>

              <div className="formSectionInner dFlex justifyBetween width500" >
                <div className="formSectionChamp">
                  <p className="formSectionLabel">Hauteur bas de toiture</p>
                  <select className="formSectionInput" id="cars" value={hauteurToiture} onChange={(e) => { setHauteurToiture(e.target.value) }}>
                    <option value="" style={{ color: 'gray', backgroundColor: 'darkgray' }}>...</option>
                    <option value="0">0m</option>
                    <option value="1">1m</option>
                    <option value="2">2m</option>
                    <option value="3">3m</option>
                    <option value="4">4m</option>
                    <option value="5">5m</option>
                    <option value="6">6m</option>
                    <option value="7">7m</option>
                    <option value="8">8m</option>
                    <option value="9">9m</option>
                    <option value="10">10m</option>
                    <option value="11">11m</option>
                    <option value="12">12m</option>
                    <option value="13">13m</option>
                    <option value="14">14m</option>
                    <option value="15">15m</option>
                    <option value="16">16m</option>
                    <option value="17">17m</option>
                    <option value="18">18m</option>
                    <option value="19">19m</option>
                    <option value="20">20m</option>
                  </select>
                </div>
                <div className="formSectionChamp">
                  <p className="formSectionLabel">Volume d'eau</p>
                  <input className="formSectionInput" type="number" pattern="[0-9]"
                    value={volumeEau} onChange={(e) => { setVolumeEau(e.target.value) }} />
                </div>
              </div>
              <div className="dFlex formSectionInner" >
                <div className="formSectionChamp formSectionLongChamp">
                  <p className="formSectionLabel">Commentaires</p>
                  <textarea className="formSectionInput width500"
                    value={commentaires} onChange={(e) => { setCommentaires(e.target.value) }} />
                </div>
              </div>
            </div>
            <div className="dFlex formSectionInner justifyCenter" >

              <button type="submit" style={{ margin: 'auto' }}>
                Ajouter le client
              </button>

            </div>
          </form>
    </div>
  )
}


export default AjoutClientSolaire;