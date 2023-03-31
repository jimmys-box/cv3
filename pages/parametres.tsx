import React, { useRef, useState, useEffect } from 'react'
import { useLocalStorage } from '../functions/connexion';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import axios from 'axios';
interface IUploadResponse {
  filename: string;
  success: boolean;
  message: string;
}

const Parametres: React.FC = () => {
  const role = useLocalStorage('userRole');

  const [gmsSum, setGmsSum] = useLocalStorage('gmsSum', 1700);

  const [nomMagasin, setNomMagasin] = useState<string>('');

  const [image, setImage] = useState<string>('/logo-franchise-placeholder.png');

  const [solaireSurface, setSolaireSurface] = useLocalStorage('surfaceLimit', 7000);
  const [nomClient, setNomClient] = useState<string>('');

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filename, setFilename] = useState<string>('');
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const changeGmsSum = () => {
    setGmsSum(gmsSum);
  }

  const changeSolaireSurface = () => {
    setSolaireSurface(solaireSurface);
  }

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files![0]);
    setFilename(event.target.files![0].name);
  };

  const handleFileUpload = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      return;
    }

    setUploadStatus("Chargement, veuillez patienter...");

    const formData = new FormData();
    formData.append("file", selectedFile);

    fetch("http://jimmyslab.club:4445/ajouter-photo", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUploadStatus('fichier téléchargé, vous pouvez visualiser le rapport');
        setImage(data.data.url);
        console.log(image)
      })

      .catch((error) => {
        console.error(error);
        setUploadStatus(`Error uploading ${filename}.`);
      });
  }

  const handleCreateMagasin = () => {
    let headers: any = { "Content-Type": "application/json" };
        let url = `https://espacepro.jimmys-box.com/wp-json/capvert/franchise/ajouter?nomfranchise=${nomMagasin}&urllogofranchise=${image}`;

        // Appel API en requête GET
        axios.get(url, headers)
            .then(response => {
                alert('Franchise créé');
                window.location.reload();
          
            })
            .catch(err => {
                console.error(err);
            });
  }
  console.log(image)
  return (
    <div>
      {role[0] === 'administrator' ? (
        <div className="customContent">
          <Tabs>
            <TabList className="tabsGestionClients">
              <Tab>GMS</Tab>
              <Tab>SOLAIRE</Tab>
            </TabList>
            <TabPanel className="">
              <div style={{ marginBottom: 20 }}>
                <h4>CA hebdomadaire minimum</h4>
                <input type="number" value={gmsSum} onChange={(e) => { setGmsSum(Number(e.target.value)) }} />
                <button onClick={changeGmsSum}>Modifier</button>
              </div>
              <div>
                <h4>Créer une franchise</h4>
                <input type="text" placeholder="Nom de la franchise" value={nomMagasin} onChange={(e) => { setNomMagasin(e.target.value) }} />
                <form className="" onSubmit={handleFileUpload}>
               
                  <input
                    id="file-input"
                    type="file"
                    onChange={handleFileInputChange}
                  />
                  <img src={image} width="100" height="100" />
                  <button type="submit" >Soumettre le logo</button>

                </form>
                
                <button onClick={handleCreateMagasin}>Créer la franchise</button>
              </div>
            </TabPanel>
            <TabPanel className="">
              <div>
                <h4>Surface de nettoyage hebdomadaire minimum pour le solaire</h4>
                <input type="number" value={solaireSurface} onChange={(e) => { setSolaireSurface(Number(e.target.value)) }} />
                <button onClick={changeSolaireSurface}>Modifier</button>
              </div>
              <div>
                <h4>Créer un nom de client</h4>
                <input type="text" placeholder="Nom Client" value={nomClient} onChange={(e) => { setNomClient(e.target.value) }} />
                <button onClick={changeGmsSum}>Créer</button>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      ) : (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2>Vous n'avez pas les droits pour accéder à cette page</h2>
        </div>
      )}
    </div>
  );
}

export default Parametres;