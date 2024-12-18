export type TransitionPageKey = "transport" | "alimentation" | "logement" | "divers"
export const transitions = {
    transport : {
        title: "Transport",
        content: "Commençons avec des questions sur vos déplacements quotidiens comme ponctuels. Comme expliqué certaines questions portent directement sur l’année 2023 tandis que d’autres interrogent vos déplacements moyens actuels",
        buttonText: "Questionnaire transport"
    },
    alimentation : {
        title: "Alimentation",
        content: "Nous allons maintenant aborder votre alimentation avec des questions sur vos habitudes et pratiques alimentaires hebdomadaires et quotidiennes",
        buttonText: "Questionnaire alimentation"
    },
    logement: {
        title: "Logement(s)",
        content: "Nous allons maintenant nous intéresser à vo(s) logement(s). Nous commencerons par des questions sur les caractéristiques de votre logement principal et sur le type d’énergie utilisée par ce dernier avant de questionner ensuite vos hébergements de vacances ou encore d’éventuels investissements locatifs.",
        buttonText: "Questionnaire logement(s)"
    },
    divers: {
        title: "Achats et équipements",
        content: "Avant-dernier chapitre de notre questionnaire : vos animaux, vos équipements, vos achats et d’autres questions portant sur votre mode de vie.",
        buttonText: "Questionnaire achats et équipements"
    },
    "services sociétaux": {
        title: "Informations génériques",
        content: "Passons enfin à des informations plus générales. Pour chacune des affirmations qui vont vous être proposées, veuillez indiquer si vous êtes personnellement tout à fait d'accord, plutôt d'accord, plutôt pas d'accord, pas du tout d'accord ou si vous ne savez pas.",
        buttonText: "Questionnaire informations génériques"
    }
}