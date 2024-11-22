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
import { Meeting } from '@/types'
import {
  Dispatch,
  SetStateAction
} from 'react'
import Public from './General/Public'
import Distant from './General/Distant'

type GeneralFormProps = {
  onNext: () => void
  meeting: Meeting
  setMeeting: Dispatch<SetStateAction<Meeting>>
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
        value={ props.meeting.address.city }
        onInput={e => props.setMeeting(
          Object.assign(
            {},
            props.meeting,
            { address: Object.assign(
              {},
              props.meeting.address,
              { city: e.target.value }
            ) }
          )
        )}
      />

      <ListInput
        label="Улица"
        type="text"
        placeholder="Шипиловская"
        value={ props.meeting.address.street }
        onInput={e => props.setMeeting(
          Object.assign(
            {},
            props.meeting,
            { address: Object.assign(
              {},
              props.meeting.address,
              { street: e.target.value }
            ) }
          )
        )}
      />

      <ListInput
        label="Номер дома"
        type="text"
        placeholder="20"
        value={ props.meeting.address.house }
        onInput={e => props.setMeeting(
          Object.assign(
            {},
            props.meeting,
            { address: Object.assign(
              {},
              props.meeting.address,
              { house: e.target.value }
            ) }
          )
        )}
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
            onChange={() => props.setMeeting( Object.assign({}, props.meeting, { meetingType: 'public' }) )}
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
            onChange={() => props.setMeeting( Object.assign({}, props.meeting, { meetingType: 'distant' }) )}
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
            onChange={() => props.setMeeting( Object.assign({}, props.meeting, { meetingType: 'combined' }) )}
          />
        }
      />
    </List>

    {
      props.meeting.meetingType !== 'distant' ? <>
        <BlockTitle>
          Очная часть
        </BlockTitle>
        <Public
          meeting={ props.meeting }
          setMeeting={ props.setMeeting }
        />
      </> : <></>  
    }

    {
      props.meeting.meetingType !== 'public' ? <>
        <BlockTitle>
          Заочная часть
        </BlockTitle>
        <Distant
          meeting={ props.meeting }
          setMeeting={ props.setMeeting }
        />
      </> : <></>  
    }

    <Block strong outlineIos className="space-y-2">
      <Button
        onClick={ props.onNext }
      >
        Далее
      </Button>
    </Block>
  </Page>
}
