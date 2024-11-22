'use client'

import {
  Block,
  BlockTitle,
  Button,
  List,
  ListInput,
  ListItem,
  Navbar,
  Page,
  Radio
} from 'konsta/react'
import { Meeting } from '../types'
import {
  Dispatch,
  SetStateAction
} from 'react'

type GeneralFormProps = {
  onNext: () => void
  meeting: Meeting
  setMeeting: Dispatch<SetStateAction<Meeting>>
}

type MeetingType = 'intramural' | 'distant' | 'combined'

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

    <BlockTitle>Способ проведения собрания</BlockTitle>
    <List strongIos insetIos>
      <ListItem
        label
        title="Очное"
        media={
          <Radio
            component="div"
            value="public"
            checked={props.meeting.meetingType === 'public'}
            onChange={e => props.setMeeting( Object.assign({}, props.meeting, { meetingType: 'public' }) )}
          />
        }
      />
      <ListItem
        label
        title="Заочное"
        media={
          <Radio
            component="div"
            value="distant"
            checked={props.meeting.meetingType === 'distant'}
            onChange={e => props.setMeeting( Object.assign({}, props.meeting, { meetingType: 'distant' }) )}
          />
        }
      />
      <ListItem
        label
        title="Очно-заочное"
        media={
          <Radio
            component="div"
            value="combined"
            checked={props.meeting.meetingType === 'combined'}
            onChange={e => props.setMeeting( Object.assign({}, props.meeting, { meetingType: 'combined' }) )}
          />
        }
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
