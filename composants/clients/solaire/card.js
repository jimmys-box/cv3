import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { encode as base64_encode } from 'base-64';
import axios from 'axios';
const SolairesCard = (props) => {
    const [showSolaires, setshowSolaires] = useState(false);
    const handleshowSolaires = () => setshowSolaires(true);
    const [disabledField, setDisabledFiel] = useState(true);
    const [hiddenField, setHiddenFiel] = useState(true);

    const id = props.id;
    let logoBrut;
    if (props.logo === null || props.logo === "null" || props.logo === "") {
        logoBrut = "";
      } else {
        logoBrut = props.logo;
      }
      
    const logo = logoBrut.toLowerCase().replace(/ /g, '').normalize("NFD").replace(/\p{Diacritic}/gu, "");

    const nomMagasin2 = props.nomMagasin;
    const phoneCommercial2 = props.phoneCommercial;
    const nomCommercial2 = props.nomCommercial;
    const emailCommercial2 = props.emailCommercial;
    const adresseChantier2 = props.adresseChantier;
    const code_postalCommercial2 = props.code_postalCommercial;
    const ville_cedexCommercial2 = props.ville_cedexCommercial;
    const emailRapport2 = props.emailRapport;
    const equipe2 = props.equipe;

    const identiteFacturation2 = props.identiteFacturation;
    const phoneFacturation2 = props.phoneFacturation;
    const nomFacturation2 = props.nomFacturation;
    const marqueFacturation2 = props.marqueFacturation;
    const emailFacturation2 = props.emailFacturation;
    const adresseFacturation2 = props.adresseFacturation;
    const code_postalFacturation2 = props.code_postalFacturation;
    const ville_cedexFacturation2 = props.ville_cedexFacturation;

    const surfaceEnM2 = props.surfaceEnM;
    const dureeIntervention2 = props.dureeIntervention;
    const ca2 = props.ca;
    const dateDernierNettoyage2 = props.dateDernierNettoyage;
    const anneeInstalation2 = props.anneeInstalation;

    const nbreBatiment2 = props.nbreBatiment;
    const typePanneau2 = props.typePanneau;
    const pente2 = props.pente;
    const accessibilite2 = props.accessibilite;
    const eau2 = props.eau;
    const electricite2 = props.electricite;
    const hauteurToiture2 = props.hauteurToiture;
    const volumeEau2 = props.volumeEau;
    const commentaires2 = props.commentaires;

    const [nomMagasin, setNomMagasin] = useState(nomMagasin2);
    const [phoneCommercial, setPhoneCommercial] = useState(phoneCommercial2);
    const [nomCommercial, setNomCommercial] = useState(nomCommercial2);
    const [emailCommercial, setEmailCommercial] = useState(emailCommercial2);
    const [adresseChantier, setAdresseChantier] = useState(adresseChantier2);
    const [code_postalCommercial, setCode_postalCommercial] = useState(code_postalCommercial2);
    const [ville_cedexCommercial, setVille_cedexCommercial] = useState(ville_cedexCommercial2);
    const [emailRapport, setEmailRapport] = useState(emailRapport2);
const [equipe, setEquipe] = useState(equipe2)

    const [identiteFacturation, setIdentiteFacturation] = useState(identiteFacturation2);
    const [phoneFacturation, setPhoneFacturation] = useState(phoneFacturation2);
    const [nomFacturation, setNomFacturation] = useState(nomFacturation2);
    const [marqueFacturation, setMarqueFacturation] = useState(marqueFacturation2);
    const [emailFacturation, setEmailFacturation] = useState(emailFacturation2);
    const [adresseFacturation, setAdresseFacturation] = useState(adresseFacturation2);
    const [code_postalFacturation, setCode_postalFacturation] = useState(code_postalFacturation2);
    const [ville_cedexFacturation, setVille_cedexFacturation] = useState(ville_cedexFacturation2);

    const [surfaceEnM, setSurfaceEnM] = useState(surfaceEnM2);
    const [tarif, setTarif] = useState('0,75');
    const [dureeIntervention, setDureeIntervention] = useState(dureeIntervention2);
    const [ca, setCa] = useState(ca2);
    const [dateDernierNettoyage, setdateDernierNettoyage] = useState(dateDernierNettoyage2);
    const [anneeInstalation, setAnneeInstalation] = useState(anneeInstalation2);

    const [nbreBatiment, setPortiqueLavage] = useState(nbreBatiment2);
    const [typePanneau, setTypePanneau] = useState(typePanneau2);
    const [pente, setPente] = useState(pente2);
    const [accessibilite, setAccessibilite] = useState(accessibilite2);
    const [eau, setEau] = useState(eau2);
    const [electricite, setElectricite] = useState(electricite2);
    const [hauteurToiture, setHauteurToiture] = useState(hauteurToiture2);
    const [volumeEau, setVolumeEau] = useState(volumeEau2);
    const [commentaires, setCommentaires] = useState(commentaires2);




    const submitHandler = (e) => {

        // Empêche le rechargement de la page
        e.preventDefault();

        // Déclaration des paramètres de requête API
        let token = "kevin:1DPX hxdj 9R5C qSLn Ga8k qWV9";
        let encodedToken = base64_encode(token);
        let headers = { "Content-Type": "application/json"};
        let url = `https://espacepro.jimmys-box.com/wp-json/capvert/solaire-chantier/mettreajour?idchantier=${id}&identitefacturation=${identiteFacturation}&telephonefacturation=${phoneFacturation}&nomcontactfacturation=${nomFacturation}&nommagasinfacturation=${marqueFacturation}&emailfacturation=${emailFacturation}&adressefacturation=${adresseFacturation}&codepostalfacturation=${code_postalFacturation}&villefacturation=${ville_cedexFacturation}&identitecommercial=${nomMagasin}&adressechantier=${adresseChantier}&codepostalcommercial=${code_postalCommercial}&emailcommercial=${emailCommercial}&villecommercial=${ville_cedexCommercial}&telephonecommercial=${phoneCommercial}&datedederniernettoyage=${dateDernierNettoyage}&frequencedenettoyage=&caht=${ca}&acceseau=${eau}&surface=${surfaceEnM}&tarifaumetrecarre=${tarif}&dureetotaledintervention=${dureeIntervention}&anneeinstallationpanneaux=${anneeInstalation}&nombredebatiments=${nbreBatiment}&typepanneaux=${typePanneau}&pourcentagedepente=${pente}&accessibilite=${accessibilite}&acceselectricite=${electricite}&hauteurbasdetoiture=${hauteurToiture}&volumedeau=${volumeEau}&commentaires=${commentaires}&equipe=${equipe}&emailrapport=${emailRapport}`;

        // Appel API en requête GET 
        axios.get(url, headers)
            .then(response => {
                alert('Client mis à jour');
                setDisabledFiel(true);
                setHiddenFiel(true);
                setshowSolaires(false);
            })
            .catch(err => {
                console.error(err);
               

            });

    }

    const handleDelete = (e) => {
        if (window.confirm("Voulez-vous vraiment supprimer ce client ?") === true) {
            setDisabledFiel(true);
            setHiddenFiel(true);
            setshowSolaires(false);

            // Empêche le rechargement de la page
            e.preventDefault();

            // Déclaration des paramètres de requête API
            let token = "kevin:1DPX hxdj 9R5C qSLn Ga8k qWV9";
            let encodedToken = base64_encode(token);
            let headers = { "Content-Type": "application/json" };
            let url = `https://espacepro.jimmys-box.com/wp-json/capvert/solaire-chantier/supprimer?idchantier=${id}`;

            // Appel API en requête GET
            axios.get(url, headers)
                .then(response => {
                    console.log(response);
                })
                .catch(err => {
                    console.error(err);

                });
        } else {

        }
        window.location.reload(false);
    }

    const handleEdit = () => {
        setDisabledFiel(false);
        setHiddenFiel(false);
    }
    const handleClose = () => {
        if (disabledField === true) {
            setshowSolaires(false);
        }
        else if (window.confirm("Voulez-vous vraiment annuler ?") === true) {
            setDisabledFiel(true);
            setHiddenFiel(true);
            setshowSolaires(false);
        } else {

        }

    };

    const options = [
        { value: 'station service', label: 'station service' },
        { value: 'station de lavage', label: 'station de lavage' },
        { value: 'drive', label: 'drive' },
        { value: 'entrée de magasin', label: 'entrée de magasin' }
    ]



    //disabled={disabledField} 
    return (
        <>
            <div onClick={handleshowSolaires} className="ficheClientOuterContainer">
            <img width="75" src={`/logo/logo-${logo}.png`} />
                <p className='nomFicheClient'>{nomMagasin}</p>
                <p className='texteFicheClient'>{ville_cedexCommercial}</p>
                <p className='texteFicheClient'>Dernier nettoyage : </p>
                <p className='texteFicheClient'>{dateDernierNettoyage}</p>
            </div>


            <Modal
                show={showSolaires} onHide={handleClose}
                className="modalGestionForm"
            >
                <Modal.Header closeButton>
                    <Modal.Title style={{flexWrap:'wrap'}}>      
                    <img height="50"  style={{ marginRight: 10 }} src={`/logo/logo-${logo}-mini.png`} /> 
                        <p className='nomFicheClient' style={{ marginBottom: 0, marginRight: 10 }}>{nomMagasin}</p>
                        <p className='texteFicheClient'>{code_postalCommercial},  {ville_cedexCommercial}</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={submitHandler}>

                        <div className="formSection dFlex justifyCenter alignCenter flexColumn" >
                            <h3 className="formSectionNom">Identité client</h3>
                            <div className="formSectionInner dFlex justifyBetween width500" >
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Nom du magasin</p>
                                    <input disabled={disabledField} className="formSectionInput" type="text" value={nomMagasin} onChange={(e) => { setNomMagasin(e.target.value) }} />
                                </div>
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Numéro de télephone</p>
                                    <input disabled={disabledField} className="formSectionInput" type="tel" value={phoneCommercial} onChange={(e) => { setPhoneCommercial(e.target.value) }} />
                                </div>
                            </div>
                            <div className="dFlex formSectionInner" >
                                <div className="formSectionChamp formSectionLongChamp">
                                    <p className="formSectionLabel">Nom du contact</p>
                                    <input disabled={disabledField} className="formSectionInput width500" type="text" value={nomCommercial} onChange={(e) => { setNomCommercial(e.target.value) }} />
                                </div>
                            </div>
                            <div className="dFlex formSectionInner" >
                                <div className="formSectionChamp formSectionLongChamp">
                                    <p className="formSectionLabel">E-mail</p>
                                    <input disabled={disabledField} className="formSectionInput width500" type="email" value={emailCommercial} onChange={(e) => { setEmailCommercial(e.target.value) }} />
                                </div>
                            </div>
                            <div className="dFlex formSectionInner" >
                                <div className="formSectionChamp formSectionLongChamp">
                                    <p className="formSectionLabel">Adresse du site</p>
                                    <input disabled={disabledField} className="formSectionInput width500" type="text" value={adresseChantier} onChange={(e) => { setAdresseChantier(e.target.value) }} />
                                </div>
                            </div>
                            <div className="dFlex justifyBetween width500 formSectionInner" >
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Code postal</p>
                                    <input disabled={disabledField} className="formSectionInput" type="text" value={code_postalCommercial} onChange={(e) => { setCode_postalCommercial(e.target.value) }} />
                                </div>
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Ville et cedex</p>
                                    <input disabled={disabledField} className="formSectionInput" type="tel" value={ville_cedexCommercial} onChange={(e) => { setVille_cedexCommercial(e.target.value) }} />
                                </div>
                            </div>
                        </div>

                        <div className="formSection dFlex justifyCenter alignCenter flexColumn" >
                            <h3 className="formSectionNom">Détails facturation</h3>
                            <div className="formSectionInner dFlex justifyBetween width500" >
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Identité facturation</p>
                                    <input disabled={disabledField} className="formSectionInput" type="text" name="identite_facturation" value={identiteFacturation} onChange={(e) => { setIdentiteFacturation(e.target.value) }} />
                                </div>
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Numéro de télephone</p>
                                    <input disabled={disabledField} className="formSectionInput" type="tel" name="telephone" id="phone_facturation" value={phoneFacturation} onChange={(e) => { setPhoneFacturation(e.target.value) }} />
                                </div>
                            </div>
                            <div className="formSectionInner dFlex justifyBetween width500" >
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Nom du contact</p>
                                    <input disabled={disabledField} className="formSectionInput" type="text" name="nom_facturation" value={nomFacturation} onChange={(e) => { setNomFacturation(e.target.value) }} />
                                </div>
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Nom de la marque</p>
                                    <input disabled={disabledField} className="formSectionInput" type="text" name="marque_facturation" value={marqueFacturation} onChange={(e) => { setMarqueFacturation(e.target.value) }} />
                                </div>
                            </div>
                            <div className="dFlex formSectionInner" >
                            <div className="formSectionChamp formSectionLongChamp">
                            <p className="formSectionLabel">E-mail pour l'envoi du rapport</p>
                            <input disabled={disabledField} className="formSectionInput width500" type="email" value={emailRapport} onChange={(e) => { setEmailRapport(e.target.value) }} />
                          </div>
                          </div>
                            <div className="dFlex formSectionInner" >
                                <div className="formSectionChamp formSectionLongChamp">
                                    <p className="formSectionLabel">E-mail</p>
                                    <input disabled={disabledField} className="formSectionInput width500" type="email" name="email_facturation" value={emailFacturation} onChange={(e) => { setEmailFacturation(e.target.value) }} />
                                </div>
                            </div>
                            <div className="dFlex formSectionInner" >
                                <div className="formSectionChamp formSectionLongChamp">
                                    <p className="formSectionLabel">Adresse </p>
                                    <input disabled={disabledField} className="formSectionInput width500" type="text" name="adresse_facturation" value={adresseFacturation} onChange={(e) => { setAdresseFacturation(e.target.value) }} />
                                </div>
                            </div>
                            <div className="dFlex justifyBetween width500 formSectionInner" >
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Code postal </p>
                                    <input disabled={disabledField} className="formSectionInput" type="text" name="code_postal_facturation" value={code_postalFacturation} onChange={(e) => { setCode_postalFacturation(e.target.value) }} />
                                </div>
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Ville et cedex </p>
                                    <input disabled={disabledField} className="formSectionInput" type="tel" name="ville_cedex_facturation" value={ville_cedexFacturation} onChange={(e) => { setVille_cedexFacturation(e.target.value) }} />
                                </div>
                            </div>


                        </div>


                        <div className="formSection dFlex justifyCenter alignCenter flexColumn" >
                            <h3 className="formSectionNom">Informations générales du chantier</h3>
                            <div className="formSectionInner dFlex justifyBetween width500" >
                            <div className="formSectionChamp">
                                <p className="formSectionLabel">Equipe</p>
                                <select disabled={disabledField} className="formSectionInput" name={equipe} id="equipe" onChange={(e) => { setEquipe(e.target.value) }}>
                                <option value={equipe}>{equipe}</option>
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
                                    <input disabled={disabledField} className="formSectionInput" value={surfaceEnM} type="number" pattern="[0-9]" onChange={(e) => { setSurfaceEnM(e.target.value) }} />
                                </div>
                                <div className="formSectionChamp">

                                    <p className="formSectionLabel">Tarif m²</p>
                                    <select disabled={disabledField} className="formSectionInput" value={tarif} onChange={(e) => { setTarif(e.target.value) }} >
                                        <option value="0,75">0,75€</option>
                                        <option value="0,5">0,5€</option>

                                        <option value="1">1€</option>
                                        <option value="1,25">1,25€</option>
                                    </select>
                                </div>
                            </div>
                            <div className="formSectionInner dFlex justifyBetween width500" >
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Durée d'intervention totale</p>
                                    <input disabled={disabledField} className="formSectionInput" type="text" value={dureeIntervention} onChange={(e) => { setDureeIntervention(e.target.value) }} />
                                </div>
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">CA HT</p>
                                    <input disabled={disabledField} className="formSectionInput" type="number" pattern="[0-9]" value={ca} onChange={(e) => { setCa(e.target.value) }} />
                                </div>
                            </div>
                            <div className="formSectionInner dFlex justifyBetween width500" >
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Date du dernier nettoyage</p>
                                    <input disabled={disabledField} className="formSectionInput" type="date" value={dateDernierNettoyage} onChange={(e) => { setdateDernierNettoyage(e.target.value) }} />
                                </div>
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Année d'instalation des panneaux</p>
                                    <input disabled={disabledField} className="formSectionInput" type="number" min="1900" max="2022" step="1" value={anneeInstalation} onChange={(e) => { setAnneeInstalation(e.target.value) }} />
                                </div>
                            </div>
                        </div>


                        <div className="formSection dFlex justifyCenter alignCenter flexColumn" >
                            <h3 className="formSectionNom">Détails du chantier</h3>
                            <div className="formSectionInner dFlex justifyBetween width500" >
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Nombre de batiment</p>
                                    <input disabled={disabledField} className="formSectionInput" type="number" pattern="[0-9]" value={nbreBatiment} onChange={(e) => { setPortiqueLavage(e.target.value) }} />
                                </div>
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Type de panneau</p>
                                    <select disabled={disabledField} className="formSectionInput" value={typePanneau} onChange={(e) => { setTypePanneau(e.target.value) }}>
                                        <option value={typePanneau}>{typePanneau}</option>
                                        <option value="Petit">Petit</option>
                                        <option value="Normal">Normal</option>
                                    </select>
                                </div>
                            </div>
                            <div className="formSectionInner dFlex justifyBetween width500" >
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Pourcentage de pente  </p>
                                    <input disabled={disabledField} className="formSectionInput" type="number" pattern="[0-9]" value={pente} onChange={(e) => { setPente(e.target.value) }} />
                                </div>
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Accessibilité</p>
                                    <select disabled={disabledField} className="formSectionInput" value={accessibilite} onChange={(e) => { setAccessibilite(e.target.value) }} >
                                        <option value={accessibilite}>{accessibilite}</option>
                                        <option value="Côté">Côté</option>
                                        <option value="De face">De face </option>

                                    </select>
                                </div>
                            </div>
                            <div className="formSectionInner dFlex justifyBetween width500" >
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Eau</p>
                                    <select disabled={disabledField} className="formSectionInput" value={eau} onChange={(e) => { setEau(e.target.value) }}>
                                        <option value={eau}>{eau}</option>
                                        <option value="1">Oui</option>
                                        <option value="0">Non</option>
                                    </select>
                                </div>
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Electricité</p>
                                    <select disabled={disabledField} className="formSectionInput" value={electricite} onChange={(e) => { setElectricite(e.target.value) }}>
                                        <option value={electricite}>{electricite}</option>
                                        <option value="1">Oui</option>
                                        <option value="0">Non</option>
                                    </select>
                                </div>
                            </div>

                            <div className="formSectionInner dFlex justifyBetween width500" >
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Hauteur bas de toiture</p>
                                    <select disabled={disabledField} className="formSectionInput" value={hauteurToiture} onChange={(e) => { setHauteurToiture(e.target.value) }}>
                                        <option value={hauteurToiture}>{hauteurToiture}</option>
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
                                    <input disabled={disabledField} className="formSectionInput" type="number" pattern="[0-9]"
                                        value={volumeEau} onChange={(e) => { setVolumeEau(e.target.value) }} />
                                </div>
                            </div>
                            <div className="dFlex formSectionInner" >
                                <div className="formSectionChamp formSectionLongChamp">
                                    <p className="formSectionLabel">Commentaires</p>
                                    <textarea disabled={disabledField} className="formSectionInput width500"
                                        value={commentaires} onChange={(e) => { setCommentaires(e.target.value) }} />
                                </div>
                            </div>










                        </div>


                        <div className="dFlex formSectionInner justifyCenter" >

                            <button hidden={hiddenField} type="submit" style={{ margin: 'auto' }}>
                                Enregistrer les modifications
                            </button>

                        </div>
                    </form>






                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fermer
                    </Button>
                    <div>
                        <Button variant="danger" onClick={handleDelete}>
                            Supprimer
                        </Button>
                        <Button variant="primary" onClick={handleEdit}>
                            Editer
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default SolairesCard