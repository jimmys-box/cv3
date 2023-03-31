import React, { useState, useRef, useEffect, useContext } from 'react';
import frLocale from '@fullcalendar/core/locales/fr';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list';
import { createEventId } from '../event-utils'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useLocalStorage } from '../../../functions/connexion';
import Link from 'next/link';
import { useRouter } from 'next/router';

function LogistiqueGmsEquipe(props) {
  const [weekendsVisible, setWeekendsVisible] = useState(false);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [showDetailsEvent, setShowDetailsEvent] = useState(false);
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [detailsEquipe, setDetailsEquipe] = useState('');
  const [idIntervention, setIdIntervention] = useState(null);
  const [idChantier, setIdChantier] = useState(null);
  const [detailsDateIntervention, setDetailsDateIntervention] = useState('');
  const [detailsMagasin, setDetailsMagasin] = useState('');
  const [detailsAdresseComplete, setDetailsAdresseComplete] = useState('');
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
  const [detailsNomContact, setDetailsNomContact] = useState('');
  const [detailsFrequenceNettoyage, setDetailsFrequenceNettoyage] = useState('');
  const [eventsToDisplay, setEventsToDisplay] = useState(() => []);
  const equipe = useLocalStorage('userEquipe', '');


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
              adresse: config.adresse_chantier,
              ville: config.ville_chantier,
              cp: config.code_postal_chantier,
              equipe: config.id_equipe,
              dateIntervention: config.date_intervention,
              adresseComplete: config.adresse_chantier + ', ' + config.code_postal_chantier + ', ' + config.ville_chantier,
              frequenceNettoyage: config.frequence_de_nettoyage,
              nomContact: config.nom_client,
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


  }, []);


  const handleEventClick = (eventInfo) => {
    setDetailsDateIntervention(eventInfo.event.extendedProps.customData.dateIntervention)
    setShowDetailsEvent(true)
    setIdChantier(eventInfo.event.extendedProps.customData.idChantierAssocie)
    setIdIntervention(eventInfo.event.id)
    setDetailsMagasin(eventInfo.event.title)
    setDetailsNomContact(eventInfo.event.extendedProps.customData.nomContact)
    setDetailsFrequenceNettoyage(eventInfo.event.extendedProps.customData.frequenceNettoyage)
    setDetailsAdresseComplete(eventInfo.event.extendedProps.customData.adresseComplete)
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

  const handleClose = () => {
    setShowDetailsEvent(false);
  };

  const router = useRouter();
  const handleClickTest = () => {
    router.push({
      pathname: '/rapport/gms/ajout',
      query: {
        dateIntervention: detailsDateIntervention,
        adresse: detailsAdresseComplete,
        frequenceNettoyage: detailsFrequenceNettoyage,
        nomContact: detailsNomContact,
        nomClient: detailsMagasin,
        ville: detailsVille,
        idIntervention: idIntervention,
        idChantier: idChantier,
      },
    })
  }

  return (
    <div>
      <div className='planning'>
        <div className='planning-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'listMonth,listWeek,listDay',
            }}

            buttonText={{
              listDay: 'Jour',
              listWeek: 'Semaine',
              listMonth: 'Mois'
            }}

            allDaySlot={false}
            slotDuration='01:00:00'
            allDayText=''
            hiddenDays={[6, 7]}
            locale={frLocale}
            initialView='listWeek'
            editable={false}
            selectable={false}
            selectMirror={false}


            weekends={weekendsVisible}
            events={eventsToDisplay} // alternatively, use the `events` setting to fetch from a feed
            dayMaxEvents={4}
            height="auto"



            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            eventsSet={handleEvents} // called after events are initialized/added/changed/removed

          />
        </div>
      </div>

      <Modal show={showDetailsEvent} onHide={handleClose} style={{ maxWidth: '800px!important' }}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: 'black', flexDirection: 'column', alignItems: 'start' }}>
            <div>
              {detailsMagasin}
            </div>
            <div>
              {detailsCp} {detailsVille}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3 className="detailsPlanningSectionNom">Détails de l'intervention</h3>
          <form className="formPlanningModifications">
            <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Station service : {detailsCaracteristiques_de_la_station_service}</p>

            <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />
            <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }} >Station de lavage</p>
        
              <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Portique de lavage : {detailsNombre_de_portiques_de_lavage}</p>
          
              <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Pistes haute pression : {detailsNombre_de_pistes_haute_pression}</p>
         
            <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />
            <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }} >Abris chariots :</p>
        
              <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Simple : {detailsNombre_dabris_chariots_simples}</p>
        
              <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Double : {detailsNombre_dabris_chariots_doubles}</p>
       
            <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />
          
              <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Aire aspirateur et gonflage : {detailsNombre_daires_aspirateur_gonflage}</p>
        
            <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />
           
              <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Entrée magasin : {detailsNombre_entrees_de_magasin}</p>
          
            <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />
            <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Type de auvent : {detailsType_auvent}</p>
            <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />
            <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Totem : {detailsTotem}</p>
            <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />
            <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Hauteur Bardage : {detailsHauteur_du_bardage}</p>
            <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />
            <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Toiture nettoyable : {detailsNettoyabilite_toiture}</p>
            <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />
            <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Gouttière Apparente : {detailsVisibilite_gouttiere}</p>
            <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />

          </form>
        </Modal.Body>
        <Modal.Footer>

          <Button variant="secondary" onClick={handleClickTest}>
            Réaliser le rapport
          </Button>

          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <div>


          </div>
        </Modal.Footer>
      </Modal>

    </div>

  )

}



function renderEventContent(eventInfo) {
  let date = new Date();
  let newdate = new Date(eventInfo.event.start);

  if (date > newdate) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'gray', padding: 3 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <b>{eventInfo.event.title}</b>
          <img src="/icon-green-check.png" width="20" height="17" />
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

export default LogistiqueGmsEquipe;