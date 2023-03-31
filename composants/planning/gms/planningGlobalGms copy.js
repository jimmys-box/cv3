import React, { Fragment } from 'react';
import frLocale from '@fullcalendar/core/locales/fr';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { createEventId } from '../event-utils'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default class LogistiqueGms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weekendsVisible: false,
      currentEvents: [],
      show: false,
      showDetailsEvent: false,
      loading: false,
      data: [],
      data2: [],
      error: null,
      query: '',
      fullData: [],
      fullData2: [],
      recherche: '',
      chronometre: null,
      q: '',
      nomClient: '',
      idChantier: '',
      caClient: '',
      cpClient: '',
      villeClient: '',
      searchTerm: ["ville_commercial"],
      data3: [],
      searchTerm2: '',
      selectedCustomers: [],
      selectedDay: '',
      idIntervention: null,
      detailsMagasin: '',
      detailsCa: '',
      detailsCp: '',
      detailsVille: '',
      detailsAcces_eau: '',
      detailsCaracteristiques_de_la_station_service: '',
      detailsNombre_de_portiques_de_lavage_base: '',
      detailsNombre_de_portiques_de_lavage_extra: '',
      detailsNombre_de_portiques_de_lavage_tarif: '',
      detailsNombre_de_portiques_de_lavage_ca_supplementaire: '',
      detailsNombre_de_pistes_haute_pression_base: '',
      detailsNombre_de_pistes_haute_pression_extra: '',
      detailsNombre_de_pistes_haute_pression_tarif: '',
      detailsNombre_de_pistes_haute_pression_ca_supplementaire: '',
      detailsType_auvent: '',
      detailsTotem: '',
      detailsNombre_dabris_chariots_doubles_base: '',
      detailsNombre_dabris_chariots_doubles_extra: '',
      detailsNombre_dabris_chariots_doubles_tarif: '',
      detailsNombre_dabris_chariots_doubles_ca_supplementaire: '',
      detailsNombre_dabris_chariots_simples_base: '',
      detailsNombre_dabris_chariots_simples_extra: '',
      detailsNombre_dabris_chariots_simples_tarif: '',
      detailsNombre_dabris_chariots_simples_ca_supplementaire: '',
      detailsNombre_daires_aspirateur_gonflage_base: '',
      detailsNombre_daires_aspirateur_gonflage_extra: '',
      detailsNombre_daires_aspirateur_gonflage_tarif: '',
      detailsNombre_daires_aspirateur_gonflage_ca_supplementaire: '',
      detailsNombre_entrees_de_magasin_base: '',
      detailsNombre_entrees_de_magasin_extra: '',
      detailsNombre_entrees_de_magasin_tarif: '',
      detailsNombre_entrees_de_magasin_ca_supplementaire: '',
      sumTest: '',
      detailsHauteur_du_bardage: '',
      detailsNettoyabilite_toiture: '',
      detailsVisibilite_gouttiere: '',
      newCa: null,
      oldDisplay: 'none',
      oldCaStyle: 'none',
      oldCaColor: 'black',
      testSum: [],
      disabledField: true,
      activateField: true,
      bckColor2: 'gray',
      eventsToDisplay: () => [],
      elementRef: React.createRef(),
      myComponentRef: React.createRef(),
    };
  }



  componentDidMount() {
    let headers = {
      "Content-Type": "application/json"
    };
    fetch('https://espacepro.jimmys-box.com/wp-json/capvert/gms-intervention/lister', { headers })

      .then((response) => response.json())
      .then((data2) => {
        this.setState({
          data2,
          fullData: data2,
          eventsToDisplay: data2.map(config => ({
            id: config.id,
            title: config.nom_client,
            start: config.date_intervention,

            extendedProps: {
              customData: {
                idChantierAssocie: config.id_chantier_associe,
                ca: config.ca_ht_base,
                ville: config.ville_chantier,
                cp: config.code_postal_chantier,
                equipe: config.id_equipe,
                detailsIntervention: (config.prestations).map(configPrestations => ({
                  type: configPrestations.type,
                  nombreBase: configPrestations.nombre_base,
                  nombreExtra: configPrestations.nombre_supplementaire,
                  tarif: configPrestations.tarif_de_base,
                  caSupplementaire: config.ca_ht_supplementaire
                })),
              }
            }
          })),
        });
      });

    fetch('https://espacepro.jimmys-box.com/wp-json/capvert/gms-chantier/lister', { headers })
      .then((response) => response.json())
      .then((data3) => {
        this.setState({
          data3,
          fullData2: data3,

        });
      });

  }




  handleChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  }


  handleCheckboxChange = (event) => {
    const client = JSON.parse(event.target.dataset.client);
    let updatedSelectedCustomers = [...this.state.selectedCustomers];
    if (event.target.checked) {
      updatedSelectedCustomers.push(client);
    } else {
      updatedSelectedCustomers = updatedSelectedCustomers.filter(cust => cust.id !== client.id);
    }
    this.setState({ selectedCustomers: updatedSelectedCustomers });
  }

  handleEventReceive = (info) => {
    // Create new event based on the data of the external element
    console.log(info.draggedEl.innerHTML);
    const newEvent = {
      title: info.draggedEl.innerHTML,
      start: info.event.start,
      end: info.event.end,
      eventDraggable: true
    }
    this.setState(prevState => ({
      events: [...prevState.events, newEvent]
    }));
  };


  updateEvent = async (info) => {
    const { event } = info;
    let date = new Date(event.start);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let formattedDate = year + month + day;
    let headers = { "Content-Type": "application/json"};
    let url = `https://espacepro.jimmys-box.com/wp-json/capvert/gms-intervention/mettreajour?idintervention=${event.id}&dateintervention=${formattedDate}&changementmanuel=false`;

    // Appel API en requête GET
    axios.get(url, headers)
      .then(response => {
        console.log('gggggg', response);
        this.setState({ bckColor2: 'red' });
      })
      .catch(err => {
        console.error(err);
      

      });

  };

  submitHandler = (e) => {

    // Empêche le rechargement de la page
    e.preventDefault();

    // Déclaration des paramètres de requête API

    let headers = { "Content-Type": "application/json" };
    let url = `https://espacepro.jimmys-box.com/wp-json/capvert/gms-intervention/mettreajour?idintervention=${this.state.idIntervention}&extraportiquesdelavage=${this.state.detailsNombre_de_portiques_de_lavage_extra}&extrapisteshautepression=${this.state.detailsNombre_de_pistes_haute_pression_extra}&extratotem=&extraabrischariotsdoubles=${this.state.detailsNombre_dabris_chariots_doubles_extra}&extraabrischariotssimples=${this.state.detailsNombre_dabris_chariots_simples_extra}&notesprecisionsintervention=&extraairesaspirateurgonflage=${this.state.detailsNombre_daires_aspirateur_gonflage_extra}&extraentreesdemagasin=${this.state.detailsNombre_entrees_de_magasin_extra}`;

    // Appel API en requête GET
    axios.get(url, headers)
      .then(response => {
        console.log(response);
        this.setState({ disabledField: true });
      })
      .catch(err => {
        console.error(err);
       

      });

  }

  handleEdit = () => {
    this.setState({ disabledField: false });
    this.setState({ activateField: false });
  }

  handleClose = () => {
    if (this.state.disabledField === true) {
      this.setState({ showDetailsEvent: false });
    }
    else if (window.confirm("Voulez-vous vraiment annuler ?") === true) {
      this.setState({ disabledField: true });
      this.setState({ activateField: true });
      this.setState({ showDetailsEvent: false });

    }

  };
  myComponentRef = React.createRef();
  componentDidUpdate = () => {
    const gmsSum = 1700;
console.log('gmsSum', gmsSum)
    const element = this.myComponentRef.current;
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
      console.log('sum', sum);
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
  };

  render() {

    return (
      <div>
            <div className='planning'>
              <div className='planning-main' ref={this.myComponentRef}>
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
              

                  weekends={this.state.weekendsVisible}
                  events={this.state.eventsToDisplay} // alternatively, use the `events` setting to fetch from a feed
                  dayMaxEvents={4}
                  height="auto" 
                  eventChange={this.updateEvent}


                  dateClick={this.handleDateSelect}
                  eventContent={renderEventContent} // custom render function
                  eventClick={this.handleEventClick}
                  eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
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
            <Modal show={this.state.show} onHide={this.closeModal} style={{ maxWidth: '800px!important' }}>
              <Modal.Header closeButton>
                <Modal.Title style={{ color: 'black' }}>Ajouter un client </Modal.Title>
              </Modal.Header>
              <Modal.Body>

                <input
                  type="search"
                  value={this.state.q}
                  onChange={(e) => this.setState({ q: e.target.value })}
                  style={{ width: '100%' }}
                  placeholder='Rechercher un client'

                />
                {(this.state.q) == '' ? null :
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

                    {this.search(this.state.fullData2).map(client => {
                      const dateParts = client.date_de_dernier_nettoyage.match(/(\d{4})(\d{2})(\d{2})/);
                      const formattedDate = dateParts ? `${dateParts[3]}/${dateParts[2]}/${dateParts[1]}` : '';
                    
                      return (
                        <div key={client.id} className="ficheClientListOuterContainer" style={{ borderColor: '#a0c951', borderWidth: 2, borderStyle: 'solid' }}>
                          <input type="checkbox" data-client={JSON.stringify(client)} value={client.id} onChange={this.handleCheckboxChange} />
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
                <Button variant="secondary" onClick={this.closeModal}>
                  Close
                </Button>
                <Button variant="primary" onClick={this.handleSubmit}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
            <Modal show={this.state.showDetailsEvent} onHide={this.handleClose} style={{ maxWidth: '800px!important' }}>
              <Modal.Header closeButton>
                <Modal.Title style={{ color: 'black', flexDirection: 'column', alignItems: 'start' }}>
                  <div>
                    {this.state.detailsMagasin}
                    <span style={{ color: (this.state.oldCaColor), textDecoration: (this.state.oldCaStyle), marginLeft: 20, marginRight: 20 }}>{this.state.detailsCa}€</span>

                  </div>
                  <div>
                    {this.state.detailsCp} {this.state.detailsVille}
                  </div>
                  <select disabled={this.state.disabledField} className="formSectionInput" name={this.state.detailsEquipe} id="portique-lavage" onChange={(e) => { this.state({ detailsEquipe: (e.target.value) }) }}>
                  <option value={this.state.detailsEquipe}>{this.state.detailsEquipe}</option>
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
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h3 className="detailsPlanningSectionNom">Détails de l'intervention</h3>
                <form onSubmit={this.submitHandler} className="formPlanningModifications">
                  <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Station service :</p>
                  <input disabled={this.state.disabledField} defaultValue={this.state.detailsCaracteristiques_de_la_station_service} type="number" className="formSectionInput" onChange={(e) => {
                    this.setState({ detailsCaracteristiques_de_la_station_service: (e.target.value) })
                  }} />
                  <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />
                  <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }} >Station de lavage</p>
                  <div className="dFlex">
                    <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Portique de lavage :</p>
                    <input disabled={this.state.disabledField} defaultValue={this.state.detailsNombre_de_portiques_de_lavage_extra} type="number" className="formSectionInput" onChange={(e) => {
                      this.setState({ detailsNombre_de_portiques_de_lavage_extra: (e.target.value) })
                    }} />
                
                    <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Pistes haute pression :</p>
                    <input disabled={this.state.disabledField} defaultValue={this.state.detailsNombre_de_pistes_haute_pression_extra} type="number" className="formSectionInput" onChange={(e) => {
                      this.setState({ detailsNombre_de_pistes_haute_pression_extra: (e.target.value) }, () => {
                        if (!this.state.detailsNombre_de_pistes_haute_pression_extra) {

                        } else {
                          this.setState({
                            oldCaColor: '#ff000073',
                            oldCaStyle: 'line-through',
                            oldDisplay: 'inline-bloc'
                          })
                        }
                      })

                    }} />

                  </div>
                  <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />


                  <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }} >Abris chariots :</p>
                  <div className="dFlex">

                    <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Simple :</p>
                    <input disabled={this.state.disabledField} defaultValue={this.state.detailsNombre_dabris_chariots_simples_extra} type="number" className="formSectionInput" onChange={(e) => {
                      this.setState({ detailsNombre_dabris_chariots_simples_extra: (e.target.value) }, () => {
                        if (this.state.detailsNombre_dabris_chariots_simples_extra === 0) {
                        }
                        else {
                          this.setState({
                            oldCaColor: '#ff000073',
                            oldCaStyle: 'line-through',
                            oldDisplay: 'inline-bloc'
                          })
                        }
                      })

                    }} />

                    <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Double :</p>
                    <input disabled={this.state.disabledField} defaultValue={this.state.detailsNombre_dabris_chariots_doubles_extra} type="number" className="formSectionInput" onChange={(e) => {
                      this.setState({ detailsNombre_dabris_chariots_doubles_extra: (e.target.value) }, () => {
                        if (this.state.detailsNombre_dabris_chariots_doubles_extra) {
                          this.setState({
                            oldCaColor: '#ff000073',
                            oldCaStyle: 'line-through',
                            oldDisplay: 'inline-bloc'
                          })
                        }
                      })

                    }} />

                  </div>
                  <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />
                  <div className="dFlex">

                    <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Aire aspirateur et gonflage :</p>
                    <input disabled={this.state.disabledField} defaultValue={this.state.detailsNombre_daires_aspirateur_gonflage_extra} type="number" className="formSectionInput" onChange={(e) => {
                      this.setState({ detailsNombre_daires_aspirateur_gonflage_extra: (e.target.value) }, () => {
                        if (this.state.detailsNombre_daires_aspirateur_gonflage_extra) {
                          this.setState({
                            oldCaColor: '#ff000073',
                            oldCaStyle: 'line-through',
                            oldDisplay: 'inline-bloc'
                          })
                        }
                      })

                    }} />

                  </div>
                  <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />
                  <div className="dFlex">
                    <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Entrée magasin :</p>
                    <input disabled={this.state.disabledField} defaultValue={this.state.detailsNombre_entrees_de_magasin_extra} type="number" className="formSectionInput" onChange={(e) => {
                      this.setState({ detailsNombre_entrees_de_magasin_extra: (e.target.value) }, () => {
                        if (this.state.detailsNombre_entrees_de_magasin_extra) {
                          this.setState({
                            oldCaColor: '#ff000073',
                            oldCaStyle: 'line-through',
                            oldDisplay: 'inline-bloc'
                          })
                        }
                      })

                    }} />
                  </div>
                  <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />
                  <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Type de auvent :</p>
                  <input disabled={this.state.disabledField} defaultValue={this.state.detailsType_auvent} type="number" className="formSectionInput" onChange={(e) => {
                    this.setState({ detailsType_auvent: (e.target.value) })
                  }} />
                  <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />

                  <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Totem :</p>
                  <input disabled={this.state.disabledField} defaultValue={this.state.detailsTotem} type="number" className="formSectionInput" onChange={(e) => {
                    this.setState({ detailsTotem: (e.target.value) })
                  }} />
                  <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />

                  <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Hauteur Bardage :</p>
                  <input disabled={this.state.disabledField} defaultValue={this.state.detailsHauteur_du_bardage} type="number" className="formSectionInput" onChange={(e) => {
                    this.setState({ detailsHauteur_du_bardage: (e.target.value) })
                  }} />
                  <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />

                  <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Toiture nettoyable :</p>
                  <input disabled={this.state.disabledField} defaultValue={this.state.detailsNettoyabilite_toiture} type="number" className="formSectionInput" onChange={(e) => {
                    this.setState({ detailsNettoyabilite_toiture: (e.target.value) })
                  }} />
                  <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />
                  <p className="detailsPlanningSectionLabel" style={{ marginBottom: 0 }}>Gouttière Apparente :</p>
                  <input disabled={this.state.disabledField} defaultValue={this.state.detailsVisibilite_gouttiere} type="number" className="formSectionInput" onChange={(e) => {
                    this.setState({ detailsVisibilite_gouttiere: (e.target.value) })
                  }} />
                  <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />

                  <button disabled={this.state.disabledField} variant="primary" type="submit">
                    Editer
                  </button>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Fermer
                </Button>
                <div>

                  <Button variant="primary" onClick={this.handleEdit}>
                    Editer
                  </Button>
                </div>
              </Modal.Footer>
            </Modal>

      </div>
    )

  }


  handleSubmit = (event) => {
    event.preventDefault();

    const { selectedCustomers, selectedDay } = this.state;
    console.log('selectedCustomers1 : ', selectedCustomers)
    console.log('selectedDay : ', selectedDay)
    const newEvents = selectedCustomers.map(client => {
      let date = new Date(selectedDay);
      let year = date.getFullYear();
      let month = (date.getMonth() + 1).toString().padStart(2, '0');
      let day = date.getDate().toString().padStart(2, '0');
      let formattedDate = year + month + day;
      let headers = { "Content-Type": "application/json"};
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
    console.log('selectedCustomers1 : ', selectedCustomers)
    console.log('newEvents : ', newEvents)
    this.setState({
      eventsToDisplay: [...this.state.eventsToDisplay, ...newEvents],
      show: false,
      selectedCustomers: []
    });
  }

  search = (items) => {
    return items.filter((item) => {
      return this.state.searchTerm.some((newItem) => {

        return (
          typeof item[newItem] !== 'undefined' &&
          item[newItem]
            .toString()
            .toLowerCase()
            .indexOf((this.state.q).toLowerCase()) > -1
        );
      });
    });
  }



  closeModal = () => {
    this.setState({ show: false })
  }
  closeModalDetailsEvent = () => {
    this.setState({ showDetailsEvent: false })
  }




  handleDateSelect = async (selectInfo) => {
    //let title = prompt('Please enter a new title for your event')

    this.setState({ selectedDay: selectInfo.dateStr });
    let calendarApi = selectInfo.view.calendar

    console.log('selectedDay : ', this.state.selectedDay)
    calendarApi.unselect() // clear date selection
    this.setState({ show: true })


    let title = (this.state.nomClient);
    let idChantierModif = (this.state.idChantier);
    let caClient = (this.state.caClient);
    let cpClient = (this.state.cpClient);
    let villeClient = (this.state.villeClient);
    //let test = extraParams.custom_param1;
    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.dateStr,
        end: selectInfo.dateStr,
        allDay: selectInfo.allDay,
        backgroundColor: 'blue',
        idChantierModif: idChantierModif,
        extendedProps: {
          customData: {
            ca: caClient,
            ville: villeClient,
            cp: cpClient
          }

        }
        // bckgroundColor: 'red'
      })
    }
    this.setState({ nomClient: '' })

  }

  handleEventClick = (eventInfo) => {
    this.setState({
      showDetailsEvent: true,
      idIntervention: eventInfo.event.id,
      detailsMagasin: eventInfo.event.title,
      detailsCa: eventInfo.event.extendedProps.customData.ca,
      detailsCp: eventInfo.event.extendedProps.customData.cp,
      detailsVille: eventInfo.event.extendedProps.customData.ville,
      detailsAcces_eau: eventInfo.event.extendedProps.customData.eau,
      

      detailsEquipe: eventInfo.event.extendedProps.customData.equipe,

      detailsCaracteristiques_de_la_station_service: eventInfo.event.extendedProps.customData.detailsIntervention[1].nombreBase,

      detailsNombre_de_portiques_de_lavage_base: eventInfo.event.extendedProps.customData.detailsIntervention[6].nombreBase,
      detailsNombre_de_portiques_de_lavage_extra: eventInfo.event.extendedProps.customData.detailsIntervention[6].nombreExtra,
      detailsNombre_de_portiques_de_lavage_tarif: eventInfo.event.extendedProps.customData.detailsIntervention[6].tarif,
      detailsNombre_de_portiques_de_lavage_ca_supplementaire: eventInfo.event.extendedProps.customData.detailsIntervention[6].caSupplementaire,

      detailsNombre_de_pistes_haute_pression_base: eventInfo.event.extendedProps.customData.detailsIntervention[7].nombreBase,
      detailsNombre_de_pistes_haute_pression_extra: eventInfo.event.extendedProps.customData.detailsIntervention[7].nombreExtra,
      detailsNombre_de_pistes_haute_pression_tarif: eventInfo.event.extendedProps.customData.detailsIntervention[7].tarif,
      detailsNombre_de_pistes_haute_pression_ca_supplementaire: eventInfo.event.extendedProps.customData.detailsIntervention[7].caSupplementaire,

      detailsType_auvent: eventInfo.event.extendedProps.customData.detailsIntervention[2].nombreBase,
      detailsTotem: eventInfo.event.extendedProps.customData.detailsIntervention[8].nombreExtra,

      detailsNombre_dabris_chariots_doubles_base: eventInfo.event.extendedProps.customData.detailsIntervention[10].nombreBase,
      detailsNombre_dabris_chariots_doubles_extra: eventInfo.event.extendedProps.customData.detailsIntervention[10].nombreExtra,
      detailsNombre_dabris_chariots_doubles_tarif: eventInfo.event.extendedProps.customData.detailsIntervention[10].tarif,
      detailsNombre_dabris_chariots_doubles_ca_supplementaire: eventInfo.event.extendedProps.customData.detailsIntervention[10].caSupplementaire,

      detailsNombre_dabris_chariots_simples_base: eventInfo.event.extendedProps.customData.detailsIntervention[9].nombreBase,
      detailsNombre_dabris_chariots_simples_extra: eventInfo.event.extendedProps.customData.detailsIntervention[9].nombreExtra,
      detailsNombre_dabris_chariots_simples_tarif: eventInfo.event.extendedProps.customData.detailsIntervention[9].tarif,
      detailsNombre_dabris_chariots_simples_ca_supplementaire: eventInfo.event.extendedProps.customData.detailsIntervention[9].caSupplementaire,

      detailsNombre_daires_aspirateur_gonflage_base: eventInfo.event.extendedProps.customData.detailsIntervention[11].nombreBase,
      detailsNombre_daires_aspirateur_gonflage_extra: eventInfo.event.extendedProps.customData.detailsIntervention[11].nombreExtra,
      detailsNombre_daires_aspirateur_gonflage_tarif: eventInfo.event.extendedProps.customData.detailsIntervention[11].tarif,
      detailsNombre_daires_aspirateur_gonflage_ca_supplementaire: eventInfo.event.extendedProps.customData.detailsIntervention[11].caSupplementaire,

      detailsNombre_entrees_de_magasin_base: eventInfo.event.extendedProps.customData.detailsIntervention[12].nombreBase,
      detailsNombre_entrees_de_magasin_extra: eventInfo.event.extendedProps.customData.detailsIntervention[12].nombreExtra,
      detailsNombre_entrees_de_magasin_tarif: eventInfo.event.extendedProps.customData.detailsIntervention[12].tarif,
      detailsNombre_entrees_de_magasin_ca_supplementaire: eventInfo.event.extendedProps.customData.detailsIntervention[12].caSupplementaire,

      detailsHauteur_du_bardage: eventInfo.event.extendedProps.customData.detailsIntervention[13].nombreBase,


      detailsNettoyabilite_toiture: eventInfo.event.extendedProps.customData.detailsIntervention[3].nombreBase,
      detailsVisibilite_gouttiere: eventInfo.event.extendedProps.customData.detailsIntervention[4].nombreBase,

    });
    console.log('new chiffre ', this.state.newCa)
  }


  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }

}


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

    )
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

    )
  }


}