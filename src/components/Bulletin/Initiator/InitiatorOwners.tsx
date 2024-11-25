'use client'

import {
  Dispatch,
  SetStateAction
} from 'react'
import {
  Fab
} from 'konsta/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Meeting } from '@/types'
import OwnerItem from './InitiatorPersionsItem'

type QuestionsListProps = {
  meeting: Meeting
  setMeeting: Dispatch<SetStateAction<Meeting>>
}

export default function QuestionsList(props: QuestionsListProps) {
  const setOwnerName = (index: number, name: string) => {
    props.setMeeting((meeting) => {
      return Object.assign(
        {},
        meeting,
        {
          initatorPersions: meeting.initiatorOwners.map((q, i) => {
            if (i === index) {
              return {
                ...q,
                name
              }
            } else {
              return q
            }
          })
        }
      )
    })
  }
  const removeOwner = (indexToRemove: number) => {
    props.setMeeting((meeting) => {
      return Object.assign(
        {},
        meeting,
        {
          initiatorOwners: meeting.initiatorOwners.filter((_, index) => index !== indexToRemove)
        }
      )
    })
  }
  const addOwner = (name = '', flat = '') => {
    props.setMeeting((meeting: Meeting) => {
      return Object.assign(
        {},
        meeting,
        {
          initiatorOwners: [
            ...meeting.initiatorOwners,
            {
              name,
              flat
            }
          ]
        }
      )
    })
  }
  return <div
    className="relative pb-12 sm:w-192 mx-auto"
  >
    {
      props.meeting.initiatorOwners.map((owner, ownerIndex) => {
        return <OwnerItem
          key={ ownerIndex }
          fullName={ owner.fullName }
          flat={ owner.flat }
          setFullName={ (fullName: string) => setOwnerName(ownerIndex, fullName) }
          setFlat={ (flat: string) => setOwnerName(ownerIndex, flat) }
          onDelete={ () => removeOwner(ownerIndex) }
        />
      })
    }
    <Fab
      className="absolute left-1/2 bottom-4-safe transform -translate-x-1/2 z-20"
      icon={<FontAwesomeIcon icon={faPlus} className="relative -top-1" />}
      text="Добавить инициатора"
      textPosition="after"
      touchRipple={ true }
      onClick={() => {
        addOwner()
      }}
    />
  </div>
}
