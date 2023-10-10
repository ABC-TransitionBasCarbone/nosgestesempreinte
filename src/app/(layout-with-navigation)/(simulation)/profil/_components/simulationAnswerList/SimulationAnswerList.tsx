'use client'

import { useState } from 'react'

import Trans from '@/components/translation/Trans'
import CheckboxInputGroup from '@/design-system/inputs/CheckboxInputGroup'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useForm } from '@/publicodes-state'
import RuleNode from './_components/RuleNode'
import { AllOpenProvider } from './_contexts/AllOpenContext'

export default function SimulationAnswerList() {
  const [isAllOpen, setIsAllOpen] = useState(false)

  const { t } = useClientTranslation()

  const { progression, categories, relevantAnsweredQuestions } = useForm()

  if (!progression) return null

  return (
    <AllOpenProvider value={isAllOpen}>
      <div className="mb-4 mt-6 flex items-center justify-between gap-2 md:w-[35rem]">
        <h3 className="mb-0">
          <span role="img" aria-label="emoji notepad" className="mr-4">
            📋
          </span>
          <Trans>Mes réponses</Trans>
        </h3>

        <div className="flex items-center">
          <CheckboxInputGroup
            name="unfoldAnswerList"
            label={isAllOpen ? t('Tout replier') : t('Tout déplier')}
            value={isAllOpen}
            onChange={() => setIsAllOpen(!isAllOpen)}
          />
        </div>
      </div>

      <div className="w-full">
        {categories?.map((category: string) => {
          const categoryQuestions = relevantAnsweredQuestions.filter(
            (question: string) => question.includes(category)
          )

          if (!categoryQuestions.length) return null

          return (
            <RuleNode
              key={category}
              ruleDottedName={category}
              rules={categoryQuestions}
              level={1}
            />
          )
        })}
      </div>
    </AllOpenProvider>
  )
}
