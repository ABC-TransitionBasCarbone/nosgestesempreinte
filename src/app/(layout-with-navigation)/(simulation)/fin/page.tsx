'use client'

import Button from '@/design-system/inputs/Button';
import {useEffect, useState} from 'react'

export default function FinPage() {
  const [_data, setData] = useState(null);
  const [canEndSurvey, setCanEndSurvey] = useState<boolean>(false);

  useEffect(() => {
    const localStorageValue = localStorage.getItem('nosgestesempreinte::v1')
    let value = null
    if (localStorageValue) {
      const JSONValue = JSON.parse(localStorageValue)
      //TODO: Pour l'instant on prend la dernière mais à voir pour la suite
      JSONValue.simulation = JSONValue.simulations.at(-1)
      delete JSONValue.simulations
      value = JSON.stringify(JSONValue)
    }

    fetch('/api/add-row', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: value }),
    })
        .then((res) => res.json())
        .then((data) => {
          console.log('Réponse du serveur:', data);
          setData(data.message);
          setCanEndSurvey(true);
        })
        .catch((error) => {
          console.error('Erreur lors de l\'envoi de la requête:', error);
        });
  }, []);

  const goToOpinionWay = () => {
    if (!canEndSurvey) return;

    window.location.replace('/');
  }

  return (
    <>
      <div className="relative flex items-center justify-center overflow-hidden p-4 h-[100vh]">
        <div className="relative mb-2 text-center md:mb-0">
          <div style={{ fontSize: "20px", fontStyle: "bold", margin: "40px" }}>
            Merci d’avoir répondu à notre questionnaire. Cliquez sur le bouton « Fin » pour retourner sur le site Opinion Way et ainsi valider votre participation à notre enquête.
          </div>
          <Button size="md" color="primary" onClick={goToOpinionWay}>FIN</Button>
        </div>
      </div>
    </>
  )
}
