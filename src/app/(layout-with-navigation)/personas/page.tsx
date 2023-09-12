import TransServer from '@/components/translation/TransServer'
import Title from '@/design-system/layout/Title'
import { currentLocale } from 'next-i18n-router'
import Persona from './personas/Persona'

export default async function Personas() {
  const lang = currentLocale()

  // TODO: endpoint should not be static (and should point to local if available)
  const personas = await fetch(
    `https://data.nosgestesclimat.fr/personas-${lang}.json`
  ).then((res) => res.json())

  return (
    <>
      <Title title={<TransServer>Personas</TransServer>} />
      <p>
        <TransServer>
          Les personas nous servent à tester le simulateur sous toutes ses
          coutures, et à vérifier qu’il s’adapte bien à toutes les situations de
          vie des citoyens métropolitains. De par leur présence, ils nous
          forcent à penser à tous les cas d’usage, pour nous projeter dans
          différentes réalités, et inclure ces réalités dans nos refontes du
          parcours de test et des actions proposées à la fin de ce dernier.
        </TransServer>
      </p>
      <p>
        <TransServer>
          Cette page vous permet de naviguer dans les parcours Nos Gestes Climat
          comme si vous étiez l'un des profils types que nous avons listés.
        </TransServer>
      </p>
      <div className="grid grid-cols-4 gap-4">
        {Object.keys(personas).map((key) => (
          <Persona
            key={key}
            dottedName={key}
            persona={personas[key as keyof typeof personas]}
          />
        ))}
      </div>
    </>
  )
}