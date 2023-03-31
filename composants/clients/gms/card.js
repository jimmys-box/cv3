import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { encode as base64_encode } from 'base-64';
import axios from 'axios';
import Select from 'react-select'


const GmsCard = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [showGms, setshowGms] = useState(false);
    const handleshowGms = () => setshowGms(true);
    const [disabledField, setDisabledFiel] = useState(true);
    const [hiddenField, setHiddenFiel] = useState(true);

    const id = props.id;
    let logo;
    if (props.logo === null || props.logo === "null" || props.logo === "") {
        logo = "/logo-franchise-placeholder.png";
    } else {
        logo = props.logo;
    }
  
    const nomMagasin2 = props.nomMagasin;
    const phoneCommercial2 = props.phoneCommercial;
    const nomCommercial2 = props.nomCommercial;
    const emailCommercial2 = props.emailCommercial;
    const adresseChantier2 = props.adresseChantier;
    const code_postalCommercial2 = props.code_postalCommercial;
    const ville_cedexCommercial2 = props.ville_cedexCommercial;
    const emailRapport2 = props.emailRapport;
    const equipe2 = props.equipe;
    const franchise2 = props.franchise;
    const [dataFranchise, setDataFranchise] = useState([]);

    const identiteFacturation2 = props.identiteFacturation;
    const phoneFacturation2 = props.phoneFacturation;
    const nomFacturation2 = props.nomFacturation;
    const marqueFacturation2 = props.marqueFacturation;
    const emailFacturation2 = props.emailFacturation;
    const adresseFacturation2 = props.adresseFacturation;
    const code_postalFacturation2 = props.code_postalFacturation;
    const ville_cedexFacturation2 = props.ville_cedexFacturation;


    const dateDernierNettoyage2 = props.dateDernierNettoyage;
    const frequenceNettoyage2 = props.frequenceNettoyage;
    const ca2 = props.ca;
    const interdictionIntervention2 = props.interdictionIntervention;

    const eau2 = props.eau;
    const stationService2 = props.stationService;
    const auvent2 = props.auvent;
    const portiqueLavage2 = props.portiqueLavage;
    const pisteHautePression2 = props.pisteHautePression;
    const abrisChariotsSimple2 = props.abrisChariotsSimple;
    const abrisChariotsDouble2 = props.abrisChariotsDouble;
    const totem2 = props.totem;
    const nombreDairesAspirateurGonflage2 = props.nombreDairesAspirateurGonflage;
    const hauteurBardage2 = props.hauteurBardage;
    const nbrEntreeMagasin2 = props.nbrEntreeMagasin;
    const toitureNettoyable2 = props.toitureNettoyable;
    const gouttiereApparente2 = props.GouttiereApparente;

    const [nomMagasin, setNomMagasin] = useState(nomMagasin2);
    const [phoneCommercial, setPhoneCommercial] = useState(phoneCommercial2);
    const [nomCommercial, setNomCommercial] = useState(nomCommercial2);
    const [emailCommercial, setEmailCommercial] = useState(emailCommercial2);
    const [adresseChantier, setAdresseChantier] = useState(adresseChantier2);
    const [code_postalCommercial, setCode_postalCommercial] = useState(code_postalCommercial2);
    const [ville_cedexCommercial, setVille_cedexCommercial] = useState(ville_cedexCommercial2);
    const [emailRapport, setEmailRapport] = useState(emailRapport2);
    const [equipe, setEquipe] = useState(equipe2);
    const [franchise, setFranchise] = useState(franchise2);
    const [identiteFacturation, setIdentiteFacturation] = useState(identiteFacturation2);
    const [phoneFacturation, setPhoneFacturation] = useState(phoneFacturation2);
    const [nomFacturation, setNomFacturation] = useState(nomFacturation2);
    const [marqueFacturation, setMarqueFacturation] = useState(marqueFacturation2);
    const [emailFacturation, setEmailFacturation] = useState(emailFacturation2);
    const [adresseFacturation, setAdresseFacturation] = useState(adresseFacturation2);
    const [code_postalFacturation, setCode_postalFacturation] = useState(code_postalFacturation2);
    const [ville_cedexFacturation, setVille_cedexFacturation] = useState(ville_cedexFacturation2);


    const [dateDernierNettoyage, setdateDernierNettoyage] = useState(dateDernierNettoyage2);
    const [frequenceNettoyage, setFrequenceNettoyage] = useState(frequenceNettoyage2);
    const [ca, setCa] = useState(ca2);
    const [interdictionIntervention, setInterdictionIntervention] = useState(interdictionIntervention2);

    const [eau, setEau] = useState(eau2);
    const [stationService, setStationService] = useState(stationService2);
    const [auvent, setAuvent] = useState(auvent2);
    const [portiqueLavage, setPortiqueLavage] = useState(portiqueLavage2);
    const [pisteHautePression, setPisteHautePression] = useState(pisteHautePression2);
    const [abrisChariotsSimple, setAbrisChariotsSimple] = useState(abrisChariotsSimple2);
    const [abrisChariotsDouble, setAbrisChariotsDouble] = useState(abrisChariotsDouble2);
    const [totem, setTotem] = useState(totem2);
    const [nombreDairesAspirateurGonflage, setNombreDairesAspirateurGonflage] = useState(nombreDairesAspirateurGonflage2);
    const [hauteurBardage, setHauteurBardage] = useState(hauteurBardage2);
    const [nbrEntreeMagasin, setNbrEntreeMagasin] = useState(nbrEntreeMagasin2);
    const [toitureNettoyable, setToitureNettoyable] = useState(toitureNettoyable2);
    const [gouttiereApparente, setGouttiereApparente] = useState(gouttiereApparente2);

    const [selected1, setSelected1] = useState("selected");

    const submitHandler = (e) => {

        // Empêche le rechargement de la page
        e.preventDefault();

        // Déclaration des paramètres de requête API
        let headers = { "Content-Type": "application/json" };
        let url = `https://espacepro.jimmys-box.com/wp-json/capvert/gms-chantier/mettreajour?idchantier=${id}&identitefacturation=${identiteFacturation}&telephonefacturation=${phoneFacturation}&nomcontactfacturation=${marqueFacturation}&nommagasinfacturation=${nomMagasin}&emailfacturation=${emailFacturation}&adressefacturation=${adresseFacturation}&codepostalfacturation=${code_postalFacturation}&villefacturation=${ville_cedexFacturation}&identitecommercial=${nomCommercial}&adressechantier=${adresseChantier}&codepostalcommercial=${code_postalCommercial}&emailcommercial=${emailCommercial}&villecommercial=${ville_cedexCommercial}&telephonecommercial=${phoneCommercial}&datedederniernettoyage=${dateDernierNettoyage}&caht=${ca}&interdictiondintervention=${interdictionIntervention}&acceseau=${eau}&caracteristiquesdelastationservice=${stationService}&nombredeportiquesdelavage=${portiqueLavage}&nombredepisteshautepression=${pisteHautePression}&typeauvent=${auvent}&totem=${totem}&nombredabrischariotsdoubles=${abrisChariotsDouble}&nombredabrischariotssimples=${abrisChariotsSimple}&nombredairesaspirateurgonflage=${nombreDairesAspirateurGonflage}&nombreentreesdemagasin=${nbrEntreeMagasin}&hauteurdubardage=${hauteurBardage}&nettoyabilitetoiture=${toitureNettoyable}&visibilitegouttiere=${gouttiereApparente}&equipe=${equipe}&emailrapport=${emailRapport}&idfranchise=${franchise}`;

        // Appel API en requête GET
        axios.get(url, headers)
            .then(response => {
                alert('Client mis à jour');
                setDisabledFiel(true);
                setHiddenFiel(true);
                setshowGms(false);
               
            })
            .catch(err => {
                console.error(err);

            });

    }
    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            color: state.isFocused ? '#a0c951' : 'black'
        }),
    };
    const handleDelete = (e) => {
        if (window.confirm("Voulez-vous vraiment supprimer ce client ?") === true) {
            setDisabledFiel(true);
            setHiddenFiel(true);
            setshowGms(false);

            // Empêche le rechargement de la page
            e.preventDefault();

            // Déclaration des paramètres de requête API
            let url = `https://espacepro.jimmys-box.com/wp-json/capvert/gms-chantier/supprimer?idchantier=${id}`;

            // Appel API en requête GET
            axios.get(url, headers)
                .then(response => {

                })
                .catch(err => {
                    console.error(err);

                });
        } else {

        }
        window.location.reload(false);
    }
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

    const handleEdit = () => {
        setDisabledFiel(false);
        setHiddenFiel(false);
    }
    const handleClose = () => {
        if (disabledField === true) {
            setshowGms(false);
        }
        else if (window.confirm("Voulez-vous vraiment annuler ?") === true) {
            setDisabledFiel(true);
            setHiddenFiel(true);
            setshowGms(false);
        } else {

        }

    };
    const onChangeAuvent = (options) => {
        setAuvent(options.map(opt => opt.value));

    }


    const checkboxInterdictionHandler = () => {
        setInterdictionIntervention(1);

    };

    const handleFranchiseSelection = (event) => {
        const index = event.target.value;
        setFranchise(index)
    };
    return (
        <>
            <div onClick={handleshowGms} className="ficheClientOuterContainer">
                <img width="75" src={logo} />
                <p className='nomFicheClient'>{nomMagasin}</p>
                <p className='texteFicheClient'>{ville_cedexCommercial}</p>
                <p className='texteFicheClient'>Dernier nettoyage : </p>
                <p className='texteFicheClient'>{dateDernierNettoyage}</p>
            </div>

            <Modal
                show={showGms} onHide={handleClose}
                className="modalGestionForm"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <img height="50" style={{ marginRight: 10 }} src={logo} />
                        <p className='nomFicheClient' style={{ marginBottom: 0, marginRight: 10 }}>{nomMagasin}</p>
                        <p className='texteFicheClient'>{code_postalCommercial},  {ville_cedexCommercial}</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={submitHandler}>
                        <div className="formSection dFlex justifyCenter alignCenter flexColumn" >
                            <h3 className="formSectionNom">Identité Chantier</h3>
                            <div className="formSectionInner dFlex justifyBetween width500" >
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Nom du magasin</p>
                                    <input disabled={disabledField} className="formSectionInput" type="text" value={nomCommercial} onChange={(e) => { setNomCommercial(e.target.value) }} />
                                </div>
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Numéro de télephone</p>
                                    <input disabled={disabledField} className="formSectionInput" type="tel" value={phoneCommercial} onChange={(e) => { setPhoneCommercial(e.target.value) }} />
                                </div>
                            </div>
                            {/* <div className="dFlex formSectionInner" >
                                <div className="formSectionChamp formSectionLongChamp">
                                    <p className="formSectionLabel">Nom du contact</p>
                                    <input disabled={disabledField} className="formSectionInput width500" type="text" value={nomCommercial} onChange={(e) => { setNomCommercial(e.target.value) }} />
                                </div>
                            </div> */}
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
                                    <select disabled={disabledField} className="formSectionInput" onChange={handleFranchiseSelection}>
                                        <option value={franchise}>{franchise}</option>
                                        {dataFranchise.map((item, index) => (
                                            <option key={index} value={item.id}>

                                                {item.nom_franchise}

                                            </option>
                                        ))}
                                    </select>
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
                            <div className="dFlex formSectionInner" >
                                <div className="formSectionChamp formSectionLongChamp">
                                    <p className="formSectionLabel">E-mail pour l'envoi du rapport</p>
                                    <input disabled={disabledField} className="formSectionInput width500" type="email" value={emailRapport} onChange={(e) => { setEmailRapport(e.target.value) }} />
                                </div>
                            </div>
                            <div className="formSectionInner dFlex justifyBetween width500" >
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Date du dernier nettoyage ({dateDernierNettoyage})</p>
                                    <input disabled={disabledField} className="formSectionInput" id="datePicker" type="date" onChange={(e) => { setdateDernierNettoyage(e.target.value) }} />
                                </div>
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Fréquence de Nettoyage</p>
                                    <select disabled={disabledField} className="formSectionInput" name={frequenceNettoyage} id="frequence-de-nettoyage" onChange={(e) => { setFrequenceNettoyage(e.target.value) }}>
                                        <option value={frequenceNettoyage}>{frequenceNettoyage}</option>
                                        <option value="mensuel">mensuel</option>
                                        <option value="bimestrielle">bimestrielle</option>
                                        <option value="trimestrielle">trimestrielle</option>
                                        <option value="quadrimestrielle">quadrimestrielle</option>
                                        <option value="Semestrielle">Semestrielle</option>
                                        <option value="annuel" >annuel</option>
                                    </select>
                                </div>
                            </div>
                            <div className="formSectionInner dFlex justifyBetween width500" >
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">CA HT</p>
                                    <input disabled={disabledField} className="formSectionInput" type="number" pattern="[0-9]" value={ca} onChange={(e) => { setCa(e.target.value) }} />
                                </div>
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Interdiction d'intervention</p>
                                    <label for="vehicle1"><input disabled={disabledField} type="checkbox" id="ineterdiction-intervention" name={interdictionIntervention} onChange={checkboxInterdictionHandler} /></label>
                                </div>
                            </div>
                        </div>


                        <div className="formSection dFlex justifyCenter alignCenter flexColumn" >
                            <h3 className="formSectionNom">Détails intervention</h3>
                            <div className="formSectionInner dFlex justifyBetween width500" >
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Equipe</p>
                                    <select disabled={disabledField} className="formSectionInput" name={equipe} id="equipe" onChange={(e) => { setEquipe(e.target.value) }}>
                                        <option value={equipe}>{equipe}</option>
                                        <option value="G1">G1</option>
                                        <option value="G2">G2</option>
                                        <option value="G3">G3</option>
                                        <option value="G4">G4</option>
                                        <option value="G5">G5</option>
                                    </select>
                                </div>

                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Station service</p>
                                    <select disabled={disabledField} className="formSectionInput" name={stationService} id="station-service" onChange={(e) => { setStationService(e.target.value) }}>
                                        <option value={stationService}>{stationService}</option>
                                        <option value="1 volucompteur / 2 pistes">1 volucompteur / 2 pistes</option>
                                        <option value="2 volucompteurs / 4 pistes">2 volucompteurs / 4 pistes</option>
                                        <option value="3 volucompteurs / 6 pistes">3 volucompteurs / 6 pistes</option>
                                        <option value="4 volucompteurs / 8 pistes">4 volucompteurs / 8 pistes</option>
                                        <option value="5 volucompteurs / 10 pistes">5 volucompteurs / 10 pistes</option>
                                        <option value="6 volucompteurs / 10 pistes">6 volucompteurs / 10 pistes</option>
                                        <option value="Autre">Autre</option>
                                    </select>
                                </div>
                            </div>
                            <div className="formSectionInner dFlex justifyBetween width500" >

                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Auvent</p>
                                    <Select
                                        disabled={disabledField}
                                        closeMenuOnSelect={false}
                                        isMulti
                                        defaultValue={auvent}
                                        styles={customStyles}
                                        isDisabled={disabledField}
                                        options={[
                                            { value: 'station service', label: 'station service' },
                                            { value: 'station de lavage', label: 'station de lavage' },
                                            { value: 'drive', label: 'drive' },
                                            { value: 'entrée de magasin', label: 'entrée de magasin' }
                                        ]}
                                        onChange={onChangeAuvent}
                                    />

                                </div>
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Eau</p>
                                    <select disabled={disabledField} className="formSectionInput" name={eau} id="eau-disponible" onChange={(e) => { setEau(e.target.value) }}>
                                        <option value={eau}>{eau}</option>
                                        <option value="1">Oui</option>
                                        <option value="0">Non</option>
                                    </select>
                                </div>
                            </div>
                            <p className="formSectionLabel" style={{ marginTop: 25, marginBottom: 0 }}>Station de lavage</p>
                            <div className="formSectionInner dFlex justifyBetween width500" >
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Portique de lavage</p>
                                    <select disabled={disabledField} className="formSectionInput" name={portiqueLavage} id="portique-lavage" onChange={(e) => { setPortiqueLavage(e.target.value) }}>
                                        <option value={portiqueLavage}>{portiqueLavage}</option>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                </div>
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Pistes haute pression</p>
                                    <select disabled={disabledField} className="formSectionInput" name={pisteHautePression} id="piste-haute-pression" onChange={(e) => { setPisteHautePression(e.target.value) }}>
                                        <option value={pisteHautePression}>{pisteHautePression}</option>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                </div>
                            </div>
                            <p className="formSectionLabel" style={{ marginTop: 25, marginBottom: 0 }}>Abris chariots</p>
                            <div className="formSectionInner dFlex justifyBetween width500" >
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Simple</p>
                                    <select disabled={disabledField} className="formSectionInput" name={abrisChariotsSimple} id="abris-chariots-simple" onChange={(e) => { setAbrisChariotsSimple(e.target.value) }}>
                                        <option value={abrisChariotsSimple}>{abrisChariotsSimple}</option>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                        <option value="13">13</option>
                                        <option value="14">14</option>
                                        <option value="15">15</option>
                                        <option value="16">16</option>
                                        <option value="17">17</option>
                                        <option value="18">18</option>
                                        <option value="19">19</option>
                                        <option value="20">20</option>
                                    </select>
                                </div>
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Double</p>
                                    <select disabled={disabledField} className="formSectionInput" name={abrisChariotsDouble} id="abris-chariots-double" onChange={(e) => { setAbrisChariotsDouble(e.target.value) }}>
                                        <option value={abrisChariotsDouble}>{abrisChariotsDouble}</option>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                        <option value="13">13</option>
                                        <option value="14">14</option>
                                        <option value="15">15</option>
                                        <option value="16">16</option>
                                        <option value="17">17</option>
                                        <option value="18">18</option>
                                        <option value="19">19</option>
                                        <option value="20">20</option>
                                    </select>
                                </div>
                            </div>
                            <div className="formSectionInner dFlex justifyBetween width500" >
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Totem</p>
                                    <input disabled={disabledField} className="formSectionInput" type="text" value={totem} onChange={(e) => { setTotem(e.target.value) }} />
                                </div>
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Aire aspirateur et gonflage</p>
                                    <select disabled={disabledField} className="formSectionInput" name={nombreDairesAspirateurGonflage} id="aire-aspirateur-gonflage" onChange={(e) => { setNombreDairesAspirateurGonflage(e.target.value) }}>
                                        <option value={nombreDairesAspirateurGonflage}>{nombreDairesAspirateurGonflage}</option>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                            </div>
                            <div className="formSectionInner dFlex justifyBetween width500" >
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Hauteur bardage</p>
                                    <select disabled={disabledField} className="formSectionInput" name={hauteurBardage} id="hauteur-bardage" onChange={(e) => { setHauteurBardage(e.target.value) }}>
                                        <option value={hauteurBardage}>{hauteurBardage}</option>
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
                                    <p className="formSectionLabel">Entrée magasin</p>
                                    <select disabled={disabledField} className="formSectionInput" name={nbrEntreeMagasin} id="entree-magasin" onChange={(e) => { setNbrEntreeMagasin(e.target.value) }}>
                                        <option value={nbrEntreeMagasin}>{nbrEntreeMagasin}</option>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                </div>
                            </div>
                            <div className="formSectionInner dFlex justifyBetween width500" >
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Toiture nettoyable</p>
                                    <select disabled={disabledField} className="formSectionInput" name={toitureNettoyable} id="toiture-nettoyable" onChange={(e) => { setToitureNettoyable(e.target.value) }}>
                                        <option value={toitureNettoyable}>{toitureNettoyable}</option>
                                        <option value="1">Oui</option>
                                        <option value="0">Non</option>
                                    </select>
                                </div>
                                <div className="formSectionChamp">
                                    <p className="formSectionLabel">Gouttière Apparente</p>
                                    <select disabled={disabledField} className="formSectionInput" name={gouttiereApparente} id="gouttiere-apparente" onChange={(e) => { setGouttiereApparente(e.target.value) }}>
                                        <option value={gouttiereApparente}>{gouttiereApparente}</option>
                                        <option value="1">Oui</option>
                                        <option value="0">Non</option>
                                    </select>
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

export default GmsCard