import { useState, useEffect } from 'react';
import WPAPI from 'wpapi';
import axios from 'axios';
import { useLocalStorage } from '../functions/connexion';
import { useRouter } from 'next/router';

const wp = new WPAPI({ endpoint: 'https://espacepro.jimmys-box.com//wp-json' });

function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useLocalStorage('userPseudo', '');
  const [, setRole] = useLocalStorage('userRole', '');
  const [, setEquipe] = useLocalStorage('userEquipe', '');
  const [, setBranche] = useLocalStorage('userBranche', '');
  const [loggedIn, setLoggedIn] = useLocalStorage('logged', false);

  const router = useRouter();
  const site = 'https://espacepro.jimmys-box.com/';

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await wp.auth({
        username,
        password,
      });
      axios.get(`${site}/wp-json/capvert/collaborateur/fiche?nomlogin=${username}`)
        .then(res => {
          setUser(res.data.prenom_collaborateur);
          setRole(res.data.droits_acces);
          setEquipe(res.data.id_equipe);
          setBranche(res.data.branche);
          setLoggedIn(true);

        })
        .then(() => location.reload() )

    } catch (error) {
      console.log(error);
      // handle login error
    }

  };
  useEffect(() => {
    if (loggedIn) {
      router.push('/');
    }
  }, [loggedIn, router]);

  console.log('nssom', loggedIn)

  return (
    <div className="loginContent">
      <form onSubmit={handleLogin}>
        <label className="form-group" style={{ color: 'white', textAlign: 'left' }}>
          Nom d'utilisateur:</label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <br />
        <label className="form-group" style={{ color: 'white', textAlign: 'left' }}>
          Mot de passe:
        </label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <br />
        <button type="submit">Connexion</button>
      </form>
    </div>
  );
}

export default Login;