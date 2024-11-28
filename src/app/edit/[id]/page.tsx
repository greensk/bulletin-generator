import Bulletin from '@/components/Bulletin'
import { getMeeting, updateMeeting } from '@/actions'
import { Meeting } from '@/types'

type TheParams = {
  id: string
}

export default async function Page({ params }: { params: Promise<TheParams> }) {
  const id = (await params).id
  const meeting = await getMeeting(id)
  const setMeeting = async (content: Meeting) => {
    'use server'
    updateMeeting(id, content)
  }
  return (<Bulletin
    meeting={ meeting }
    setMeeting={ setMeeting }
  ></Bulletin>)  
}
