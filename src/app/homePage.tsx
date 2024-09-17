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
      const opinionWayIdExists = parsedData.simulations.some((simulation: { opinionWayId: string; }) => simulation.opinionWayId === opinionWayId);
      if (!opinionWayIdExists) {
        localStorage.clear();
      }
    }
  }, []);
  return (
    <>
      <Main>
        <div className="relative flex items-center justify-center overflow-hidden p-4 h-[100vh]">
          <div className="relative mb-2 md:mb-0">
            <div style={{ margin: "40px" }}>
              {
                progression < 1
                  ? <>
                      <div style={{ margin: "8px", fontSize: "20px", fontStyle: "bold" }}>Bonjour !</div>
                      <div style={{ margin: "8px" }}>Vous allez maintenant répondre à une série de questions portant sur votre mode de vies et sur vos actes de consommation. Déplacements, alimentation, logement, achats et équipements, nous allons passer de nombreuses choses en revue.</div>
                      <div style={{ margin: "8px" }}>Vous pouvez répondre à l’enquête en une seule fois ou bien en plusieurs. Une barre d’avancement au-dessus des questions vous affichera le taux de complétion du questionnaire.</div>
                      <div style={{ margin: "8px" }}><span style={{ textDecoration: "underline" }}>A savoir</span> : l’enquête s’intéresse à vos actes de consommation sur l’année 2023. Ainsi, certaines questions mentionnent directement cette période temporelle dans leur formulation. Toutefois, pour certaines pratiques et modes de vie, il est complexe de se replonger en arrière. C’est pourquoi, nous raisonnons parfois sur un comportement moyen actuel via des questions formulées selon une temporalité journalière ou hebdomadaire.</div>
                  </>
                  : 'Bonjour, vous avez déjà répondu à l\'enquête, merci'
              }
            </div>
            <div className="text-center">{opinionWayId && progression != 1 && <Buttons/>}</div>
          </div>
        </div>
      </Main>
    </>
  )
}
