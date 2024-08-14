'use client'

import {useEffect, useState} from 'react'

export default function FinPage() {
  const [setData] = useState(null)

  useEffect(() => {
    const value = localStorage.getItem('nosgestesempreinte::v1')
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
