export type TransitionPageKey = "transport" | "alimentation" | "logement" | "divers"
export const transitions = {
    transport : {
        title: "Transport",
        content: "Commençons avec des questions sur vos déplacements quotidiens comme ponctuels. Comme expliqué certaines questions portent directement sur l’année 2023 tandis que d’autres interroge vos déplacements moyens actuels",
        buttonText: "Questionnaire déplacements"
    },
    alimentation : {
        title: "Alimentation",
        content: "Nous allons maintenant aborder votre alimentation avec des questions sur vos habitudes et pratiques alimentaires hebdomadaire et quotidienne",
        buttonText: "Questionnaire alimentation"
    },
    logement: {
        title: "Logement",
        content: "Nous allons maintenant nous intéresser à vo(s) logement(s). Nous commencerons par des questions sur les caractéristiques de votre logement principal et sur le type d’énergie utilisée par ce dernier avant de questionner ensuite vos hébergements de vacances ou encore d’éventuels investissements locatifs.",
        buttonText: "Questionnaire logement(s)"
    },
    divers: {
        title: "Divers",
        content: "Dernier chapitre de notre questionnaire : vos équipements, vos achats et d’autres questions portant sur votre de vie",
        buttonText: "Questionnaire achats et équipements"
    }
}