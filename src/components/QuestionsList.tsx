'use client'

import { useState } from 'react'
import {
  Fab,
  Navbar,
  Page
} from 'konsta/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import QueestionsItem from './QuestionsItem'

export default function QuestionsList() {
  const [ theList, setTheList ] = useState<string[]>(['', '', ''])
  return (
    <Page>
      <Navbar
        title="Повестка дня"
      />

      <div className="relative pb-12">
        {
          theList.map((listItem, listItemIndex) => {
            return <div key={ listItemIndex }>
              {
                QueestionsItem({
                  number: listItemIndex + 1,
                  content: listItem,
                  onSetContent: (content: string) => {
                    setTheList(theList.map((i, index) => index === listItemIndex ? content: i))
                  }
                })
              }
            </div>
          })
        }
        <Fab
          className="absolute left-1/2 bottom-4-safe transform -translate-x-1/2 z-20"
          icon={<FontAwesomeIcon icon={faPlus} className="relative -top-1" />}
          text="Добавить вопрос"
          textPosition="after"
          touchRipple={ true }
          onClick={() => {
            setTheList([...theList, ''])
          }}
        />
      </div>
    </Page>
  )
}
