import React from 'react';

interface RapportHoraireProps {
  nextStep: () => void;
  handleChange: (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  values: {
    horaireDebut: string;
    horaireFin: string;
  };
}

const RapportHoraire: React.FC<RapportHoraireProps> = ({ nextStep, handleChange, values }) => {

  const Continue = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    nextStep();
  }

  return (
    <div className="rapportOuterContainer">
      <form className="rapportInnerContainer">
        <div>
          <div className="rapportInputContainer">
            <label htmlFor="horaireDebut">Définir l'heure du début de nettoyage :</label>
            <input
              type="time"
              id="horaireDebut"
              name="horaireDebut"
              value={values.horaireDebut}
              onChange={handleChange('horaireDebut')}
              required
            />
          </div>
          <div className="rapportInputContainer">
            <label htmlFor="horaireFin">Définir l'heure de fin de nettoyage :</label>
            <input
              type="time"
              id="horaireFin"
              name="horaireFin"
              value={values.horaireFin}
              onChange={handleChange('horaireFin')}
              required
            />
          </div>
        </div>
        <div className="rapportButtonNavigationContainer">
          <button onClick={Continue}>
            Supports nettoyés
            <svg style={{ marginLeft: '10px' }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default RapportHoraire;