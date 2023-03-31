import React from 'react';

interface Props {
    values: {
        allFilenames: string[];
        urlPrevisualisation: string;
        horaireDebut: string;
        horaireFin: string;
        procede: string;
        meteo: string;
        resultat: string;
        observation: string;
        supports: string;
        ville: string;
        dateIntervention: string;
        adresse: string;
        frequenceNettoyage: string;
        nomContact: string;
        nomClient: string;
        photos: string[];
        idIntervention: string;
        idChantier: string;
        signatureClientData: string;
        signatureCapVertData: string;
    };
    prevStep: () => void;
    nextStep: () => void;
}

const RapportConfirmation: React.FC<Props> = ({ values, prevStep, nextStep }) => {
    const {
        allFilenames,
        urlPrevisualisation,
        horaireDebut,
        horaireFin,
        procede,
        meteo,
        resultat,
        observation,
        supports,
        ville,
        dateIntervention,
        adresse,
        frequenceNettoyage,
        nomContact,
        nomClient,
        photos,
        idIntervention,
        idChantier,
        signatureClientData,
        signatureCapVertData,
    } = values;

    const Continue = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        nextStep();
    };

    const Previous = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        prevStep();
    };

    const Sub = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        prevStep();
    };

    const options = {
        method: 'POST',
        url: 'https://espacepro.jimmys-box.com/wp-json/capvert/gms-rapport/ajouter',
        headers: { 'content-type': 'application/json' },
        data: {
            nomclient: nomClient,
            ville: ville,
            nomcontact: nomContact,
            adresse: adresse,
            dateintervention: dateIntervention,
            frequencenettoyage: frequenceNettoyage,
            horairedebut: horaireDebut,
            horairefin: horaireFin,
            supports: supports,
            procede: procede,
            resultat: resultat,
            observation: observation,
            idintervention: idIntervention,
            idchantier: idChantier,
            meteo: meteo,
            signature1: signatureClientData.substring(22),
            signature2: signatureCapVertData.substring(22),
            urlphotos: `[${allFilenames}]`,
        },
    };

    return (
        <div>
            <iframe style={{ width: '100%', minHeight: '100vh', aspectRatio: 1 / 1.4142 }} src={urlPrevisualisation} />
            <button onClick={Previous}><svg style={{ marginRight: '10px' }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
            </svg>Signatures</button>
            <button onClick={Continue}>Valider
                <svg style={{ marginLeft: '10px' }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                </svg></button>
        </div>
    );
}


export default RapportConfirmation;