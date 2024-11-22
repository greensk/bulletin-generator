'use client'

import QuestionsList from './QuestionsList'
import GeneralForm from './GeneralForm'

import { Meeting } from '../types'

import { useState } from 'react'

type Step = 'general' | 'questions'

export default function Bulleting() {
  const [meeting, setMeeting] = useState<Meeting>({
    address: {
      city: '',
      street: '',
      house: ''
    },
    initiators: [],
    questions: {},
    meetingType: 'combined',
    public: {
      place: '',
      date: '',
      time: ''
    },
    distant: {
      startDatetime: '',
      endDatetime: '',
      reception: ''
    }  
  })
  const [currentStep, setCurrentStep] = useState<Step>('general')
  return (
    <div>
      { currentStep === 'general' ? <GeneralForm
        onNext={
          () => {
            setCurrentStep('questions')
          }
        }
        meeting={ meeting }
        setMeeting={ setMeeting }
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
