'use client'

import Questions from './Bulletin/Questions'
import General from './Bulletin/General'
import Initiator from './Bulletin/Initiator'

import debounce from 'debounce'

import { Meeting } from '../types'

import { useState, SetStateAction, useCallback } from 'react'

type Step = 'general' | 'initiator' | 'questions'

type TheProps = {
  meeting: Meeting
  setMeeting: (content: Meeting) => void
}

function Bulletin(props: TheProps) {
  const [currentStep, setCurrentStep] = useState<Step>('general')
  const [meeting, setMeeting] = useState<Meeting>(props.meeting)

  const debouncedUpdate = useCallback(
    debounce((meeting: Meeting) => {
      props.setMeeting(meeting)
    }, 1000),
    []
  )

  const updateMeeting = (content: SetStateAction<Meeting>) => {
    setMeeting(content)
    debouncedUpdate(meeting)
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