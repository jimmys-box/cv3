import { useLocalStorage } from '../functions/connexion';
import LogistiqueGms from '../composants/planning/gms/planningGlobalGms'
import LogistiqueGmsEquipe from '@/composants/planning/gms/planningGmsCollaborateur';



export default function planning() {
  const role = useLocalStorage('userRole', '');
    const equipe = useLocalStorage('userEquipe', '');
  return (
    <>
      {role[0] === 'administrator' ? (
        <LogistiqueGms />
      ) : role[0] === 'manager' ? (
        <div>
          <h2>Welcome Manager!</h2>
        </div>
      ) : (
   
         <LogistiqueGmsEquipe />
    
      )}
    </>
  )
}
