'use client'

import Questions from './Bulletin/Questions'
import General from './Bulletin/General'
import Initiator from './Bulletin/Initiator'

import { Meeting } from '../types'

import { useState } from 'react'
import { genRandomString } from '@/utils'

type Step = 'general' | 'initiator' | 'questions'

export default function Bulletin(id: string) {
  const [meeting, setMeeting] = useState<Meeting>({
    address: {
      city: '',
      street: '',
      house: ''
    },
    initiatorType: 'owners',
    initiatorOrganization: {
      name: ''
    },
    initiatorOwners: [
      {
        fullName: '',
        flat: ''
      }
    ],
    questions: [
      {
        text: '',
        id: genRandomString()
      },
      {
        text: '',
        id: genRandomString()
      },
      {
        text: '',
        id: genRandomString()
      }
    ],
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
            setCurrentStep('initiator')
          }
        }
        meeting={ meeting }
        setMeeting={ setMeeting }
      /> : <></> }
      { currentStep === 'initiator' ? <Initiator
        onBack={
          () => {
            setCurrentStep('general')
          }
        }
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
            setCurrentStep('initiator')
          }
        }
        meeting={ meeting }
        setMeeting={ setMeeting }
      /> : <></> }
    </div>
  )
}
