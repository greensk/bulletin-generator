import { createBulletin } from '../actions'

export default async function Home() {
  const theNewId = await createBulletin()
  return (
    <div>{ theNewId }</div>
  )
}
