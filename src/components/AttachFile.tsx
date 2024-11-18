import React, { useState } from 'react';
import {
  Block,
  Button,
  Link,
  ListButton,
  Sheet,
  Toolbar
} from 'konsta/react';

export default function AttachFile(props: { className: string }) {
  const [sheetOpened, setSheetOpened] = useState(false)
  return <div className={ props.className }>
    <ListButton
      className="mx-4"
      onClick={() => {
        setSheetOpened(!sheetOpened)
      }}
    >
      Приложить файл
    </ListButton>
    <Sheet
      className="pb-safe"
      opened={sheetOpened}
      onBackdropClick={() => setSheetOpened(false)}
    >
      <Toolbar top>
        <div className="left" />
        <div className="right">
          <Link toolbar onClick={() => setSheetOpened(false)}>
            Закрыть
          </Link>
        </div>
      </Toolbar>
      <Block>
        <p>
          Авторизуйтесь, чтобы иметь возможность прикладывать файлы.
        </p>
        <div className="mt-4">
          <Button onClick={() => setSheetOpened(false)}>Войти</Button>
        </div>
      </Block>
    </Sheet>
  </div>
}
