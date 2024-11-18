'use client'

import { useState } from 'react'
import {
  Block,
  Button,
  Icon,
  Card,
  List,
  ListInput,
  ListItem,
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
          return <Block
            key={ listItemIndex }
          >
            <List title={ `Вопрос №${listItemIndex + 1}` }>
              <ListInput
                media={<Icon> {listItemIndex + 1} </Icon>}
                placeholder="Введите вопрос"
                type="text"
              />
            </List>
          </Block>
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
