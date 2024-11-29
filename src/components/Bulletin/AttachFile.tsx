import React, { useState, useRef } from 'react'
import {
  Block,
  Button,
  Link,
  ListButton,
  Sheet,
  Toast,
  Toolbar
} from 'konsta/react'

export default function AttachFile(
  props: {
    className: string,
    onFileAttach: (
      name: string,
      contentType: string,
      content: ArrayBuffer
    ) => Promise<void>
  }
) {
  const [sheetOpened, setSheetOpened] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadingError, setUploadingError] = useState('')
  return <div className={ props.className }>
    <input
      className="hidden"
      ref={ fileInputRef }
      type="file"
      onChange={(e) => {
        const file = e.target.files!.item(0)!
        const reader = new FileReader()
        reader.onload = async (e) => {
          await props.onFileAttach(file.name, file.type, e.target!.result as ArrayBuffer)
          setUploading(false)
        }
        reader.onerror = function (evt) {
          setUploadingError('Ошибка при чтении файла')
          setUploading(false)
        }
        reader.readAsArrayBuffer(file)
      }}
    />
    <Toast
      position="center"
      opened={ uploadingError !== '' }
      button={
        <Button
          rounded
          clear
          small
          inline
          onClick={() => setUploadingError('')}
        >
          Close
        </Button>
      }
    >
      <div className="shrink">{ uploadingError }</div>
    </Toast>
    { uploading ? <div>Uploading...</div> : <ListButton
      className="mx-4"
      onClick={() => {
        if (fileInputRef.current) {
          fileInputRef.current.click()
        }
        // setSheetOpened(!sheetOpened)
      }}
    >
      Приложить файл
    </ListButton> }
    <Sheet
      className="pb-safe w-full sm:w-auto"
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
