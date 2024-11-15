'use client'

import { useState } from 'react'
import {
  Icon,
  List,
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

      <List>
        {
          theList.map((listItem, listItemIndex) => {
            return <ListInput
              key={ listItemIndex }
              label={ `Вопрос №${listItemIndex + 1}` }
              media={<Icon> {listItemIndex + 1} </Icon>}
              placeholder="Введите вопрос"
              type="text"
            />
          })
        }
        
      </List>
    </Page>
  )
}
