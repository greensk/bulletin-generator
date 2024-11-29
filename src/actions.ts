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

export const getMeeting = async (id: string): Promise<Meeting> => {
  const meeting = db().use<Meeting>('meeting')
  console.log(`ID: ${id}`)
  return await meeting.get(id)
}

export const updateMeeting = async (id: string, meetingData: Meeting): Promise<void> => {
  const meeting = db().use<Meeting>('meeting')
  const { _rev } = await meeting.get(id)
  await meeting.insert({ ...meetingData, _rev }, id)
}

export const attachFile = async (meetingId: string, fileName: string, fileContentType: string, fileContent: ArrayBuffer): Promise<void> => {
  const meeting = db().use<Meeting>('meeting')
  const { _rev } = await meeting.get(meetingId)
  await meeting.attachment.insert(meetingId, fileName, fileContent, fileContentType, { rev: _rev })
}