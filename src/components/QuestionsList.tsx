'use client'

import { useState } from 'react'
import {
  Block,
  Button,
  Navbar,
  Page
} from 'konsta/react'

import QueestionsItem from './QuestionsItem'

export default function QuestionsList() {
  const [ theList, setTheList ] = useState<string[]>(['', '', ''])
  return (
    <Page>
      <Navbar
        title="Повестка дня"
      />

      {
        theList.map((listItem, listItemIndex) => {
          return <div key={ listItemIndex }>
            {
              QueestionsItem({
                number: listItemIndex + 1,
                content: listItem,
                onSetContent: (content: string) => {
                  setTheList(theList.splice(listItemIndex, 1, content))
                }
              })
            }
          </div>
        })
      }
      <Block strong outlineIos className="space-y-2">
        <Button onClick={() => {
          setTheList([...theList, ''])
        }}>Добавить вопрос</Button>
      </Block>
    </Page>
  )
}
