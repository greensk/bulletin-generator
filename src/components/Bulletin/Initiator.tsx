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
  Radio,
  MenuList,
  MenuListItem
} from 'konsta/react'
import { Meeting } from '@/types'
import {
  Dispatch,
  SetStateAction
} from 'react'
import Public from './General/Public'
import Distant from './General/Distant'

type TheProps = {
  onNext: () => void
  meeting: Meeting
  setMeeting: Dispatch<SetStateAction<Meeting>>
}

export default function GeneralForm(props: TheProps) {
  return <Page>
    <Navbar
      title="Общее собрание собственников"
    />
    <BlockTitle>Инициатор собрания</BlockTitle>
    <MenuList>
      <MenuListItem
        title="Собственники кваритир"
        active={props.meeting.initiatorType === 'owners'}
        onClick={() => {
          props.setMeeting(
            (meeting) => {
              return Object.assign({}, meeting, { initiatorType: 'owners' })
            }
          )
        }}
      />
      <MenuListItem
        title="Управляющая компания или ТСЖ"
        active={ props.meeting.initiatorType === 'management' }
        onClick={() => {
          props.setMeeting(
            (meeting) => {
              return Object.assign({}, meeting, { initiatorType: 'management' })
            }
          )
        }}
      />
    </MenuList>

    <BlockTitle>Сведения об инициаторе</BlockTitle>
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
        Перейти к вопросам
      </Button>
    </Block>
  </Page>
}
