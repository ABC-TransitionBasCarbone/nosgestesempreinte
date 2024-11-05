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
                      <div style={{ margin: "8px", fontSize: "20px", fontWeight: "bold" }}>Bonjour !</div>
                      <div style={{ marginLeft: "8px" }}>Vous allez à présent répondre à diverses questions afférentes à vos déplacements, modes d’alimentation etc.</div>
                      <div style={{ marginLeft: "8px" }}>Vous pouvez répondre à l’enquête en une seule fois ou bien en plusieurs. Une barre d’avancement au-dessus des questions vous affichera le taux de complétion du questionnaire.</div>
                      <div style={{ marginLeft: "8px", marginTop: "8px" }}><span style={{ textDecoration: "underline" }}>Deux choses à savoir !</span>  L'enquête : </div>
                      <ul style={{ marginLeft: "8px", listStyle: "disc", listStylePosition: "inside" }}>
                        <li>
                          <span style={{ fontWeight: "bold" }}>Porte sur l’année 2023.</span> Ainsi, certaines questions mentionnent directement cette période temporelle dans leur formulation.
                          Toutefois, pour certaines pratiques et modes de vie, il est complexe de se replonger en arrière. C’est pourquoi, nous raisonnons parfois sur un comportement moyen actuel via des questions formulées selon une temporalité journalière ou hebdomadaire.
                        </li>
                        <li>
                          <span style={{ fontWeight: "bold" }}>S’intéresse à vos actes de consommation personnelle.</span> . C’est-à-dire que tout ce qui est en lien avec votre activité professionnelle (comme des déplacements professionnels, de l’achat de matériel, etc.) n’est pas à prendre en compte ici. Une seule exception toutefois : vos déplacements domicile-travail que l’on questionnera.
                        </li>
                      </ul>
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
