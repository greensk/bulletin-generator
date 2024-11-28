import Bulletin from '@/components/Bulletin'
import { getMeeting, updateMeeting } from '@/actions'
import { Meeting } from '@/types'

type TheParams = {
  id: string
}

export default async function Page({ params }: { params: TheParams }) {
  const meeting = await getMeeting(params.id)
  const setMeeting = async (content: Meeting) => {
    'use server'
    updateMeeting(params.id, content)
  }
  return (<Bulletin
    meeting={ meeting }
    setMeeting={ setMeeting }
  ></Bulletin>)  
}
