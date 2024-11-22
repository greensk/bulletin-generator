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
      label="Дата"
      type="date"
      value={ props.meeting.public.date }
      onInput={(e) => {
        props.setMeeting(
          Object.assign(
            {},
            props.meeting,
            { public: Object.assign(
              {},
              props.meeting.public!,
              { date: e.target.value }
            ) }
          )
        )
      }}
    />

    <ListInput
      label="Время"
      type="time"
      placeholder=""
      value={ props.meeting.public.time }
      onInput={e => props.setMeeting(
        Object.assign(
          {},
          props.meeting,
          { public: Object.assign(
            {},
            props.meeting.public,
            { time: e.target.value }
          ) }
        )
      )}
    />

    <ListInput
      label="Место проведения"
      type="text"
      placeholder="Около подъезда №2 со стороны двора"
      value={ props.meeting.public.place }
      onInput={e => props.setMeeting(
        Object.assign(
          {},
          props.meeting,
          { public: Object.assign(
            {},
            props.meeting.public,
            { place: e.target.value }
          ) }
        )
      )}
    />
  </List>
}
