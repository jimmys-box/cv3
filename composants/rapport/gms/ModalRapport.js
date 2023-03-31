import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { encode as base64_encode } from 'base-64';
import axios from 'axios';



const ModalRapport = (props) => {

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const id = props.id;
  const idChantier = props.idChantier;
  const nom = props.nomClient;
  const adresse = props.adresse;
  const dateIntervention = props.dateIntervention;
  const urlRapport = props.urlRapport;
  //const [equipe, setEquipe] = useState(props.equipe);


  const [show, setShow] = useState(false);
  const handleshow = () => setShow(true);
  const handleClose = () => setShow(false);







console.log(nom);


  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>



      <div onClick={handleshow} className="ficheClientListOuterContainer" style={{ margin: 0 }}>
        <div style={{ width: '20%' }}>
         <p className='nomFicheClient' style={{ marginBottom: 0, textAlign: 'center' }}>{nom}</p>
        </div>
        <div style={{ width: '20%' }}>
          <p className='texteFicheClient'>{adresse}</p>
        </div>
        <div style={{ width: '20%' }}>
          <p className='texteFicheClient'>{dateIntervention}</p>
        </div>
        <div style={{ width: '20%' }}>
          <p className='texteFicheClient'>equipe</p>
        </div>
      </div>
      <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />
      <Modal
        show={show} onHide={handleClose}
        className="modalGestionForm"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <p className='nomFicheClient' style={{ marginBottom: 0, marginRight: 10 }}>{nom}</p>
            <p className='texteFicheClient'>{dateIntervention}</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <iframe style={{ width: '100%', minHeight: '100vh', aspectRatio: 1 / 1.4142 }} src={urlRapport} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>





    </div>
  )
}

export default ModalRapport