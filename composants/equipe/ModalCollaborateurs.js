import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { encode as base64_encode } from 'base-64';
import axios from 'axios';



const ModalCollaborateurs = (props) => {

   const [data, setData] = useState([]);
   const [isLoading, setLoading] = useState(true);

   const id = props.id;
  const [prenom, setPrenom] = useState(props.prenom);
  const [nom, setNom] = useState(props.nom);
  const [phone, setPhone] = useState(props.phone);
  const [email, setEmail] = useState(props.email);
  const [role, setRole] = useState(props.role);
  const [equipe, setEquipe] = useState(props.equipe);
  const [branche, setBranche] = useState(props.branche);


   const [show, setShow] = useState(false);
   const handleshow = () => setShow(true);
   const [disabledField, setDisabledField] = useState(true);
   const [hiddenField, setHiddenField] = useState(true);

   const handleEdit = () => {
     setDisabledField(false);
     setHiddenField(false);
 }

   const submitHandler = (e) => {
    e.preventDefault();

    // Déclaration des paramètres de requête API
    let token = "kevin:1DPX hxdj 9R5C qSLn Ga8k qWV9";
    let encodedToken = base64_encode(token);
    let headers = { "Content-Type": "application/json" };
    let url = `https://espacepro.jimmys-box.com/wp-json/capvert/collaborateur/mettreajour?idcollaborateur=${id}&prenomcollaborateur=${prenom}&nomcollaborateur=${nom}&telephonecollaborateur=${phone}&droitsacces=${role}&idequipe=${equipe}&emailcollaborateur=${email}&branchecollaborateur=${branche}`;

    // Appel API en requête GET
    axios.get(url, headers)
        .then(response => {
            console.log(response);
            alert('Collaborateur mis à jour');
            setDisabledField(true);
            setHiddenField(true);
            setShow(false);
        })
        .catch(err => {
            console.error(err);
          
        });


   }




   const handleClose = () => {
     if (disabledField === true) {
         setShow(false);
     }
     else if (window.confirm("Voulez-vous vraiment annuler ?") === true) {
         setDisabledField(true);
         setHiddenField(true);
         setShow(false);
     } else {

     }

 };










   return (
     <div style={{display:'flex',flexDirection:'column'}}>


           
                 <div onClick={handleshow} className="ficheClientListOuterContainer" style={{margin:0}}>
                   <div style={{ width: '20%' }}>
                     <p className='nomFicheClient' style={{ marginBottom: 0, textAlign: 'center' }}>{prenom}</p>
                   </div>
                   <div style={{ width: '20%' }}>
                     <p className='texteFicheClient'>{phone}</p>
                   </div>
                   <div style={{ width: '20%' }}>
                     <p className='texteFicheClient'>{role}</p>
                   </div>
                   <div style={{ width: '20%' }}>
                     <p className='texteFicheClient'>{equipe}</p>
                   </div>
                 </div>
                 <hr style={{ backgroundColor: '#a0c951', height: 2, margin: 0 }} />
                 <Modal
                   show={show} onHide={handleClose}
                   className="modalGestionForm"
                 >
                   <Modal.Header closeButton>
                     <Modal.Title>
                       <p className='nomFicheClient' style={{ marginBottom: 0, marginRight: 10 }}>{prenom}</p>
                       <p className='texteFicheClient'>{role}</p>
                     </Modal.Title>
                   </Modal.Header>
                   <Modal.Body>
                     <form onSubmit={submitHandler}>
                     <div className="formSection dFlex justifyCenter alignCenter flexColumn" >
                     <div className="formSectionInner dFlex justifyBetween width500" >
                       <div className="formSectionChamp">
                         <p className="formSectionLabel">Prénom</p>
                         <input disabled={disabledField}  className="formSectionInput" type="text" defaultValue={prenom} onChange={(e) => { setPrenom(e.target.value) }} />
                       </div>
                       <div className="formSectionChamp">
                         <p className="formSectionLabel">Nom</p>
                         <input disabled={disabledField}  className="formSectionInput" type="text" defaultValue={nom} onChange={(e) => { setNom(e.target.value) }} />
                       </div>
                  
                     </div>
                     <div className="formSectionInner dFlex justifyBetween width500" >
                     <div className="formSectionChamp">
                       <p className="formSectionLabel">Numéro de téléphone</p>
                       <input className="formSectionInput" type="text" defaultValue={phone} onChange={(e) => { setPhone(e.target.value) }} />
                     </div>
                     <div className="formSectionChamp">
                       <p className="formSectionLabel">Adresse email</p>
                       <input className="formSectionInput" type="email" defaultValue={email} onChange={(e) => { setEmail(e.target.value) }} />
                     </div>
                   </div>
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
                           <option value="G1">G1</option>
                           <option value="G2">G2</option>
                           <option value="G3">G3</option>
                           <option value="G4">G4</option>
                           <option value="G5">G5</option>
                         </select>
                       </div>
                 
                     <div className="formSectionChamp">
                       <p className="formSectionLabel">Branche</p>
                       <select disabled={disabledField} className="formSectionInput" name={branche} id="branche" onChange={(e) => { setBranche(e.target.value) }}>
                         <option value={branche}>{branche}</option>
                         <option value="gms">GMS</option>
                         <option value="solaire">SOLAIRE</option>
      
                       </select>
                     </div>
                   </div>
                   <div className="formSectionChamp width500">
                <p className="formSectionLabel">Role</p>
                <select disabled={disabledField} className="formSectionInput" name={role} id="equipe" onChange={(e) => { setRole(e.target.value) }}>
                <option value={role}>{role}</option>
                  <option value="administrateur">Administrateur</option>
                  <option value="manager">Chef d'équipe</option>
                  <option value="collaborateur">Collaborateur</option>
                </select>
              </div>
                   </div>
                   <div className="dFlex formSectionInner justifyCenter" >
      
                     <button hidden={hiddenField} type="submit"  style={{ margin: 'auto' }}>
                       Modifier le collaborateur
                     </button>
      
                   </div>
          
                     </form>
                   </Modal.Body>
                   <Modal.Footer>
                   <Button variant="secondary" onClick={handleClose}>
                       Fermer
                   </Button>
      
                       <Button variant="primary" onClick={handleEdit}>
                           Editer
                       </Button>
          
               </Modal.Footer>
                 </Modal>
              



   
     </div>
   )
}

export default ModalCollaborateurs