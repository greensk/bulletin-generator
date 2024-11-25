'use client'

import {
  Block,
  BlockTitle,
  Button,
  List,
  ListInput,
  ListItem,
  Navbar,
  NavbarBackLink,
  Page,
  Radio
} from 'konsta/react'
import { Meeting } from '@/types'
import {
  Dispatch,
  SetStateAction
} from 'react'
import InitiatorOwners from './Initiator/InitiatorOwners'

type TheProps = {
  onNext: () => void
  onBack: () => void
  meeting: Meeting
  setMeeting: Dispatch<SetStateAction<Meeting>>
}

export default function GeneralForm(props: TheProps) {
  return <Page>
    <Navbar
      title="Общее собрание собственников"
      left={
        <NavbarBackLink text="Назад" onClick={ props.onBack } />
      }
    />
    <BlockTitle>Инициатор собрания</BlockTitle>
    <List strongIos insetIos>
      <ListItem
        label
        title="Собственники квартир"
        media={
          <Radio
            component="div"
            value="public"
            checked={props.meeting.initiatorType === 'owners'}
            onChange={() => {
              props.setMeeting(
                (meeting) => {
                  return Object.assign({}, meeting, { initiatorType: 'owners' })
                }
              )    
            }}
          />
        }
      />
      <ListItem
        label
        title="Управляющая компания или ТСЖ"
        media={
          <Radio
            component="div"
            value="distant"
            checked={props.meeting.initiatorType === 'management'}
            onChange={() => {
              props.setMeeting(
                (meeting) => {
                  return Object.assign({}, meeting, { initiatorType: 'management' })
                }
              )
            }}
          />
        }
      />
    </List>

    {
      props.meeting.initiatorType === 'management' ? <>
        <BlockTitle>Сведения об инициаторе</BlockTitle>
        <Block
        >
          <List>
            <ListInput
              placeholder="Название организации"
              type="text"
              value={ props.meeting.initiatorOrganization.name }
              onInput={(e) => {
                props.setMeeting((meeting) => {
                  return Object.assign(
                    {},
                    meeting,
                    {
                      initiatorOrganization: Object.assign(
                        {},
                        props.meeting.initiatorOrganization,
                        {
                          name: e.target.value
                        }
                      )
                    }
                  )
                })
              }}
            />
          </List>
        </Block>
      </> : <></>
    }

    {
      props.meeting.initiatorType === 'owners' ? <>
        <BlockTitle>Сведения об инициаторе</BlockTitle>
        <InitiatorOwners
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
