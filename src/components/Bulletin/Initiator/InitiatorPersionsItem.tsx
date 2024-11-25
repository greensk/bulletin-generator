'use client'

import {
  Block,
  BlockTitle,
  List,
  ListInput
} from 'konsta/react'

import InitiatorPersonMenu from './InitiatorPersonMenu'

export type TheProps = {
  fullName: string
  flat: string
  setFullName: (fullName: string) => void
  setFlat: (flat: string) => void
  onDelete: () => void
}

export default function InitatorPersionitem(props: TheProps) {
  return <div>
    <BlockTitle className="mx-4">
      <div>
        Сведения о собственнике-инициаторе
      </div>
      <div className="flex-1">
      </div>
      <div className="cursor-pointer px-2">
        <InitiatorPersonMenu
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
          placeholder="Фамилия, имя, отчество собственника"
          type="text"
          onInput={(e) => {
            props.setFullName(e.target.value)
          }}
        />
        <ListInput
          placeholder="Номер квартиры"
          type="text"
          onInput={(e) => {
            props.setFlat(e.target.value)
          }}
        />
      </List>
    </Block>
  </div>
}
