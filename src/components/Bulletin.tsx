'use client'

import Questions from './Bulletin/Questions'
import General from './Bulletin/General'
import Initiator from './Bulletin/Initiator'

import { Meeting } from '../types'

import { useState, SetStateAction } from 'react'

type Step = 'general' | 'initiator' | 'questions'

type TheProps = {
  meeting: Meeting
  setMeeting: (content: Meeting) => void
}

function Bulletin(props: TheProps) {
  const [currentStep, setCurrentStep] = useState<Step>('general')
  const [meeting, setMeeting] = useState<Meeting>(props.meeting)
  const updateMeeting = (content: SetStateAction<Meeting>) => {
    setMeeting(content)
    props.setMeeting(meeting)
  }
  return (
    <div>
      { currentStep === 'general' ? <General
        onNext={
          () => {
            setCurrentStep('initiator')
          }
        }
        meeting={ meeting }
        setMeeting={ updateMeeting }
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
        setMeeting={ updateMeeting }
      /> : <></> }
      { currentStep === 'questions' ?  <Questions
        onBack={
          () => {
            setCurrentStep('initiator')
          }
        }
        meeting={ meeting }
        setMeeting={ updateMeeting }
      /> : <></> }
    </div>
  )
}
export default Bulletin