'use client'

import Button from '@/design-system/inputs/Button';
import {useState} from 'react'

export default function FinPage() {
  const [_data] = useState(null);
  const [canEndSurvey] = useState<boolean>(false);

  const goToOpinionWay = () => {
    if (!canEndSurvey) return;
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
