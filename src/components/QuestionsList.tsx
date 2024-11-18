'use client'

import { useState } from 'react'
import {
  Block,
  Button,
  Fab,
  Navbar,
  Page
} from 'konsta/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import QueestionsItem from './QuestionsItem'

export default function QuestionsList() {
  const [ theList, setTheList ] = useState<string[]>(['', '', ''])
  const onGenerate = () => {

  }
  return (
    <Page>
      <Navbar
        title="Повестка дня"
      />

      <div className="relative pb-12 sm:w-192 mx-auto">
        {
          theList.map((listItem, listItemIndex) => {
            return <div key={ listItemIndex }>
              {
                QueestionsItem({
                  number: listItemIndex + 1,
                  content: listItem,
                  onSetContent: (content: string) => {
                    setTheList(theList.map((i, index) => index === listItemIndex ? content: i))
                  },
                  onDelete: () => {
                    setTheList(theList.filter((_, index) => index !== listItemIndex))
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
      <Block strong outlineIos className="space-y-2">
        <form method="post" action="/api/docx">
          {
            theList.map((listItem, listItemIndex) => {
              return <input
                key={ listItemIndex }
                type="hidden"
                name="question[]"
                value={ listItem }
              />
            })
          }
          <Button
          >
            Сгенерировать бюллетень
          </Button>
        </form>
      </Block>
    </Page>
  )
}
