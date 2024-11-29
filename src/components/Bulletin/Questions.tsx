'use client'

import {
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
import QuestionsItem from './Questions/QuestionsItem'

type QuestionsListProps = {
  onBack: () => void
  meeting: Meeting
  setMeeting: Dispatch<SetStateAction<Meeting>>
  attachFile: (fileName: string, fileContentType: string, fileContent: ArrayBuffer) => Promise<void>
}

export default function QuestionsList(props: QuestionsListProps) {
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
  const removeListItem = (idToRemove: string) => {
    props.setMeeting((meeting) => {
      return Object.assign(
        {},
        meeting,
        {
          questions: meeting.questions.filter(({ id }) => id !== idToRemove)
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
                QuestionsItem({
                  number: listItemIndex + 1,
                  content: listItem.text,
                  onSetContent: (content: string) => {
                    setListItemText(listItemIndex, content)
                  },
                  onDelete: () => {
                    removeListItem(listItem.id)
                  },
                  onFileAttach: async (file, contentType, content) => {
                    return props.attachFile(file, contentType, content)
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
