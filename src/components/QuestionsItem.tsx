'use client'

import {
  Block,
  BlockTitle,
  List,
  ListButton,
  ListInput
} from 'konsta/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

export type QuestionProps = {
  content: string
  number: number
  onSetContent: (content: string) => void
}

export default function QuestionItem(props: QuestionProps) {
return <div>
    <BlockTitle className="mx-4">
      <div>
        Вопрос №{props.number}
      </div>
      <div className="flex-1">
      </div>
      <div className="cursor-pointer px-2">
        <FontAwesomeIcon icon={ faEllipsisVertical } />
      </div>
    </BlockTitle>
    <Block
    >
      <List>
        <ListInput
          placeholder="Введите вопрос"
          type="text"
          onInput={(e) => {
            props.onSetContent(e.target.value)
          }}
        />
        <ListButton className="mx-4">
          Приложить файл
        </ListButton>
      </List>
    </Block>
  </div>
}
