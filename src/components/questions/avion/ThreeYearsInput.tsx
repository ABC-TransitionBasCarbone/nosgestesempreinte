import Label from '@/components/form/question/Label'
import NumberInput from '@/components/form/question/NumberInput'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { useRule } from '@/publicodes-state'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'

type Props = {
  question: string
}

export default function ThreeYearsInput({ question }: Props) {
  const { t } = useClientTranslation()

  const locale = useLocale()

  const { unit, setValue } = useRule(question)

  const [currentYearValue, setCurrentYearValue] = useState(0)
  const [lastYearValue, setLastYearValue] = useState(0)
  const [yearBeforeLastValue, setYearBeforeLastValue] = useState(0)

  const currentYear = new Date().getFullYear()

  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const years = JSON.parse(localStorage.getItem(question) || '[0, 0, 0]')
    console.log(years[0])
    setCurrentYearValue(years[0])
    setLastYearValue(years[1])
    setYearBeforeLastValue(years[2])
    setIsInitialized(true)
  }, [question])

  useEffect(() => {
    if (isInitialized) {
      console.log('currentYearValue', currentYearValue)
      localStorage.setItem(
        question,
        JSON.stringify([currentYearValue, lastYearValue, yearBeforeLastValue])
      )
    }
  }, [
    currentYearValue,
    lastYearValue,
    yearBeforeLastValue,
    question,
    isInitialized,
  ])

  const totalValue = useMemo(
    () => (currentYearValue + lastYearValue + yearBeforeLastValue) / 3,
    [currentYearValue, lastYearValue, yearBeforeLastValue]
  )

  const prevTotalValue = useRef(totalValue)
  useEffect(() => {
    if (totalValue !== prevTotalValue.current) {
      setValue(totalValue)
    }
    prevTotalValue.current = totalValue
  }, [totalValue, setValue])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="mb-2 rounded-lg bg-white p-4">
      <Label question={question} size="sm" label={String(currentYear)} />
      <NumberInput
        unit={unit}
        value={currentYearValue}
        setValue={(value: number) => setCurrentYearValue(value)}
        isMissing={currentYearValue ? false : true}
        size="sm"
        className="mb-2 justify-start"
      />
      <Label
        question={question}
        size="sm"
        label={String(Number(currentYear) - 1)}
      />
      <NumberInput
        unit={unit}
        value={lastYearValue}
        setValue={(value: number) => setLastYearValue(value)}
        isMissing={lastYearValue ? false : true}
        size="sm"
        className="mb-2 justify-start"
      />
      <Label
        question={question}
        size="sm"
        label={String(Number(currentYear) - 2)}
      />
      <NumberInput
        unit={unit}
        value={yearBeforeLastValue}
        setValue={(value: number) => setYearBeforeLastValue(value)}
        isMissing={yearBeforeLastValue ? false : true}
        size="sm"
        className="mb-2 justify-start"
      />
      <p className="mb-0 rounded-lg bg-primaryLight p-4 font-bold">
        {t('Total :')}{' '}
        {(
          currentYearValue +
          lastYearValue +
          yearBeforeLastValue
        ).toLocaleString(locale, {
          maximumFractionDigits: 1,
        })}
        &nbsp;
        {unit}
        <br />
        {t('Total par an\u202f:')}{' '}
        {totalValue.toLocaleString(locale, { maximumFractionDigits: 1 })}
        &nbsp;
        {unit}
      </p>
    </motion.div>
  )
}
