'use client'

import {
  Button,
  List,
  ListItem,
  Popover
} from 'konsta/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { useState, useRef } from 'react'

export type QuestionMenuProps = {
  delete: Function
}

export default function QuestionMenu(props: QuestionMenuProps) {
  const [popoverOpened, setPopoverOpened] = useState(false)
  const popoverTargetRef = useRef<HTMLElement | null>(null)

  const openPopover = (target: HTMLElement) => {
    popoverTargetRef.current = target
    setPopoverOpened(true)
  }

  return <div>
    <Button onClick={ (event) => {
      openPopover(event.target as HTMLElement)
    }}>
      <FontAwesomeIcon
        icon={ faEllipsisVertical }
      />
    </Button>
    <Popover
      opened={ popoverOpened }
      target={ popoverTargetRef }
      onBackdropClick={ () => setPopoverOpened(false) }
    >
      <List nested>
        <ListItem
          title="Удалить"
          link
          onClick={ () => props.delete() }
        />
      </List>
    </Popover>
  </div>
}
