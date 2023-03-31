import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select'


const AjoutClientGms = () => {
    const [isLoading, setLoading] = useState(true);
    const [q, setQ] = useState('');
    const [searchTerm] = useState(["ville_commercial"]);
    const [data, setData] = useState([]);
    const [dataFranchise, setDataFranchise] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const [franchise, setFranchise] = useState(null);

    const [nomMagasin, setNomMagasin] = useState('');
    const [phoneCommercial, setPhoneCommercial] = useState('');
    const [nomCommercial, setNomCommercial] = useState('');
    const [emailCommercial, setEmailCommercial] = useState('');
    const [adresseChantier, setAdresseChantier] = useState('');
    const [code_postalCommercial, setCode_postalCommercial] = useState('');
    const [ville_cedexCommercial, setVille_cedexCommercial] = useState('');
    const [emailRapport, setEmailRapport] = useState('');


    const [identiteFacturation, setIdentiteFacturation] = useState('');
    const [phoneFacturation, setPhoneFacturation] = useState('');
    const [nomFacturation, setNomFacturation] = useState('');
    const [marqueFacturation, setMarqueFacturation] = useState('');
    const [emailFacturation, setEmailFacturation] = useState('');
    const [adresseFacturation, setAdresseFacturation] = useState('');
    const [code_postalFacturation, setCode_postalFacturation] = useState('');
    const [ville_cedexFacturation, setVille_cedexFacturation] = useState('');


    const [dateDernierNettoyage, setdateDernierNettoyage] = useState('');
    const [frequenceNettoyage, setFrequenceNettoyage] = useState('');
    const [ca, setCa] = useState('');
    const [interdictionIntervention, setInterdictionIntervention] = useState(0);
    const [equipe, setEquipe] = useState('');

    const [eau, setEau] = useState(0);
    const [stationService, setStationService] = useState('');
    const [auvent, setAuvent] = useState([]);
    const [portiqueLavage, setPortiqueLavage] = useState('');
    const [pisteHautePression, setPisteHautePression] = useState('');
    const [abrisChariotsSimple, setAbrisChariotsSimple] = useState('');
    const [abrisChariotsDouble, setAbrisChariotsDouble] = useState('');
    const [totem, setTotem] = useState('');
    const [nombreDairesAspirateurGonflage, setNombreDairesAspirateurGonflage] = useState('');
    const [hauteurBardage, setHauteurBardage] = useState('');
    const [nbrEntreeMagasin, setNbrEntreeMagasin] = useState('');
    const [toitureNettoyable, setToitureNettoyable] = useState(0);
    const [gouttiereApparente, setGouttiereApparente] = useState(0);

    const [hideFields, setHideFields] = useState('');

    const onChangeAuvent = (options) => {
        setAuvent(options.map(opt => opt.value));

    }

    const checkboxContactHandler = () => {

        setIdentiteFacturation(nomCommercial);
        setPhoneFacturation(phoneCommercial);
        setMarqueFacturation(nomMagasin);
        setEmailFacturation(emailCommercial);
        setAdresseFacturation(adresseChantier);
        setCode_postalFacturation(code_postalCommercial);
        setVille_cedexFacturation(ville_cedexCommercial);

    };

    const checkboxInterdictionHandler = () => {
        setInterdictionIntervention(1);

    };

    const submitHandler = (e) => {

        // Empêche le rechargement de la page
        e.preventDefault();
        let idClient;
        if (selectedCustomer === null || selectedCustomer === "null" || selectedCustomer === "") {
            idClient = "";
          } else {
            idClient = `idclient=${selectedCustomer}&`;
          }
          
        // Déclaration des paramètres de requête API
        let headers = { "Content-Type": "application/json" };
        let url = `https://espacepro.jimmys-box.com/wp-json/capvert/gms-chantier/ajouter?${idClient}identitefacturation=${identiteFacturation}&telephonefacturation=${phoneFacturation}&nomcontactfacturation=${marqueFacturation}&nommagasinfacturation=${nomMagasin}&emailfacturation=${emailFacturation}&adressefacturation=${adresseFacturation}&codepostalfacturation=${code_postalFacturation}&villefacturation=${ville_cedexFacturation}&identitecommercial=${nomCommercial}&adressechantier=${adresseChantier}&codepostalcommercial=${code_postalCommercial}&emailcommercial=${emailCommercial}&villecommercial=${ville_cedexCommercial}&telephonecommercial=${phoneCommercial}&datedederniernettoyage=${dateDernierNettoyage}&caht=${ca}&interdictiondintervention=${interdictionIntervention}&acceseau=${eau}&caracteristiquesdelastationservice=${stationService}&nombredeportiquesdelavage=${portiqueLavage}&nombredepisteshautepression=${pisteHautePression}&typeauvent=${auvent}&totem=${totem}&nombredabrischariotsdoubles=${abrisChariotsDouble}&nombredabrischariotssimples=${abrisChariotsSimple}&nombredairesaspirateurgonflage=${nombreDairesAspirateurGonflage}&nombreentreesdemagasin=${nbrEntreeMagasin}&hauteurdubardage=${hauteurBardage}&nettoyabilitetoiture=${toitureNettoyable}&visibilitegouttiere=${gouttiereApparente}&frequencedenettoyage=${frequenceNettoyage}&idfranchise=${franchise}`;

        // Appel API en requête GET
        axios.get(url, headers)
            .then(response => {
                alert('Client créé');
                window.location.replace('/clients/gestion-clients');
                console.log(response)
            })
            .catch(err => {
                console.error(err);
            });
        //alert('Client créé');
       // console.log(response)
       // window.location.href = "/clients/gestion-clients";
    }
    const getClients = async () => {
        try {
            const response = await fetch('https://espacepro.jimmys-box.com/wp-json/capvert/gms-client/lister');
            const json = await response.json();

            setData(json)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
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
        getClients();
        getFranchise();
      }, []);

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            color: state.isFocused ? '#a0c951' : 'black',
        }),
    };

    const handleCustomerSelection = (event) => {
        const index = event.target.value;
        setSelectedCustomer(data[index][0]); // Set the selected customer
        setIdentiteFacturation(data[index][0].identite_client_facturation);
        setPhoneFacturation(data[index][0].telephone_client_facturation);
        setNomFacturation(data[index][0].nom_client_facturation);
        setMarqueFacturation(data[index][0].marque_client_facturation);
        setEmailFacturation(data[index][0].email_client_facturation);
        setAdresseFacturation(data[index][0].adresse_facturation);
        setCode_postalFacturation(data[index][0].code_postal_facturation);
        setVille_cedexFacturation(data[index][0].ville_cedex_facturation);

    };
    
    const handleFranchiseSelection = (event) => {
        const index = event.target.value;
        setFranchise(index)
    };

    return (
        <div className="customContent">
            <form onSubmit={submitHandler}>
                <div className="formSection dFlex justifyCenter alignCenter flexColumn" >
                    <h3 className="formSectionNom">Identité Chantier</h3>
                    <div className="formSectionInner dFlex justifyBetween width500" >
                        <div className="formSectionChamp">
                            <p className="formSectionLabel">Nom du magasin</p>
                            <input className="formSectionInput" type="text" value={nomCommercial} onChange={(e) => { setNomCommercial(e.target.value) }} />
                        </div>
                        <div className="formSectionChamp">
                            <p className="formSectionLabel">Numéro de télephone</p>
                            <input className="formSectionInput" type="tel" value={phoneCommercial} onChange={(e) => { setPhoneCommercial(e.target.value) }} />
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
                            <select className="formSectionInput" onChange={handleCustomerSelection}>
                                <option value="" style={{ color: 'gray', backgroundColor: 'darkgray' }}>Veuillez selectionner un client</option>
                                {data.map((array, index) => (
                                    <option key={index} value={index}>
                                        {array.map((item, i) => (
                                            <span key={i}>{item.identite_client_facturation}, {item.ville_facturation}</span>
                                        ))}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label for="copyContact"><input type="checkbox" id="copyContact" onChange={checkboxContactHandler} />Identique au contact commercial</label>
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
                            <select   className="formSectionInput" onChange={handleFranchiseSelection}>
                            <option value="" style={{ color: 'gray', backgroundColor: 'darkgray' }}>Selectionner une franchise</option>
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
                </div>
                <div className="formSection dFlex justifyCenter alignCenter flexColumn" >
                    <h3 className="formSectionNom">Informations générales du chantier</h3>
                    <div className="formSectionInner dFlex justifyBetween width500" >
                        <div className="formSectionChamp">
                            <p className="formSectionLabel">Date du dernier nettoyage</p>
                            <input className="formSectionInput" type="date" value={dateDernierNettoyage} onChange={(e) => { setdateDernierNettoyage(e.target.value) }} />
                        </div>
                        <div className="formSectionChamp">
                            <p className="formSectionLabel">Fréquence de Nettoyage</p>
                            <select className="formSectionInput" name={frequenceNettoyage} id="frequence-de-nettoyage" onChange={(e) => { setFrequenceNettoyage(e.target.value) }}>
                                <option value="" style={{ color: 'gray', backgroundColor: 'darkgray' }}>...</option>
                                <option value="mensuel">mensuel</option>
                                <option value="bimestrielle">bimestrielle</option>
                                <option value="trimestrielle">trimestrielle</option>
                                <option value="quadrimestrielle">quadrimestrielle</option>
                                <option value="Semestrielle" >Semestrielle</option>
                                <option value="annuel">annuel</option>
                            </select>
                        </div>
                    </div>
                    <div className="formSectionInner dFlex justifyBetween width500" >
                        <div className="formSectionChamp">
                            <p className="formSectionLabel">CA HT</p>
                            <input className="formSectionInput" type="number" pattern="[0-9]" value={ca} onChange={(e) => { setCa(e.target.value) }} />
                        </div>
                        <div className="formSectionChamp">
                            <p className="formSectionLabel">Interdiction d'intervention</p>
                            <label for="ineterdiction-intervention"><input type="checkbox" id="ineterdiction-intervention" name={interdictionIntervention} onChange={checkboxInterdictionHandler} /></label>
                        </div>
                    </div>
                </div>
                <div className="formSection dFlex justifyCenter alignCenter flexColumn" >
                    <h3 className="formSectionNom">Détails intervention</h3>
                    <div className="formSectionInner dFlex justifyBetween width500" >
                        <div className="formSectionChamp">
                            <p className="formSectionLabel">Equipe</p>
                            <select className="formSectionInput" name={eau} id="equipe" onChange={(e) => { setEquipe(e.target.value) }}>
                                <option value="" style={{ color: 'gray', backgroundColor: 'darkgray' }}>...</option>
                                <option value="G1">G1</option>
                                <option value="G2">G2</option>
                                <option value="G3">G3</option>
                                <option value="G4">G4</option>
                                <option value="G5">G5</option>
                            </select>
                        </div>
                        <div className="formSectionChamp">
                            <p className="formSectionLabel">Station service</p>
                            <select className="formSectionInput" name={stationService} id="station-service" onChange={(e) => { setStationService(e.target.value) }}>
                                <option value="" style={{ color: 'gray', backgroundColor: 'darkgray' }}>...</option>
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
                                closeMenuOnSelect={false}
                                isMulti={true}
                                styles={customStyles}
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
                            <select className="formSectionInput" name={eau} id="eau-disponible" onChange={(e) => { setEau(e.target.value) }}>
                                <option value="" style={{ color: 'gray', backgroundColor: 'darkgray' }}>...</option>
                                <option value="1">Oui</option>
                                <option value="0">Non</option>
                            </select>
                        </div>

                    </div>
                    <p className="formSectionLabel" style={{ marginTop: 25, marginBottom: 0 }}>Station de lavage</p>
                    <div className="formSectionInner dFlex justifyBetween width500" >
                        <div className="formSectionChamp">
                            <p className="formSectionLabel">Portique de lavage</p>
                            <select className="formSectionInput" name={portiqueLavage} id="portique-lavage" onChange={(e) => { setPortiqueLavage(e.target.value) }}>
                                <option value="" style={{ color: 'gray', backgroundColor: 'darkgray' }}>...</option>
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
                            <select className="formSectionInput" name={pisteHautePression} id="piste-haute-pression" onChange={(e) => { setPisteHautePression(e.target.value) }}>
                                <option value="" style={{ color: 'gray', backgroundColor: 'darkgray' }}>...</option>
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
                            <select className="formSectionInput" name={abrisChariotsSimple} id="abris-chariots-simple" onChange={(e) => { setAbrisChariotsSimple(e.target.value) }}>
                                <option value="" style={{ color: 'gray', backgroundColor: 'darkgray' }}>...</option>
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
                            <select className="formSectionInput" name={abrisChariotsDouble} id="abris-chariots-double" onChange={(e) => { setAbrisChariotsDouble(e.target.value) }}>
                                <option value="" style={{ color: 'gray', backgroundColor: 'darkgray' }}>...</option>
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
                            <input className="formSectionInput" type="text" value={totem} onChange={(e) => { setTotem(e.target.value) }} />
                        </div>
                        <div className="formSectionChamp">
                            <p className="formSectionLabel">Aire aspirateur et gonflage</p>
                            <select className="formSectionInput" name={nombreDairesAspirateurGonflage} id="aire-aspirateur-gonflage" onChange={(e) => { setNombreDairesAspirateurGonflage(e.target.value) }}>
                                <option value="" style={{ color: 'gray', backgroundColor: 'darkgray' }}>...</option>
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
                            <select className="formSectionInput" name={hauteurBardage} id="hauteur-bardage" onChange={(e) => { setHauteurBardage(e.target.value) }}>
                                <option value="0" style={{ color: 'gray', backgroundColor: 'darkgray' }}>...</option>
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
                            <select className="formSectionInput" name={nbrEntreeMagasin} id="entree-magasin" onChange={(e) => { setNbrEntreeMagasin(e.target.value) }}>
                                <option value="" style={{ color: 'gray', backgroundColor: 'darkgray' }}>...</option>
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
                            <select className="formSectionInput" name={toitureNettoyable} id="toiture-nettoyable" onChange={(e) => { setToitureNettoyable(e.target.value) }}>
                                <option value="" style={{ color: 'gray', backgroundColor: 'darkgray' }}>...</option>
                                <option value="1">Oui</option>
                                <option value="0">Non</option>
                            </select>
                        </div>
                        <div className="formSectionChamp">
                            <p className="formSectionLabel">Gouttière Apparente</p>
                            <select className="formSectionInput" name={gouttiereApparente} id="gouttiere-apparente" onChange={(e) => { setGouttiereApparente(e.target.value) }}>
                                <option value="" style={{ color: 'gray', backgroundColor: 'darkgray' }}>...</option>
                                <option value="1">Oui</option>
                                <option value="0">Non</option>
                            </select>
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


export default AjoutClientGms;