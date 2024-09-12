'use client';

import Main from '@/design-system/layout/Main'
import Buttons from "@/app/_components/heading/Buttons";
import {useEffect, useState} from 'react';
import { useCurrentSimulation } from '@/publicodes-state';

export default function Homepage() {
  const { progression } = useCurrentSimulation()

  const [opinionWayId, setOpinionWayId] = useState<string | null>(null);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const opinionWayId = urlParams.get('opinion-way-id');
    setOpinionWayId(opinionWayId);

    const storedData = localStorage.getItem('nosgestesempreinte::v1');
    if (storedData && opinionWayId) {
      const parsedData = JSON.parse(storedData);
      const opinionWayIdExists = parsedData.simulations.some(simulation => simulation.opinionWayId === opinionWayId);
      if (!opinionWayIdExists) {
        localStorage.clear();
      }
    }
  }, []);
  return (
    <>
      <Main>
        <div className="relative flex items-center justify-center overflow-hidden p-4 h-[100vh]">
          <div className="relative mb-2 text-center md:mb-0">
            <h1 className="md:text-5xl">
              {
                progression < 1
                  ? 'Bonjour, vous allez répondre à des questions sur votre empreinte carbone'
                  : 'Bonjour, vous avez déjà répondu à l\'enquête, merci'
              }
            </h1>
            {opinionWayId && progression != 1 && <Buttons/>}
          </div>
        </div>
      </Main>
    </>
  )
}