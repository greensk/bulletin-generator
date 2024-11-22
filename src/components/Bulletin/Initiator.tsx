'use client'

import {
  Block,
  BlockTitle,
  Button,
  List,
  ListInput,
  ListItem,
  MenuList,
  MenuListItem,
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

    <Block strong outlineIos className="space-y-2">
      <Button
        onClick={ props.onNext }
      >
        Перейти к вопросам
      </Button>
    </Block>
  </Page>
}
