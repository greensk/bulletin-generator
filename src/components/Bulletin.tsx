'use client'

import QuestionsList from './QuestionsList'
import GeneralForm from './GeneralForm'

import { useState } from 'react'

type Step = 'general' | 'questions'

export default function Bulleting() {
  const [currentStep, setCurrentStep] = useState<Step>('general')
  return (
    <div>
      { currentStep === 'general' ? <GeneralForm
        onNext={
          () => {
            setCurrentStep('questions')
          }
        }
      /> : <></> }
      { currentStep === 'questions' ?  <QuestionsList
        onBack={
          () => {
            setCurrentStep('general')
          }
        }
      /> : <></> }
    </div>
  )
}
