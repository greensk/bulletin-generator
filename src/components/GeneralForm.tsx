'use client'

import {
  Block,
  BlockTitle,
  Button,
  List,
  ListInput,
  Navbar,
  Page
} from 'konsta/react'

type GeneralFormProps = {
  onNext: () => void
}

export default function GeneralForm(props: GeneralFormProps) {
  return <Page>
    <Navbar
      title="Общее собрание собственников"
    />
    <BlockTitle>Адрес дома</BlockTitle>
    <List strongIos insetIos>
      <ListInput
        label="Населённый пункт"
        type="text"
        placeholder="Москва"
      />

      <ListInput
        label="Улица"
        type="text"
        placeholder="Шипиловская"
      />

      <ListInput
        label="Номер дома"
        type="text"
        placeholder="20"
      />
    </List>
    <Block strong outlineIos className="space-y-2">
      <Button
        onClick={ props.onNext }
      >
        Перейти к вопросам
      </Button>
    </Block>
  </Page>
}
