'use client'

import {
  useState,
  Dispatch,
  SetStateAction
} from 'react'
import {
  Block,
  Button,
  Fab,
  Navbar,
  NavbarBackLink,
  Page
} from 'konsta/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Meeting } from '@/types'
import { genRandomString } from '@/utils'
import QueestionsItem from './Questions/QuestionsItem'

type QuestionsListProps = {
  onBack: () => void
  meeting: Meeting
  setMeeting: Dispatch<SetStateAction<Meeting>>
}

export default function QuestionsList(props: QuestionsListProps) {
  // const [ theList, setTheList ] = useState<string[]>(['', '', ''])
  const setListItemText = (index: number, text: string) => {
    props.setMeeting((meeting) => {
      return Object.assign(
        {},
        meeting,
        {
          questions: meeting.questions.map((q, i) => {
            if (i === index) {
              return {
                ...q,
                text
              }
            } else {
              return q
            }
          })
        }
      )
    })
  }
  const removeListItem = (index: number) => {
    props.setMeeting((meeting) => {
      return Object.assign(
        {},
        meeting,
        {
          questions: meeting.questions.filter((q, i) => i === index)
        }
      )
    })
  }
  const addListItem = (text = '') => {
    props.setMeeting((meeting) => {
      return Object.assign(
        {},
        meeting,
        {
          questions: [
            ...meeting.questions,
            {
              id: genRandomString(),
              text
            }
          ]
        }
      )
    })
  }
  return (
    <Page>
      <Navbar
        left={
          <NavbarBackLink text="Назад" onClick={ props.onBack } />
        }
    
        title="Повестка дня"
      />

      <div className="relative pb-12 sm:w-192 mx-auto">
        {
          props.meeting.questions.map((listItem, listItemIndex) => {
            return <div key={ listItemIndex }>
              {
                QueestionsItem({
                  number: listItemIndex + 1,
                  content: listItem.text,
                  onSetContent: (content: string) => {
                    setListItemText(listItemIndex, content)
                  },
                  onDelete: () => {
                    removeListItem(listItemIndex)
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
            addListItem()
          }}
        />
      </div>
      <Block strong outlineIos className="space-y-2">
        <form method="post" action="/api/docx">
          <input
            type="hidden"
            name="meeting"
            value={ JSON.stringify(props.meeting) }
          />
          <Button
          >
            Сгенерировать бюллетень
          </Button>
        </form>
      </Block>
    </Page>
  )
}
