import React, { useState, useRef, useEffect } from 'react';
import frLocale from '@fullcalendar/core/locales/fr';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { createEventId } from '../event-utils'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useLocalStorage } from '../../../functions/connexion';

function LogistiqueSolaire(props) {
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
  const [surfaceClient, setSurfaceClient] = useState('');
  const [cpClient, setCpClient] = useState('');
  const [villeClient, setVilleClient] = useState('');
  const [searchTerm, setSearchTerm] = useState(["ville_commercial"]);
  const [data3, setData3] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');
  const [idIntervention, setIdIntervention] = useState(null);
  const [detailsMagasin, setDetailsMagasin] = useState('');
  const [detailsSurface, setDetailsSurface] = useState('');
  const [detailsCp, setDetailsCp] = useState('');
  const [detailsVille, setDetailsVille] = useState('');
  const [detailsAcces_eau, setDetailsAcces_eau] = useState('');
  const [detailsAcces_electricite, setDetailsAcces_electricite] = useState('');
  const [detailsAnnee_installation_panneaux, setDetailsAnnee_installation_panneaux] = useState('');
  const [detailsNombre_de_batiments, setDetailsNombre_de_batiments] = useState('');
  const [detailsType_panneaux, setDetailsType_panneaux] = useState('');
  const [detailsPourcentage_de_pente, setDetailsPourcentage_de_pente] = useState('');
  const [detailsAccessibilite, setDetailsAccessibilite] = useState('');
  const [detailsInterdiction_intervention, setDetailsInterdiction_intervention] = useState('');
  const [detailsVolumeEau, setDetailsVolumeEau] = useState('');
  const [detailsHauteurDeBasDeToiture, setDetailsHauteurDeBasDeToiture] = useState('');
  const [detailsSurfaceANettoye, setDetailsSurfaceANettoye] = useState('');

  const [disabledField, setDisabledField] = useState(true);
  const [activateField, setActivateField] = useState(true);
  const [bckColor2, setBckColor2] = useState('gray');
  const [getSurfaceLimit, setGetSurfaceLimit] = useLocalStorage('surfaceLimit', 0);
  const [eventsToDisplay, setEventsToDisplay] = useState(() => []);
  const elementRef = useRef();
  const myComponentRef = useRef();

  // Equivalent of componentDidMount method
  useEffect(() => {
    let headers = {
      "Content-Type": "application/json"
    };
    fetch('https://espacepro.jimmys-box.com/wp-json/capvert/solaire-intervention/lister', { headers })

      .then((response) => response.json())
      .then((data) => {
        setFullData(data);
        setData(data);
        setEventsToDisplay(data.map(config => ({
          id: config.id,
          title: config.nom_client,
          start: config.date_intervention,
          extendedProps: {
            customData: {
              idChantierAssocie: config.id_chantier_associe,
              surface: config.surface,
              ville: config.ville,
              cp: config.code_postal,
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

    fetch('https://espacepro.jimmys-box.com/wp-json/capvert/solaire-chantier/lister', { headers })
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
    let url = `https://espacepro.jimmys-box.com/wp-json/capvert/solaire-intervention/mettreajour?idintervention=${event.id}&dateintervention=${formattedDate}&changementmanuel=false`;
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
    let url = `https://espacepro.jimmys-box.com/wp-json/capvert/solaire-intervention/mettreajour?idintervention=${idIntervention}&extraportiquesdelavage=${detailsNombre_de_batiments}&extrapisteshautepression=${detailsType_panneaux}&extratotem=&extraabrischariotsdoubles=${detailsInterdiction_intervention}&extraabrischariotssimples=${detailsVolumeEau}&notesprecisionsintervention=&extraairesaspirateurgonflage=${detailsHauteurDeBasDeToiture}&extraentreesdemagasin=${detailsSurfaceANettoye}`;

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
      div2.textContent = `Surface hebdomadaire (${getSurfaceLimit}m²)`;
      div2.classList.add('sum-header'); // Add a class to the div for easy removal later
      pElement2.appendChild(div2);
    });

    const trArray = Array.from(pElements).map((pElement) => {
      const pElement2s = pElement.querySelectorAll('.ca');

      const caArray = Array.from(pElement2s).map((pElement2, index) => {
        return parseInt(pElement2.textContent.replace('€', ''));
      });

      const surfaceLimit = caArray.reduce((acc, current) => acc + current, 0);

      return { caArray, surfaceLimit };
    });

    const surfaceArray = trArray.map((tr) => {
      return tr.caArray.reduce((acc, current) => acc + current, 0);
    });

    const copySumArray = [...surfaceArray];
    copySumArray.forEach((surfaceLimit, index) => {

      const pElement = pElements[index];
      const existingDiv = pElement.querySelector('.sum-value');
      if (existingDiv) {
        pElement.removeChild(existingDiv);
      }

      const div = document.createElement('div');
      div.textContent = surfaceLimit + 'm²';
      div.classList.add('sum-value'); // Add a class to the div for easy removal later
      pElement.appendChild(div);

      const surfaceValue = pElement.querySelector('.sum-value');

      if (surfaceLimit < getSurfaceLimit) {
        pElement.setAttribute('style', 'border: solid 2px black');
        sumValue.style.color = 'white';
        sumValue.style.backgroundColor = '#ff000066';
      } else {
        pElement.setAttribute('style', 'border: solid 2px black');
        surfaceValue.style.backgroundColor = '#0080008f';
        surfaceValue.style.color = 'white';
      }
    });
  }, [fullData, selectedCustomers, detailsNombre_de_batiments, detailsType_panneaux, detailsInterdiction_intervention, detailsVolumeEau, detailsHauteurDeBasDeToiture]);
  const handleEventClick = (eventInfo) => {
    setShowDetailsEvent(true);
    setIdIntervention(eventInfo.event.id);
    setDetailsMagasin(eventInfo.event.title);
    setDetailsSurface(eventInfo.event.extendedProps.customData.surface);
    setDetailsCp(eventInfo.event.extendedProps.customData.cp);
    setDetailsVille(eventInfo.event.extendedProps.customData.ville);
    setDetailsEquipe(eventInfo.event.extendedProps.customData.equipe);
    setDetailsAcces_eau(eventInfo.event.extendedProps.customData.detailsIntervention[0].nombreBase);
    setDetailsAcces_electricite(eventInfo.event.extendedProps.customData.detailsIntervention[1].nombreBase);
    setDetailsAnnee_installation_panneaux(eventInfo.event.extendedProps.customData.detailsIntervention[2].nombreBase);
    setDetailsNombre_de_batiments(eventInfo.event.extendedProps.customData.detailsIntervention[3].nombreBase);
    setDetailsType_panneaux(eventInfo.event.extendedProps.customData.detailsIntervention[4].nombreBase);
    setDetailsPourcentage_de_pente(eventInfo.event.extendedProps.customData.detailsIntervention[5].nombreBase);
    setDetailsAccessibilite(eventInfo.event.extendedProps.customData.detailsIntervention[6].nombreBase);
    setDetailsInterdiction_intervention(eventInfo.event.extendedProps.customData.detailsIntervention[7].nombreBase);
    setDetailsVolumeEau(eventInfo.event.extendedProps.customData.detailsIntervention[8].nombreBase);
    setDetailsHauteurDeBasDeToiture(eventInfo.event.extendedProps.customData.detailsIntervention[9].nombreBase);
    setDetailsSurfaceANettoye(eventInfo.event.extendedProps.customData.detailsIntervention[10].nombreBase);

  };

  const handleEvents = (events) => {
    setCurrentEvents(events)

  };
  return (
    <div>
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
              let url = `https://espacepro.jimmys-box.com/wp-json/capvert/solaire-intervention/ajouter?idchantier=${event.extendedProps.idChantierModif}&dateintervention=${formattedDate}`;

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
            onChange={(e) => setQ(e.target.value)}
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
                  <p className='nomFicheClientModalPlanning'>Surface : </p>
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
                        <p className='texteFicheClient' style={{ marginBottom: 0, textAlign: 'center' }}>{client.surface}m²</p>
                      </div>
                      {/* <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} /> */}
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
              <span style={{ marginLeft: 20, marginRight: 20 }}>{detailsSurface}m²</span>

            </div>
            <div>
              {detailsCp} {detailsVille}
            </div>
            <select disabled={disabledField} className="formSectionInput" name={detailsEquipe} id="portique-lavage" onChange={(e) => { setDetailsEquipe({ setailsEquipe: (e.target.value) }) }}>
              <option value={detailsEquipe}>{detailsEquipe}</option>
              <option value="S1">S1</option>
              <option value="S2">S2</option>
              <option value="S3">S3</option>
              <option value="S4">S4</option>
              <option value="S5">S5</option>
            </select>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3 className="detailsPlanningSectionNom">Détails de l'intervention</h3>
          <form onSubmit={submitHandler} className="formPlanningModifications">
            <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Nombre de batiments :</p>
            <input disabled={disabledField} defaultValue={detailsNombre_de_batiments} type="number" className="formSectionInput" onChange={(e) => {
              setDetailsNombre_de_batiments({ detailsNombre_de_batiments_extra: (e.target.value) })
            }} />
            <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />
            <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }} >Acces</p>
            <div className="dFlex">
              <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>eau :</p>
              <input disabled={disabledField} defaultValue={detailsAcces_eau} type="number" className="formSectionInput" onChange={(e) => {
                setDetailsAcces_eau({ detailsAcces_eau: (e.target.value) })
              }} />

              <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Electricité :</p>
              <input disabled={disabledField} defaultValue={detailsAcces_electricite} type="number" className="formSectionInput" onChange={(e) => {
                setDetailsAcces_electricite({ detailsAcces_electricite: (e.target.value) })
              }} />

            </div>
            <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />



            <div className="dFlex">

              <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Type de panneaux :</p>
              <input disabled={disabledField} defaultValue={detailsType_panneaux} type="number" className="formSectionInput" onChange={(e) => {
                setDetailsType_panneaux({ detailsType_panneaux: (e.target.value) })
              }} />



            </div>
            <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />
            <div className="dFlex">

              <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Pourcentage de la pente :</p>
              <input disabled={disabledField} defaultValue={detailsPourcentage_de_pente} type="number" className="formSectionInput" onChange={(e) => {
                setDetailsPourcentage_de_pente({ detailsPourcentage_de_pente: (e.target.value) })
              }} />

            </div>
            <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />
            <div className="dFlex">
              <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Accessibilité :</p>
              <input disabled={disabledField} defaultValue={detailsAccessibilite} type="number" className="formSectionInput" onChange={(e) => {
                setDetailsAccessibilite({ detailsAccessibilite: (e.target.value) })
              }} />
            </div>
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
    let url = `https://espacepro.jimmys-box.com/wp-json/capvert/solaire-intervention/ajouter?idchantier=${client.id}&dateintervention=${formattedDate}`;

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
          surface: client.surface,
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
  let surfaceClient = surfaceClient;
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
          surface: surfaceClient,
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
          <b>{eventInfo.event.surfaceClient}</b>
          <p className="ca" style={{ color: 'white', marginBottom: 0 }} >{eventInfo.event.extendedProps.customData.surface}m²</p>
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
          <b>{eventInfo.event.surfaceClient}</b>
          <p className="ca" style={{ color: 'white', marginBottom: 0 }} >{eventInfo.event.extendedProps.customData.surface}m²</p>
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

export default LogistiqueSolaire;