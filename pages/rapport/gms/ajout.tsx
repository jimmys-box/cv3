import Rapport from '@/composants/rapport/gms/rapport';
import { useRouter } from 'next/router';

export default function RapportGms() {
  const router = useRouter();
  const isFromLink = router.asPath.startsWith('/planning/gms-equipe-1');
  const { dateIntervention, adresse, frequenceNettoyage, nomContact, nomClient, ville, idChantier, idIntervention } = router.query;
  const dateParts = dateIntervention?.toString().match(/(\d{4})(\d{2})(\d{2})/);
  const formattedDate = dateParts ? `${dateParts[3]}/${dateParts[2]}/${dateParts[1]}` : '';
  return (
    <>
      {idIntervention ? (
        <div>
          <div style={{ textAlign: 'center', color: 'white' }}>
            <h2>rapport d'intervention du {formattedDate}</h2>
          </div>

          <Rapport dateIntervention={formattedDate} adresse={adresse} frequenceNettoyage={frequenceNettoyage} nomContact={nomContact} nomClient={nomClient} ville={ville} idChantier={idChantier} />
        </div>
      ) : (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2>Vous devez choisir une intervention sur le planning pour accéder à la génération de rapport</h2>
        </div>
      )}
    </>
  )
}
