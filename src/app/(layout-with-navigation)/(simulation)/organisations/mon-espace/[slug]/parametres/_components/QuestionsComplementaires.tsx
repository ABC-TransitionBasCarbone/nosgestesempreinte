import { useUpdateOrganization } from '@/app/(layout-with-navigation)/(simulation)/organisations/_hooks/useUpdateOrganization'
import Trans from '@/components/translation/Trans'
import { useUser } from '@/publicodes-state'
import { Organization } from '@/types/organizations'
import ToggleField from './questionsComplementaires/ToggleField'

type Props = {
  organization: Organization
  refetchOrganization: () => void
}

export default function QuestionsComplementaires({
  organization,
  refetchOrganization,
}: Props) {
  const { user } = useUser()

  const poll = organization.polls[0]

  const { mutateAsync: updateOrganization } = useUpdateOrganization({
    email: user?.email,
  })

  const handleChange = async ({
    questionKey,
    value,
  }: {
    questionKey: string
    value: boolean
  }) => {
    const defaultAdditionalQuestions = poll?.defaultAdditionalQuestions ?? {}

    if (value && !defaultAdditionalQuestions.includes(questionKey)) {
      defaultAdditionalQuestions.push(questionKey)
    } else if (!value && defaultAdditionalQuestions.includes(questionKey)) {
      defaultAdditionalQuestions.splice(
        defaultAdditionalQuestions.indexOf(questionKey),
        1
      )
    }

    await updateOrganization({
      defaultAdditionalQuestions,
    })

    refetchOrganization()
  }

  return (
    <section className="mb-12 mt-8">
      <h2>
        <Trans>Question complémentaires</Trans>
      </h2>
      <p className="mb-8">
        <Trans>
          Vous avez la possibilité d’ajouter des questions complémentaires au
          test pour vos statistiques
        </Trans>
      </p>

      <div className="mb-4 rounded-md border border-grey-200">
        <ToggleField
          name="villeToggle"
          value={poll.defaultAdditionalQuestions.includes('postalCode')}
          onChange={(isEnabled: boolean) => {
            handleChange({ questionKey: 'postalCode', value: isEnabled })
          }}
          label={<Trans>Dans quelle ville habitez-vous ?</Trans>}
        />
      </div>

      <div className="rounded-md border border-grey-200">
        <ToggleField
          name="birthDateToggle"
          value={poll.defaultAdditionalQuestions.includes('birthDate')}
          onChange={(isEnabled: boolean) => {
            handleChange({ questionKey: 'birthDate', value: isEnabled })
          }}
          label={<Trans>Quelle est votre année de naissance ?</Trans>}
        />
      </div>
    </section>
  )
}
