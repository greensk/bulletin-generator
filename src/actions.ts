'use server'

import db from '@/db'
import { Meeting } from '@/types'
import { genRandomString } from '@/utils'

export const createBulletin = async (): Promise<string> => {
  const meeting = db().use<Meeting>('meeting')
  const id = genRandomString(20)

  const theNewMeeting: Meeting = {
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
  }

  const response = await meeting.insert(theNewMeeting, id)
  console.log(response)
  return id
}

