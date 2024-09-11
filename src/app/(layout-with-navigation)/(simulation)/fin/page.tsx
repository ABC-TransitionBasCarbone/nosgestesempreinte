'use client'

import {useEffect, useState} from 'react'

export default function FinPage() {
  const [_data, setData] = useState(null);

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
        })
        .catch((error) => {
          console.error('Erreur lors de l\'envoi de la requête:', error);
        });
    const timer = setTimeout(() => {
      window.location.replace('/');
    }, 10000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div className="relative flex items-center justify-center overflow-hidden p-4 h-[100vh]">
        <div className="relative mb-2 text-center md:mb-0">
          <h1 className="md:text-5xl">
            Merci pour vos réponses, vous allez être redirigé vers la plateforme OpinionWay
          </h1>
        </div>
      </div>
    </>
  )
}
