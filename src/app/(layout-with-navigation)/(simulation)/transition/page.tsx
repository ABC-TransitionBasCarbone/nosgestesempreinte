'use client'

import { useMemo } from "react";

interface TransitionPageProps {
  transitionPage: string;
}
const TransitionPage = ({ transitionPage }: TransitionPageProps) => {
  const content = useMemo(() => {
    switch(transitionPage) {
      case 'transport':
        return {
          title: "Transition Transport",
          content: (
              <>
                <p>Vous allez maintenant répondre à des questions sur vos habitudes de transport.</p>
                <p>Assurez-vous de considérer tous les modes de transport que vous utilisez régulièrement.</p>
              </>
          ),    
        }
      case 'alimentation':
        return {
          title: "Transition Alimentation",
          content: (
              <>
                <p>Nous allons maintenant aborder vos habitudes alimentaires.</p>
                <p>Réfléchissez à vos repas typiques et à vos choix alimentaires.</p>
              </>
          ), 
        }
      case 'logement':
        return {
          title: "Transition Logement",
          content: (
              <>
                <p>Passons maintenant à des questions sur votre logement.</p>
                <p>Pensez à tous les aspects liés à la consommation d'énergie chez vous.</p>
              </>
          ),
        }
      default:
        return {
          title: "Transition",
          content: (
            <>
              <p>Préparez-vous pour la prochaine série de questions.</p>
            </>
          ),

        }
    }
  }, [transitionPage]);
  
  return (
      <div>
        <h1>{content.title}</h1>
        {content.content}
      </div>
  );
};

export default TransitionPage;
