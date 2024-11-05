'use client'

import Button from '@/design-system/inputs/Button';

export default function FinPage() {
  const goToOpinionWay = () => {
    const storedData = JSON.parse(localStorage.getItem('nosgestesempreinte::v1') ?? "");

    window.location.href = `https://ow3.cawi.fr/cgi-bin/xcawi2/Q/bj27428/bj27428.pl?login=${storedData.simulations[0].opinionWayId}`;
    return;
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
