'use client'

import {
  Block,
  BlockTitle,
  List,
  ListInput
} from 'konsta/react'

import AttachFile from './AttachFile'
import QuestionMenu from './QuestionMenu'

export type QuestionProps = {
  content: string
  number: number
  onDelete: Function
  onSetContent: (content: string) => void
}

export default function QuestionItem(props: QuestionProps) {
return <div>
    <BlockTitle className="mx-4">
      <div>
        Вопрос №{ props.number }
      </div>
      <div className="flex-1">
      </div>
      <div className="cursor-pointer px-2">
        <QuestionMenu
          delete={ () => {
            props.onDelete()
          }}
        />
      </div>
    </BlockTitle>
    <Block
    >
      <List>
        <ListInput
          placeholder="Введите вопрос"
          type="textarea"
          inputClassName="!h-20 resize-none"
          onInput={(e) => {
            props.onSetContent(e.target.value)
          }}
        />
        <AttachFile
          className="z-30"
        />
      </List>
    </Block>
  </div>
}
