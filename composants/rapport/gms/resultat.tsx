import React from 'react';

interface Props {
  prevStep: () => void;
  nextStep: () => void;
  handleChange: (input: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  values: {
    resultat: string;
  };
}

const RapportResultat: React.FC<Props> = ({ prevStep, nextStep, handleChange, values }) => {
  const Continue = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    nextStep();
  };

  const Previous = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    prevStep();
  };

  return (
    <div className="rapportOuterContainer">
      <form className="rapportInnerContainer">
        <div className="rapportInputContainer rapportInputContainerSelect">
          <label htmlFor="resultat">Décrire le résultat du nettoyage :</label>
          <input
            type="text"
            id="resultat"
            name="resultat"
            placeholder="très bon résultat"
            value={values.resultat}
            onChange={handleChange('resultat')}
            required
          />
        </div>

        <div className="rapportButtonNavigationContainer">
          <button onClick={Previous}>
            <svg style={{ marginRight: '10px' }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
            </svg>
            Météo
          </button>
          <button onClick={Continue}>
            Observations
            <svg style={{ marginLeft: '10px' }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default RapportResultat;