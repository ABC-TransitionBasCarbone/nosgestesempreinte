'use client'

import { TransitionPageKey, transitions } from "@/constants/transitions";
import { useMemo } from "react";

interface TransitionPageProps {
  transitionPage: string;
}
const TransitionPage = ({ transitionPage }: TransitionPageProps) => {
  const content = useMemo(() => {
    if (Object.keys(transitions).includes(transitionPage)) return transitions[transitionPage as TransitionPageKey];

    return {
      title: "Nouvelle section",
      content: "Vous allez répondre à de nouvelles questions"
    };
  }, [transitionPage])

  return (
      <div>
        <h1>{content.title}</h1>
        <p>{content.content}</p>
      </div>
  );
};

export default TransitionPage;
