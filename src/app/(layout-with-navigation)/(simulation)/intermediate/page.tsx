'use client'

import { useRouter } from 'next/navigation'; // Importation de useRouter à partir de next/navigation
import { useSearchParams } from 'next/navigation'; // Si vous avez besoin de lire les paramètres de recherche

const IntermediatePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const from = searchParams?.get('from');
  const to = searchParams?.get('to');
  const next = searchParams?.get('next');

  const intermediateContent = {
    transport: {
      title: "Transition Transport",
      content: (
          <>
            <p>Vous allez maintenant répondre à des questions sur vos habitudes de transport.</p>
            <p>Assurez-vous de considérer tous les modes de transport que vous utilisez régulièrement.</p>
          </>
      ),
    },
    alimentation: {
      title: "Transition Alimentation",
      content: (
          <>
            <p>Nous allons maintenant aborder vos habitudes alimentaires.</p>
            <p>Réfléchissez à vos repas typiques et à vos choix alimentaires.</p>
          </>
      ),
    },
    logement: {
      title: "Transition Logement",
      content: (
          <>
            <p>Passons maintenant à des questions sur votre logement.</p>
            <p>Pensez à tous les aspects liés à la consommation d'énergie chez vous.</p>
          </>
      ),
    },
    // Ajoutez d'autres catégories si nécessaire
  };

  const content = intermediateContent['alimentation'];

  const handleContinue = () => {
    router.push(`/simulateur/bilan?question=${next}`);
  };

  if (!content) {
    return (
        <div>
          <h1>Transition</h1>
          <p>Préparez-vous pour la prochaine série de questions.</p>
          <button onClick={handleContinue}>Continuer</button>
        </div>
    );
  }

  return (
      <div>
        <h1>{content.title}</h1>
        {content.content}
        <button onClick={handleContinue}>Continuer</button>
      </div>
  );
};

export default IntermediatePage;
