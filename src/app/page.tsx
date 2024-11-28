import { createBulletin } from '../actions'
import { redirect } from 'next/navigation'

export default async function Home() {
  const theNewId = await createBulletin()
  return redirect(`/edit/${theNewId}`)
}
