'use client'

import Questions from './Bulletin/Questions'
import General from './Bulletin/General'

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
      endDate: '',
      endTime: '',
      reception: ''
    }  
  })
  const [currentStep, setCurrentStep] = useState<Step>('general')
  return (
    <div>
      { currentStep === 'general' ? <General
        onNext={
          () => {
            setCurrentStep('questions')
          }
        }
        meeting={ meeting }
        setMeeting={ setMeeting }
      /> : <></> }
      { currentStep === 'questions' ?  <Questions
        onBack={
          () => {
            setCurrentStep('general')
          }
        }
      /> : <></> }
    </div>
  )
}
