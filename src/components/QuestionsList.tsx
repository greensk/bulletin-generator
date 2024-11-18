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
} from 'konsta/react';

export default function QuestionsList() {
  const [ theList, setTheList ] = useState<string[]>(['', '', ''])
  return (
    <Page>
      <Navbar
        title="Повестка дня"
      />

      {
        theList.map((listItem, listItemIndex) => {
          return <>
            <BlockTitle className="ml-4">
              Вопрос №{listItemIndex + 1}
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
          </>
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
