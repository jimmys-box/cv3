import { useState } from 'react';
import axios from 'axios';
import { useLocalStorage  } from '../functions/connexion';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userNiceName, setUserNiceName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('token', '');
  const [loggedIn, setLoggedIn] = useLocalStorage('token', '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useLocalStorage('token', '');


  const site = 'https://espacepro.jimmys-box.com/';

  const onFormSubmit = (event) => {
    event.preventDefault();

    const loginData = {
      username: username,
      password: password
    }

    setLoading(true);
    axios.post(`${site}/wp-json/jwt-auth/v1/token`, loginData)
      .then(res => {
        if (undefined === res.data.token) {
          setError(res.data.message);
          setLoading(false);
          return;
        }
        useLocalStorage.setItem('token', res.data.token);
        useLocalStorage.setItem('userName', res.data.user_nicename);

        setToken(res.data.token);
        setUserNiceName(res.data.user_nicename);
        setUserEmail(res.data.user_email);
        setUserRole(res.data.wp_user_level);
        setLoggedIn(true);
        return res.data.user_nicename;
      })
      .then(nom_login => {
        console.log('nom_login', nom_login);
        axios.get(`${site}/wp-json/capvert/collaborateur/fiche?nomlogin=${nom_login}`)
          .then(res => {
            useLocalStorage.setItem('userRole', res.data.droits_acces);
            useLocalStorage.setItem('userPseudo', res.data.prenom_collaborateur);
          })
      })
      .catch(error => {
        setError(error.response.data);
        setLoading(false);
      });
  }

  const handleOnChange = (event) => {
    if (event.target.name === 'username') {
      setUsername(event.target.value);
    } else if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
  }
console.log('user', username);
console.log('pass',token);
  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      <img style={{ width: 200 }} src="/logo.png" />
      <div className="loginContent">
        {isLoggedIn ? (
          <div>
            Bienvenue {user}, vous êtes déjà connecté(e)
          </div>
        ) : (
          <div>
            <form onSubmit={onFormSubmit}>
              <label className="form-group" />
              Nom d'utilisateur:
              <input
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={handleOnChange}
              />
              <br />
              <label className="form-group">
                Mot de passe:
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                />
                <br />
                <button className="btn btn-secondary mb-3" type="submit">Connexion</button>
              </label>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;