import Bulletin from '@/components/Bulletin'
import { getMeeting, updateMeeting, attachFile } from '@/actions'
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
  const onAttachFile = async (fileName: string, fileContentType: string, fileContent: ArrayBuffer): Promise<void> => {
    'use server'
    return await attachFile(id, fileName, fileContentType, fileContent)
  }
  return (<Bulletin
    meeting={ meeting }
    setMeeting={ setMeeting }
    attachFile={ onAttachFile }
  ></Bulletin>)  
}
