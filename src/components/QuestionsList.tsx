'use client'

import { useState } from 'react'
import {
  Block,
  BlockTitle,
  Button,
  List,
  ListButton,
  ListInput,
  Navbar,
  Page
} from 'konsta/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

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
            <BlockTitle className="mx-4">
              <div>
                Вопрос №{listItemIndex + 1}
              </div>
              <div className="flex-1">
              </div>
              <div className="cursor-pointer px-2">
                <FontAwesomeIcon icon={ faEllipsisVertical } />
              </div>
            </BlockTitle>
            <Block
              key={ listItemIndex }
            >
              <List>
                <ListInput
                  placeholder="Введите вопрос"
                  type="text"
                />
                <ListButton className="mx-4">
                  Приложить файл
                </ListButton>
              </List>
            </Block>
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
