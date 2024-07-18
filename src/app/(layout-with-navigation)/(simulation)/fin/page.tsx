'use client'

import { useEffect } from 'react'

export default function FinPage() {

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.replace('/');
    }, 10000);

    return () => clearTimeout(timer);
  });
  return (
    <>
      <div className="relative flex items-center justify-center overflow-hidden p-4 ">
        <div className="relative mb-2 text-center md:mb-0">
          <h1 className="md:text-5xl">
            Merci pour vos réponses, vous allez être redirigé vers la plateforme OpinionWay
          </h1>
        </div>
      </div>
    </>
  )
}
