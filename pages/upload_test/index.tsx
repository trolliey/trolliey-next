import React, { useContext } from 'react'
import axios from 'axios'
import { getError } from '../../utils/error';
import { Store } from '../../Context/Store';
var FormData = require('form-data');

function UploadText() {
  return (
    <div className="flex">
      <UiFileInputButton label="Upload Single File" uploadFileName="theFiles" />
    </div>
  )
}

export interface IProps {
  acceptedFileTypes?: string
  allowMultipleFiles?: boolean
  label: string
  uploadFileName: string
}

export const UiFileInputButton: React.FC<IProps> = (props) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)
  const formRef = React.useRef<HTMLFormElement | null>(null)
  const formData = new FormData()
  const {state} = useContext(Store)
  const {userInfo} = state

  const onClickHandler = () => {
    fileInputRef.current?.click()
  }

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return
    }

    Array.from(event.target.files).forEach((file) => {
      formData.append(event.target.name, file)
    })
    
}

const uploadPicture = async () => {
      formData.append('name', 'tatenda bako')
      formData.append('laas', 'asdjfhsj')
    const config = {
      headers: { 'content-type': 'multipart/form-data', authorization: userInfo?.token },
      onUploadProgress: (event: any) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        )
      },
    }

    axios.post('/api/products/create', formData, config).then(res=>{

        console.log('response', res.data)

    }).catch(error=>{
        console.log(getError(error))
    })

  }

  return (
    <div >
      <button type="button" onClick={onClickHandler}>
        {props.label}
      </button>
      <input
        accept={props.acceptedFileTypes}
        multiple={props.allowMultipleFiles}
        name={props.uploadFileName}
        onChange={onChangeHandler}
        ref={fileInputRef}
        style={{ display: 'none' }}
        type="file"
      />
      <button onClick={uploadPicture} className="bg-blue-700">
        UPload
      </button>
    </div>
  )
}

UiFileInputButton.defaultProps = {
  acceptedFileTypes: '',
  allowMultipleFiles: false,
}

export default UploadText
