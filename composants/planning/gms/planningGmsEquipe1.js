import React, { useState, useRef, useEffect } from 'react';
import frLocale from '@fullcalendar/core/locales/fr';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { createEventId } from './event-utils'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useLocalStorage } from '../../functions/connexion';

function LogistiqueGmsEquipe1(props) {
  const [weekendsVisible, setWeekendsVisible] = useState(false);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [show, setShow] = useState(false);
  const [showDetailsEvent, setShowDetailsEvent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [fullData, setFullData] = useState([]);
  const [fullData2, setFullData2] = useState([]);
  const [chronometre, setChronometre] = useState(null);
  const [q, setQ] = useState('');
  const [detailsEquipe, setDetailsEquipe] = useState('');
  const [nomClient, setNomClient] = useState('');
  const [idChantier, setIdChantier] = useState('');
  const [caClient, setCaClient] = useState('');
  const [cpClient, setCpClient] = useState('');
  const [villeClient, setVilleClient] = useState('');
  const [searchTerm, setSearchTerm] = useState(["ville_commercial"]);
  const [data3, setData3] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');
  const [idIntervention, setIdIntervention] = useState(null);
  const [detailsMagasin, setDetailsMagasin] = useState('');
  const [detailsCa, setDetailsCa] = useState('');
  const [detailsCp, setDetailsCp] = useState('');
  const [detailsVille, setDetailsVille] = useState('');
  const [detailsAcces_eau, setDetailsAcces_eau] = useState('');
  const [detailsCaracteristiques_de_la_station_service, setDetailsCaracteristiques_de_la_station_service] = useState('');
  const [detailsNombre_de_portiques_de_lavage, setDetailsNombre_de_portiques_de_lavage] = useState('');
  const [detailsNombre_de_pistes_haute_pression, setDetailsNombre_de_pistes_haute_pression] = useState('');
  const [detailsType_auvent, setDetailsType_auvent] = useState('');
  const [detailsTotem, setDetailsTotem] = useState('');
  const [detailsNombre_dabris_chariots_doubles, setDetailsNombre_dabris_chariots_doubles] = useState('');
  const [detailsNombre_dabris_chariots_simples, setDetailsNombre_dabris_chariots_simples] = useState('');
  const [detailsNombre_daires_aspirateur_gonflage, setDetailsNombre_daires_aspirateur_gonflage] = useState('');
  const [detailsNombre_entrees_de_magasin, setDetailsNombre_entrees_de_magasin] = useState('');
  const [detailsHauteur_du_bardage, setDetailsHauteur_du_bardage] = useState('');
  const [detailsNettoyabilite_toiture, setDetailsNettoyabilite_toiture] = useState('');
  const [detailsVisibilite_gouttiere, setDetailsVisibilite_gouttiere] = useState('');
const [disabledField, setDisabledField] = useState(true);
const [activateField, setActivateField] = useState(true);
const [bckColor2, setBckColor2] = useState('gray');
const [gmsSum, setGmsSum] = useLocalStorage('gmsSum',0);
const [eventsToDisplay, setEventsToDisplay] = useState(() => []);
const elementRef = useRef();
const myComponentRef = useRef();

  // Equivalent of componentDidMount method
  useEffect(() => {
    let headers = {
      "Content-Type": "application/json"
    }; 
    fetch('https://espacepro.jimmys-box.com/wp-json/capvert/gms-intervention/lister', { headers })

      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter(config => config.id_equipe === null);
        setFullData(data);
        setData(filteredData);
        setEventsToDisplay(filteredData.map(config => ({
          id: config.id,
          title: config.nom_client,
          start: config.date_intervention,
          extendedProps: {
            customData: {
              idChantierAssocie: config.id_chantier_associe,
              ca: config.ca_ht,
              ville: config.ville_chantier,
              cp: config.code_postal_chantier,
              equipe: config.id_equipe,
              detailsIntervention: (config.prestations).map(configPrestations => ({
                type: configPrestations.type,
                nombreBase: configPrestations.nombre,
                nombreExtra: configPrestations.nombre_supplementaire,
                tarif: configPrestations.tarif_de,
                caSupplementaire: config.ca_ht_supplementaire
              })),
            }
          }
        })));
      });

    fetch('https://espacepro.jimmys-box.com/wp-json/capvert/gms-chantier/lister', { headers })
      .then((response) => response.json())
      .then((data3) => {
        setFullData2(data3);
        setData3(data3);
      });
  }, []);

  // Equivalent of handleChange method
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  }

  // Equivalent of handleCheckboxChange method
  const handleCheckboxChange = (event) => {
    const client = JSON.parse(event.target.dataset.client);
    let updatedSelectedCustomers = [...selectedCustomers];
    if (event.target.checked) {
      updatedSelectedCustomers.push(client);
    } else {
      updatedSelectedCustomers = updatedSelectedCustomers.filter(cust => cust.id !== client.id);
    }
    setSelectedCustomers(updatedSelectedCustomers);
  }

  // Equivalent of handleEventReceive method
  const handleEventReceive = (info) => {
    console.log(info.draggedEl.innerHTML);
    const newEvent = {
      title: info.draggedEl.innerHTML,
      start: info.event.start,
      end: info.event.end,
      eventDraggable: true
    }
    setEvents(prevState => [...prevState.events, newEvent]);
  };
  const updateEvent = async (info) => {
    const { event } = info;
    let date = new Date(event.start);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let formattedDate = year + month + day;
    let headers = { "Content-Type": "application/json" };
    let url = `https://espacepro.jimmys-box.com/wp-json/capvert/gms-intervention/mettreajour?idintervention=${event.id}&dateintervention=${formattedDate}&changementmanuel=false`;
    // Appel API en requête GET
    axios.get(url, headers)
      .then(response => {
        console.log('gggggg', response);
        setBckColor2('red');
      })
      .catch(err => {
        console.error(err);
      });

  };

  const submitHandler = (e) => {
    e.preventDefault();
    let headers = { "Content-Type": "application/json" };
    let url = `https://espacepro.jimmys-box.com/wp-json/capvert/gms-intervention/mettreajour?idintervention=${idIntervention}&extraportiquesdelavage=${detailsNombre_de_portiques_de_lavage}&extrapisteshautepression=${detailsNombre_de_pistes_haute_pression}&extratotem=&extraabrischariotsdoubles=${detailsNombre_dabris_chariots_doubles}&extraabrischariotssimples=${detailsNombre_dabris_chariots_simples}&notesprecisionsintervention=&extraairesaspirateurgonflage=${detailsNombre_daires_aspirateur_gonflage}&extraentreesdemagasin=${detailsNombre_entrees_de_magasin}`;

    // Appel API en requête GET
    axios.get(url, headers)
      .then(response => {
        console.log(response);
        setDisabledField(true);
      })
      .catch(err => {
        console.error(err);
      });
  }

  const handleEdit = () => {
    setDisabledField(false);
    setActivateField(false);
  }

  const handleClose = () => {
    if (disabledField === true) {
      setShowDetailsEvent(false);
    }
    else if (window.confirm("Voulez-vous vraiment annuler ?") === true) {
      setDisabledField(true);
      setActivateField(true);
      setShowDetailsEvent(false);
    }
  };


  useEffect(() => {
    
    const element = myComponentRef.current;
    const pElements = element.querySelectorAll('tbody[role="presentation"] tr[role="row"]');
    const pElements2 = element.querySelectorAll('thead[role="presentation"] tr[role="row"]');

    const trArray2 = Array.from(pElements2).map((pElement2) => {
      const existingDiv2 = pElement2.querySelector('.sum-header');
      if (existingDiv2) {
        pElement2.removeChild(existingDiv2);
      }
      const div2 = document.createElement('div');
      div2.textContent = `CA hebdomadaire (${gmsSum}€)`;
      div2.classList.add('sum-header'); // Add a class to the div for easy removal later
      pElement2.appendChild(div2);
    });

    const trArray = Array.from(pElements).map((pElement) => {
      const pElement2s = pElement.querySelectorAll('.ca');

      const caArray = Array.from(pElement2s).map((pElement2, index) => {
        return parseInt(pElement2.textContent.replace('€', ''));
      });

      const sum = caArray.reduce((acc, current) => acc + current, 0);

      return { caArray, sum };
    });

    const sumArray = trArray.map((tr) => {
      return tr.caArray.reduce((acc, current) => acc + current, 0);
    });

    const copySumArray = [...sumArray];
    copySumArray.forEach((sum, index) => {
     
      const pElement = pElements[index];
      const existingDiv = pElement.querySelector('.sum-value');
      if (existingDiv) {
        pElement.removeChild(existingDiv);
      }

      const div = document.createElement('div');
      div.textContent = sum + '€';
      div.classList.add('sum-value'); // Add a class to the div for easy removal later
      pElement.appendChild(div);

      const sumValue = pElement.querySelector('.sum-value');

      if (sum < gmsSum) {
        pElement.setAttribute('style', 'border: solid 2px black');
        sumValue.style.color = 'white';
        sumValue.style.backgroundColor = '#ff000066';
      } else {
        pElement.setAttribute('style', 'border: solid 2px black');
        sumValue.style.backgroundColor = '#0080008f';
        sumValue.style.color = 'white';
      }
    });
  }, [fullData, selectedCustomers, detailsNombre_de_portiques_de_lavage, detailsNombre_de_pistes_haute_pression, detailsNombre_dabris_chariots_doubles, detailsNombre_dabris_chariots_simples, detailsNombre_daires_aspirateur_gonflage, detailsNombre_entrees_de_magasin]);
  const handleEventClick = (eventInfo) => {

    setShowDetailsEvent(true)
    setIdIntervention(eventInfo.event.id)
   setDetailsMagasin(eventInfo.event.title)
   setDetailsCa(eventInfo.event.extendedProps.customData.ca)
   setDetailsCp(eventInfo.event.extendedProps.customData.cp)
   setDetailsVille(eventInfo.event.extendedProps.customData.ville)
   setDetailsAcces_eau(eventInfo.event.extendedProps.customData.eau)
   setDetailsEquipe(eventInfo.event.extendedProps.customData.equipe)
   setDetailsCaracteristiques_de_la_station_service(eventInfo.event.extendedProps.customData.detailsIntervention[1].nombreBase)
   setDetailsNombre_de_portiques_de_lavage(eventInfo.event.extendedProps.customData.detailsIntervention[6].nombreBase)
   setDetailsNombre_de_pistes_haute_pression(eventInfo.event.extendedProps.customData.detailsIntervention[7].nombreBase)
   setDetailsType_auvent(eventInfo.event.extendedProps.customData.detailsIntervention[2].nombreBase)
   setDetailsTotem(eventInfo.event.extendedProps.customData.detailsIntervention[8].nombreBase)
   setDetailsNombre_dabris_chariots_doubles(eventInfo.event.extendedProps.customData.detailsIntervention[10].nombreBase)
   setDetailsNombre_dabris_chariots_simples(eventInfo.event.extendedProps.customData.detailsIntervention[9].nombreBase)
   setDetailsNombre_daires_aspirateur_gonflage(eventInfo.event.extendedProps.customData.detailsIntervention[11].nombreBase)
   setDetailsNombre_entrees_de_magasin(eventInfo.event.extendedProps.customData.detailsIntervention[12].nombreBase)
   setDetailsHauteur_du_bardage(eventInfo.event.extendedProps.customData.detailsIntervention[13].nombreBase)
   setDetailsNettoyabilite_toiture(eventInfo.event.extendedProps.customData.detailsIntervention[3].nombreBase)
   setDetailsVisibilite_gouttiere(eventInfo.event.extendedProps.customData.detailsIntervention[4].nombreBase)
  
  };
  
  const handleEvents = (events) => {
    setCurrentEvents(events)
    
  };
  return (
    <div>
    <p>somme = {gmsSum}</p>
      <div className='planning'>
        <div className='planning-main' ref={myComponentRef}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,dayGridWeek,dayGridDay',
            }}
            allDaySlot={true}
            slotDuration='1440'
            allDayText=''
            hiddenDays={[6, 7]}
            locale={frLocale}
            initialView='dayGridWeek'
            editable={true}
            selectable={true}
            selectMirror={true}


            weekends={weekendsVisible}
            events={eventsToDisplay} // alternatively, use the `events` setting to fetch from a feed
            dayMaxEvents={4}
            height="auto"
            eventChange={updateEvent}


            dateClick={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            eventAdd={(info) => {
              const { event } = info;
              let date = new Date(event.start);
              let year = date.getFullYear();
              let month = (date.getMonth() + 1).toString().padStart(2, '0');
              let day = date.getDate().toString().padStart(2, '0');
              let formattedDate = year + month + day;
              let headers = { "Content-Type": "application/json" };
              let url = `https://espacepro.jimmys-box.com/wp-json/capvert/gms-intervention/ajouter?idchantier=${event.extendedProps.idChantierModif}&dateintervention=${formattedDate}`;

              // Appel API en requête GET
              axios.get(url, headers)
                .then(response => {
                  console.log('gggggg', response);
                })
                .catch(err => {
                  console.error(err);


                });

            }
            }
          />
        </div>
      </div>
      <Modal show={show} onHide={closeModal} style={{ maxWidth: '800px!important' }}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: 'black' }}>Ajouter un client </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <input
            type="search"
            value={q}
            onChange={(e) => setQ({ q: e.target.value })}
            style={{ width: '100%' }}
            placeholder='Rechercher un client'

          />
          {(q) == '' ? null :
            <div>
              <div className="ficheClientListOuterContainer" style={{ padding: '10px 0px' }}>
                <div style={{ width: '20%' }}>
                  <p className='nomFicheClientModalPlanning'>Nom</p>
                </div>
                <div style={{ width: '20%' }}>
                  <p className='nomFicheClientModalPlanning'>Localisation</p>
                </div>
                <div style={{ width: '20%' }}>
                  <p className='nomFicheClientModalPlanning'>Dernier nettoyage : </p>

                </div>
                <div style={{ width: '20%' }}>
                  <p className='nomFicheClientModalPlanning'>Chiffre d'affaire : </p>
                </div>
              </div>

              {search(fullData2).map(client => {
                const dateParts = client.date_de_dernier_nettoyage.match(/(\d{4})(\d{2})(\d{2})/);
                const formattedDate = dateParts ? `${dateParts[3]}/${dateParts[2]}/${dateParts[1]}` : '';

                return (
                  <div key={client.id} className="ficheClientListOuterContainer" style={{ borderColor: '#a0c951', borderWidth: 2, borderStyle: 'solid' }}>
                    <input type="checkbox" data-client={JSON.stringify(client)} value={client.id} onChange={handleCheckboxChange} />
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', margin: 0, padding: 0 }}>
                      <div style={{ width: '20%' }}>
                        <p className='nomFicheClient' style={{ marginBottom: 0, textAlign: 'center' }}>{client.identite_commercial}</p>
                      </div>
                      <div style={{ width: '20%' }}>
                        <p className='texteFicheClient' style={{ marginBottom: 0, textAlign: 'center' }}>{client.ville_commercial}</p>
                      </div>
                      <div style={{ width: '20%' }}>
                        <p className='texteFicheClient' style={{ marginBottom: 0, textAlign: 'center' }}>{formattedDate}</p>
                      </div>
                      <div style={{ width: '20%' }}>
                        <p className='texteFicheClient' style={{ marginBottom: 0, textAlign: 'center' }}>{client.ca_ht}€</p>
                      </div>
                    </div>
                  </div>
                )
              })
              }

            </div>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDetailsEvent} onHide={handleClose} style={{ maxWidth: '800px!important' }}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: 'black', flexDirection: 'column', alignItems: 'start' }}>
            <div>
              {detailsMagasin}
              <span style={{ marginLeft: 20, marginRight: 20 }}>{detailsCa}€</span>

            </div>
            <div>
              {detailsCp} {detailsVille}
            </div>
            <select disabled={disabledField} className="formSectionInput" name={detailsEquipe} id="portique-lavage" onChange={(e) => { state({ detailsEquipe: (e.target.value) }) }}>
              <option value={detailsEquipe}>{detailsEquipe}</option>
              <option value="G1">G1</option>
              <option value="G2">G2</option>
              <option value="G3">G3</option>
              <option value="G4">G4</option>
              <option value="G5">G5</option>
            </select>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3 className="detailsPlanningSectionNom">Détails de l'intervention</h3>
          <form onSubmit={submitHandler} className="formPlanningModifications">
            <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Station service :</p>
            <input disabled={disabledField} defaultValue={detailsCaracteristiques_de_la_station_service} type="number" className="formSectionInput" onChange={(e) => {
              setDetailsCaracteristiques_de_la_station_service ({ detailsCaracteristiques_de_la_station_service: (e.target.value) })
            }} />
            <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />
            <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }} >Station de lavage</p>
            <div className="dFlex">
              <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Portique de lavage :</p>
              <input disabled={disabledField} defaultValue={detailsNombre_de_portiques_de_lavage} type="number" className="formSectionInput" onChange={(e) => {
                setDetailsNombre_de_portiques_de_lavage({ detailsNombre_de_portiques_de_lavage: (e.target.value) })
              }} />

              <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Pistes haute pression :</p>
              <input disabled={disabledField} defaultValue={detailsNombre_de_pistes_haute_pression} type="number" className="formSectionInput" onChange={(e) => {
                setDetailsNombre_de_pistes_haute_pression({ detailsNombre_de_pistes_haute_pression: (e.target.value) })
              }} />
            </div>
            <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />
            <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }} >Abris chariots :</p>
            <div className="dFlex">
              <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Simple :</p>
              <input disabled={disabledField} defaultValue={detailsNombre_dabris_chariots_simples} type="number" className="formSectionInput" onChange={(e) => {
                setDetailsNombre_dabris_chariots_simples({ detailsNombre_dabris_chariots_simples: (e.target.value) })
              }} />
              <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Double :</p>
              <input disabled={disabledField} defaultValue={detailsNombre_dabris_chariots_doubles} type="number" className="formSectionInput" onChange={(e) => {
                setDetailsNombre_dabris_chariots_doubles({ detailsNombre_dabris_chariots_doubles: (e.target.value) })
              }} />
            </div>
            <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />
            <div className="dFlex">

              <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Aire aspirateur et gonflage :</p>
              <input disabled={disabledField} defaultValue={detailsNombre_daires_aspirateur_gonflage} type="number" className="formSectionInput" onChange={(e) => {
                setDetailsNombre_daires_aspirateur_gonflage({ detailsNombre_daires_aspirateur_gonflage: (e.target.value) })
              }} />

            </div>
            <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />
            <div className="dFlex">
              <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Entrée magasin :</p>
              <input disabled={disabledField} defaultValue={detailsNombre_entrees_de_magasin} type="number" className="formSectionInput" onChange={(e) => {
                setDetailsNombre_entrees_de_magasin({ detailsNombre_entrees_de_magasin: (e.target.value) })
              }} />
            </div>
            <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />
            <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Type de auvent :</p>
            <input disabled={disabledField} defaultValue={detailsType_auvent} type="number" className="formSectionInput" onChange={(e) => {
              setDetailsType_auvent({ detailsType_auvent: (e.target.value) })
            }} />
            <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />

            <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Totem :</p>
            <input disabled={disabledField} defaultValue={detailsTotem} type="number" className="formSectionInput" onChange={(e) => {
              setDetailsTotem({ detailsTotem: (e.target.value) })
            }} />
            <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />

            <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Hauteur Bardage :</p>
            <input disabled={disabledField} defaultValue={detailsHauteur_du_bardage} type="number" className="formSectionInput" onChange={(e) => {
              setDetailsHauteur_du_bardage({ detailsHauteur_du_bardage: (e.target.value) })
            }} />
            <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />

            <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Toiture nettoyable :</p>
            <input disabled={disabledField} defaultValue={detailsNettoyabilite_toiture} type="number" className="formSectionInput" onChange={(e) => {
              setDetailsNettoyabilite_toiture({ detailsNettoyabilite_toiture: (e.target.value) })
            }} />
            <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />
            <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Gouttière Apparente :</p>
            <input disabled={disabledField} defaultValue={detailsVisibilite_gouttiere} type="number" className="formSectionInput" onChange={(e) => {
              setDetailsVisibilite_gouttiere({ detailsVisibilite_gouttiere: (e.target.value) })
            }} />
            <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />

            <button disabled={disabledField} variant="primary" type="submit">
              Editer
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <div>

            <Button variant="primary" onClick={handleEdit}>
              Editer
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

    </div>
  )

}

const handleSubmit = (event, selectedCustomers, selectedDay, setEventsToDisplay, setShow, setSelectedCustomers) => {
  event.preventDefault();
  const newEvents = selectedCustomers.map(client => {
    let date = new Date(selectedDay);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let formattedDate = year + month + day;
    let headers = { "Content-Type": "application/json" };
    let url = `https://espacepro.jimmys-box.com/wp-json/capvert/gms-intervention/ajouter?idchantier=${client.id}&listeequipiers=[01,200,58,1476]&nombredeportiquesdelavage=10&extrapisteshautepression=25&extratotem=2&extraabrischariotsdoubles=30&extraabrischariotssimples=50&notesprecisionsintervention=Penser à nettoyer le rideau de fer de l'entrée principale&dateintervention=${formattedDate}`;

    // Appel API en requête GET
    axios.get(url, headers)
      .then(response => {
        console.log('gggggg', response);
      })
      .catch(err => {
        console.error(err);
      });

    return {
      id: createEventId(),
      title: client.identite_commercial,
      start: selectedDay,
      backgroundColor: 'blue',
      extendedProps: {
        customData: {
          ca: client.ca_ht,
          ville: client.ville_commercial,
          cp: client.code_postal_commercial
        }
      }
    }
  });

  setEventsToDisplay(eventsToDisplay => [...eventsToDisplay, ...newEvents]);
  setShow(false);
  setSelectedCustomers([]);
}

const search = (items) => {
  return items.filter((item) => {
    return searchTerm.some((newItem) => {

      return (
        typeof item[newItem] !== 'undefined' &&
        item[newItem]
          .toString()
          .toLowerCase()
          .indexOf(q.toLowerCase()) > -1
      );
    });
  });
}
const closeModal = () => {
  setShow(false);
};

const closeModalDetailsEvent = () => {
  setShowDetailsEvent(false);
};

const handleDateSelect = async (selectInfo) => {
  setSelectedDay(selectInfo.dateStr);
  let calendarApi = selectInfo.view.calendar;
  console.log('selectedDay : ', selectedDay);
  calendarApi.unselect();
  setShow(true);

  let title = nomClient;
  let idChantierModif = idChantier;
  let caClient = caClient;
  let cpClient = cpClient;
  let villeClient = villeClient;

  if (title) {
    let newEvent = {
      id: createEventId(),
      title,
      start: selectInfo.dateStr,
      end: selectInfo.dateStr,
      allDay: selectInfo.allDay,
      backgroundColor: 'blue',
      idChantierModif,
      extendedProps: {
        customData: {
          ca: caClient,
          ville: villeClient,
          cp: cpClient
        }
      }
    };
    setEventsToDisplay((prevEvents) => [...prevEvents, newEvent]);
  }
  setNomClient('');
};



function renderEventContent(eventInfo) {
  let date = new Date();
  let newdate = new Date(eventInfo.event.start);

  if (date > newdate) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'gray', padding: 3 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <b>{eventInfo.event.title}</b>
          <b>{eventInfo.event.caClient}</b>
          <p className="ca" style={{ color: 'white', marginBottom: 0 }} >{eventInfo.event.extendedProps.customData.ca}€</p>
          <pmg src="/icon-green-check.png" width="20" height="17" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p style={{ textAlign: 'left' }} >{eventInfo.event.extendedProps.customData.cp}</p>
          <p style={{ textAlign: 'right' }} >Equipe {eventInfo.event.extendedProps.customData.equipe}</p>
        </div>
        <p style={{ textAlign: 'left' }} >{eventInfo.event.extendedProps.customData.ville}</p>
      </div>
    );
  } else {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#a0c951', borderColor: '#ffd633', padding: 3 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <b>{eventInfo.event.title}</b>
          <b>{eventInfo.event.caClient}</b>
          <p className="ca" style={{ color: 'white', marginBottom: 0 }} >{eventInfo.event.extendedProps.customData.ca}€</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p style={{ textAlign: 'left' }} >{eventInfo.event.extendedProps.customData.cp}</p>
          <p style={{ textAlign: 'right' }} >Equipe {eventInfo.event.extendedProps.customData.equipe}</p>
        </div>
        <p style={{ textAlign: 'left' }} >{eventInfo.event.extendedProps.customData.ville}</p>
      </div>
    );
  }
}

export default LogistiqueGmsEquipe1;