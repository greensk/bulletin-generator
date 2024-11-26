import Bulletin from './Bulletin'
import { genRandomString } from '@/utils'
import { createBulletin } from '../actions'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

export const getServerSideProps = (async () => {
  const theNewId = await createBulletin()
  return { props: { theNewId } }
}) satisfies GetServerSideProps<{ theNewId: string }>


export default async function Home(
  {
    theNewId
  }: InferGetServerSidePropsType<typeof getServerSideProps>
) {

  
  return (
    <div>{ theNewId }</div>
  )
}
