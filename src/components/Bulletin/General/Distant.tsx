'use client'

import {
  List,
  ListInput
} from 'konsta/react'
import { Meeting } from '@/types'
import {
  Dispatch,
  SetStateAction
} from 'react'

type Props = {
  meeting: Meeting
  setMeeting: Dispatch<SetStateAction<Meeting>>
}

export default function GeneralForm(props: Props) {
  return <List strongIos insetIos>
      <ListInput
        label="Место сбора заполненных бюллетеней"
        type="text"
        placeholder="Квартира №99"
        value={ props.meeting.public.place }
        onInput={e => props.setMeeting(
          Object.assign(
            {},
            props.meeting,
            { distant: Object.assign(
              {},
              props.meeting.distant,
              { place: e.target.value }
            ) }
          )
        )}
      />
      <ListInput
        label="Дата окончания сбора бюллетеней"
        type="date"
        value={ props.meeting.distant.endDate }
        onInput={(e) => {
          props.setMeeting(
            Object.assign(
              {},
              props.meeting,
              { distant: Object.assign(
                {},
                props.meeting.distant!,
                { endDate: e.target.value }
              ) }
            )
          )
        }}
      />

      <ListInput
        label="Время окончания сбора бюллетеней"
        type="time"
        placeholder=""
        value={ props.meeting.distant.endTime }
        onInput={e => props.setMeeting(
          Object.assign(
            {},
            props.meeting,
            { distant: Object.assign(
              {},
              props.meeting.distant,
              { time: e.target.value }
            ) }
          )
        )}
      />
    </List>
}
