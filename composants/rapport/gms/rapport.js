import React, { useRef, useState } from 'react';
import Select from 'react-select';
import SignatureCanvas from 'react-signature-canvas';
import axios from "axios";
import { Document, Page } from "react-pdf";
import { useRouter } from 'next/router';

import RapportHoraire from './horaire';
import RapportProcede from './procede';
import RapportResultat from './resultat';
import RapportObservation from './observation';
import RapportConfirmation from './confirmation';

function Rapport(props) {
    const [step, setStep] = useState(1);
    const [horaireDebut, setHoraireDebut] = useState('');
    const [horaireFin, setHoraireFin] = useState('');
    const [supports, setSupports] = useState('');
    const [procede, setProcede] = useState('');
    const [meteo, setMeteo] = useState('');
    const [resultat, setResultat] = useState('');
    const [observation, setObservation] = useState('');
    const [urlPrevisualisation, setUrlPrevisualisation] = useState('');
    const [urlValidation, setUrlValidation] = useState('');
    const [photos, setPhotos] = useState([]);
    const router = useRouter();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadStatus, setUploadStatus] = useState("");
     
    const dateIntervention = props.dateIntervention;
    const adresse = props.adresse;
    const frequenceNettoyage = props.frequenceNettoyage;
    const nomContact = props.nomContact;
    const nomClient = props.nomClient;
    const ville = props.ville;
    const idChantier = props.idChantier;
    const idIntervention = props.idIntervention;
 
   

    const [messageBoutonPrevisualisation, setMessageBoutonPrevisualisation] = useState(<div>Visualiser le rapport</div>);
    const [messageBoutonVisualisation, setMessageBoutonVisualisation] = useState(<div>Envoyer le rapport</div>);

    let allFilenames2 = "";
    const [allFilenames, setAllFilenames] = useState("");

    const signatureClient = useRef({});
    const signatureCapVert = useRef({});
  
    const [signatureClientData, setSignatureClientData] = useState();
    const [signatureCapVertData, setSignatureCapVertData] = useState();

    const prevStep = () => {
        setStep(step - 1);
    };

    const nextStep = () => {
        setStep(step + 1);
    };

    const handleChange = (input) => (e) => {
        switch (input) {
            case 'horaireDebut':
                setHoraireDebut(e.target.value);
                break;
            case 'horaireFin':
                setHoraireFin(e.target.value);
                break;
            case 'procede':
                setProcede(e.target.value);
                break;
            case 'meteo':
                setMeteo(e.target.value);
                break;
            case 'resultat':
                setResultat(e.target.value);
                break;
            case 'observation':
                setObservation(e.target.value);
                break;
            case 'urlPrevisualisation':
                setUrlPrevisualisation(e.target.value);
                break;
            case 'photos':
                setPhotos(e.target.value);
                break;
            default:
                break;
        }
    };

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            color: state.isFocused ? '#a0c951' : 'black',
        }),
    };

  const clearSignatureClient = (e) => {
    e.preventDefault();
    signatureClient.current.clear();
  };

  const clearSignatureCapVert = (e) => {
    e.preventDefault();
    signatureCapVert.current.clear();
  };
    
  const saveSignature = async (e) => {
    e.preventDefault();
    const signatureClientDataUrl = signatureClient.current.toDataURL();
    const signatureCapVertDataUrl = signatureCapVert.current.toDataURL();

    const formData = new FormData();
    formData.append('signatureClient', signatureClientDataUrl);
    formData.append('signatureCapVert', signatureCapVertDataUrl);
    console.log('formData', signatureClientDataUrl)

    setSignatureClientData(signatureClientDataUrl.substring(22));
    setSignatureCapVertData(signatureCapVertDataUrl.substring(22));

  };



    const values = { allFilenames, urlPrevisualisation, horaireDebut, horaireFin, procede, meteo, resultat, observation, supports, dateIntervention, adresse, frequenceNettoyage, nomContact, ville, nomClient, photos, idIntervention, idChantier, signatureClientData, signatureCapVertData };

    switch (step) {
        case 1:
      return (
        <RapportHoraire
          nextStep={nextStep}
          handleChange={handleChange}
          values={values}
        />
      )
    case 2:
      return (
        <div className="rapportOuterContainer">
          <form className="rapportInnerContainer">
            <div className="rapportInputContainer rapportInputContainerSelect">
              <label htmlFor="supports">Définir le ou les supports nettoyés :</label>
              <Select
                id="supports"
                //value={state.supports}
                onChange={(options) => {
                  setSupports(options.map((opt) => opt.value));
                }}
                closeMenuOnSelect={false}
                isMulti={true}
                styles={customStyles}
                // options={options}
                options={[
                  { value: ' Station service', label: 'Station service' },
                  { value: ' Station de lavage', label: 'Station de lavage' },
                  { value: ' Aire aspirateur/gonflage', label: 'Aire aspirateur/gonflage' },
                  { value: ' drive', label: 'drive' },
                  { value: ' Auvent', label: 'Auvent' },
                  { value: ' Totem', label: 'Totem' },
                  { value: ' Abris chariots', label: 'Abris chariots' },
                  { value: ' Bardage', label: 'Bardage' },
                  { value: ' Entrée de magasin', label: 'Entrée de magasin' },
                  { value: ' Abords/trottoirs', label: 'Abords/trottoirs' },
                  { value: ' Station service', label: 'Station service' },
                  { value: ' Station de lavage', label: 'Station de lavage' },
                  { value: ' Aire aspirateur/gonflage', label: 'Aire aspirateur/gonflage' },
                  { value: ' drive', label: 'drive' },
                  { value: ' Auvent', label: 'Auvent' },
                  { value: ' Totem', label: 'Totem' },
                  { value: ' Abris chariots', label: 'Abris chariots' },
                  { value: ' Bardage', label: 'Bardage' },
                  { value: ' Entrée de magasin', label: 'Entrée de magasin' },
                  { value: ' Abords/trottoirs', label: 'Abords/trottoirs' }
                ]}
              />
            </div>

            <div className="rapportButtonNavigationContainer">
              <button onClick={prevStep}><svg style={{ marginRight: '10px' }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
              </svg>Horaires de nettoyage</button>
              <button onClick={nextStep}>Procédé de nettoyage<svg style={{ marginLeft: '10px' }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
              </svg></button>
            </div>
          </form>
        </div>
      )
    case 3:
      return (
        <RapportProcede
          prevStep={prevStep}
          nextStep={nextStep}
          handleChange={handleChange}
          values={values}
        />
      )
    case 4:
      return (
        <div className="rapportOuterContainer">
        <div className="rapportInnerContainer">
        <div>
          <button onClick={() => setMeteo('https://jimmyslab.club/cap-vert-media/public/tdbshF4TQqMp.png')}>soleil</button>
          <button onClick={() => setMeteo('https://jimmyslab.club/cap-vert-media/public/rWPyZcso5Zdf.png')}>nuageux</button>
          <button onClick={() => setMeteo('https://jimmyslab.club/cap-vert-media/public/JIu6W80Xzu7i.png')}>pluie</button>
          <button onClick={() => setMeteo('https://jimmyslab.club/cap-vert-media/public/wVjB7ztiB09n.png')}>vent</button>
          </div>
          <img src={values.meteo} width="100" />
          <div className="rapportButtonNavigationContainer">
            <button onClick={prevStep}><svg style={{ marginRight: '10px' }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
            </svg>Procédé de nettoyage</button>
            <button onClick={nextStep}>Résultat Nettoyage<svg style={{ marginLeft: '10px' }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
            </svg></button>
          </div>
          </div>
        </div>
      )
    case 5:
      return (
        <RapportResultat
          prevStep={prevStep}
          nextStep={nextStep}
          handleChange={handleChange}
          values={values}
        />
      )
    case 6:
      return (
        <RapportObservation
          prevStep={prevStep}
          nextStep={nextStep}
          handleChange={handleChange}
          values={values}
        />
      )
    case 7:


      const handleFileInputChange = (event) => {
        setSelectedFiles([...event.target.files]);
      };

      const handleFileUpload = (event) => {
        event.preventDefault();

        setUploadStatus("Chargement, veuillez patienter...");
        const filenames = [];

        selectedFiles.forEach((file) => {
          const formData = new FormData();
          formData.append("file", file);

          fetch("http://jimmyslab.club:4445/ajouter-photo", {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              // concatenate the new URL with a comma separator
              allFilenames2 += (allFilenames2 ? "," : "") + data.data.url;
              // update the UI with the updated allFilenames string
              setAllFilenames(allFilenames2);
              console.log('test', allFilenames)
              setUploadStatus('fichiers téléchargés, vous pouvez visualiser le rapport');
            })
            .catch((error) => {
              console.error(error);
              setUploadStatus(`Error uploading ${file.url}.`);
            });



        });
      }
      const options = {
        method: 'POST',
        url: 'https://espacepro.jimmys-box.com/wp-json/capvert/gms-rapport/ajouter-temp',
        headers: { 'content-type': 'application/json' },
        data: {

          nomclient: values.nomClient,
          ville: values.ville,
          nomcontact: values.nomContact,
          adresse: values.adresse,
          dateintervention: values.dateIntervention,
          frequencenettoyage: values.frequenceNettoyage,
          horairedebut: values.horaireDebut,
          horairefin: values.horaireFin,
          supports: values.supports,
          procede: values.procede,
          resultat: values.resultat,
          observation: values.observation,
          idintervention: values.idIntervention,
          idchantier: values.idChantier,
          supports: values.supports.toString(),
          //signature1: '',
          //signature2: '',

          meteo: values.meteo,
          urlphotos: `[${values.allFilenames}]`
          // urlphotos: '[https://jimmyslab.club/cap-vert-media/public/9FliKB1J5xPs.jpg]'

          //  urlphotos: values.allFilenames.toString()
        }
      };
      console.log('options', options)
      const submit2 = (e) => {
        e.preventDefault();
        setMessageBoutonPrevisualisation(<div><img src="https://jimmyslab.club/cap-vert-media/public/2QZH294monHn.webp" width="30" />Rapport en cours de génération</div>);
        axios.request(options).then(function (response) {
          console.log(response.data);
          setUrlPrevisualisation(response.data.url_rapport);
         
          nextStep();
        })
          .catch(function (error) {

            console.error(error);
          });
        //nextStep();
      }
      console.log(values.allFilenames)
      return (
        <div className="rapportOuterContainer">
        <div className="rapportInnerContainer" style={{alignItems:'center'}}>
        <div>
            <form className="rapportInnerContainer" onSubmit={handleFileUpload} style={{textAlign:'center'}}>
         
              <label htmlFor="file-input">Choisir les photos:</label>
              <input
                id="file-input"
                type="file"
                multiple
                onChange={handleFileInputChange}
              />
           
              <button style={{marginHorizontal:0}} type="submit">Soumettre les photos</button>

            </form>
            {uploadStatus && <p>{uploadStatus}</p>}

          </div>
          <div className="rapportButtonNavigationContainer">
            <button onClick={prevStep}><svg style={{ marginRight: '10px' }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
            </svg>Observations</button>
            <button onClick={submit2}>{messageBoutonPrevisualisation}<svg style={{ marginLeft: '10px' }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
            </svg></button>
          </div>
        </div>
        </div>
      )
    case 8:

    const returnMessage = (e) => {
      e.preventDefault();
      prevStep();  
      setMessageBoutonPrevisualisation(<div>Visualiser le rapport</div>)
    }
      return (
        <div>
        <iframe style={{ width: '100%', minHeight: '100vh', aspectRatio: 1 / 1.4142 }} src={urlPrevisualisation} />

        <button onClick={returnMessage}><svg style={{ marginRight: '10px' }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
        </svg>Photos</button>
        <button onClick={nextStep}>Signatures
          <svg style={{ marginLeft: '10px' }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
          </svg></button>
      </div>

      )
    case 9:
      const optionsPostSignature = {
        method: 'POST',
        url: 'https://espacepro.jimmys-box.com/wp-json/capvert/gms-rapport/ajouter',
        headers: { 'content-type': 'application/json' },
        data: {
  
          nomclient: values.nomClient,
          ville: values.ville,
          nomcontact: values.nomContact,
          adresse: values.adresse,
          dateintervention: values.dateIntervention,
          frequencenettoyage: values.frequenceNettoyage,
          horairedebut: values.horaireDebut,
          horairefin: values.horaireFin,
          supports: values.supports.toString(),
          procede: values.procede,
          resultat: values.resultat,
          observation: values.observation,
          idintervention: values.idIntervention,
          idchantier: values.idChantier,
  
          signature1: values.signatureClientData,
          signature2: values.signatureCapVertData,
          meteo: values.meteo,
          urlphotos: `[${values.allFilenames}]`
          // urlphotos: '[https://jimmyslab.club/cap-vert-media/public/9FliKB1J5xPs.jpg]'
  
          //  urlphotos: values.allFilenames.toString()
        }
      };
      console.log('options', optionsPostSignature)
      const submit3 = (e) => {
        e.preventDefault();
        setMessageBoutonVisualisation(<div><img src="https://jimmyslab.club/cap-vert-media/public/2QZH294monHn.webp" width="30" />Rapport en cours de génération</div>);
        axios.request(optionsPostSignature).then(function (response) {
          console.log(response.data);
          setUrlPrevisualisation(response.data.url_rapport);
          nextStep();
        }).then(console.log('UrlPrevisualisation', urlPrevisualisation))
          .catch(function (error) {
  
            console.error(error);
          });
        //nextStep();
      }
      return (
        <div className="">
          <form className="rapportInnerContainer">
            <div className="">

              <div style={{ textAlign: 'center' }}>

                <div className='signatureCanvasOuterContainer'>
                  <div className='signatureCanvasContainer' >
                    <h5 style={{ color: 'black' }}>Signature Client</h5>
                    <SignatureCanvas
                      penColor='black'
                      canvasProps={{ className: 'signatureCanvas' }}
                      ref={signatureClient}
                    />
                    <button onClick={clearSignatureClient}>Effacer</button>
                  </div>
                  <div className='signatureCanvasContainer' >
                    <h5 style={{ color: 'black' }}>Signature CapVert</h5>
                    <SignatureCanvas
                      penColor='black'
                      canvasProps={{ className: 'signatureCanvas' }}
                      ref={signatureCapVert}
                    />
                    <button onClick={clearSignatureCapVert}>Effacer</button>
                  </div>
                </div>
                <button style={{ marginTop: 20 }} onClick={saveSignature}>Valider les signatures</button>

              </div>
            </div>

            <div className="rapportButtonNavigationContainer">
              <button onClick={prevStep}><svg style={{ marginRight: '10px' }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
              </svg>Photos</button>
              <button onClick={submit3}>{messageBoutonVisualisation}<svg style={{ marginLeft: '10px' }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
              </svg></button>
            </div>
          </form>
        </div>
      )

    case 10:
      return (
        <div><RapportConfirmation values={values}  prevStep={prevStep}
        nextStep={nextStep}/></div>
      )
    // never forget the default case, otherwise VS code would be mad!
    default:
    // do nothing
  }
  return (
    <div><button type='submit'>Générer le rapport</button></div>
  )
}


export default Rapport;