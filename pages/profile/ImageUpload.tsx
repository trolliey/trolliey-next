import { useRef, useState } from 'react'

interface Props {
  defaultImage?: any
}

export default function ImageUploader({ defaultImage }: Props) {
  const fileSelect = useRef<any>(null)
  const [image, setImage] = useState<any>(defaultImage)
  const [progress, setProgress] = useState<any>(0)
  const [upload_image, setUploadImage] = useState<any>(null)

  async function handleImageUpload() {
    if (fileSelect) {
      fileSelect.current.click()
    }
  }

  function handleFiles(files: any) {
    for (let i = 0; i < files?.length; i++) {
      console.log(files)
      //   uploadFile(files);
      setUploadImage(files)
    }
  }

  function uploadFile(file: any) {
      //@ts-ignore
    const url = `https://api.cloudinary.com/v1_1/trolliey/image/upload`
    const xhr = new XMLHttpRequest()
    const fd = new FormData()
    xhr.open('POST', url, true)
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

    // Update progress (can be used to show progress indicator)
    xhr.upload.addEventListener('progress', (e) => {
      setProgress(Math.round((e.loaded * 100.0) / e.total))
      console.log(Math.round((e.loaded * 100.0) / e.total))
    })

    xhr.onreadystatechange = (e) => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const response = JSON.parse(xhr.responseText)
        setImage(response.secure_url)
        // console.log(response.secure_url)
      }
    }

    fd.append('upload_preset', 'g6ixv6cg')
    fd.append('tags', 'browser_upload')
    //@ts-ignore
    fd.append('api_key', process.env.CLOUDNARY_API_KEY)
    fd.append('file', file)
    xhr.send(fd)
  }

  return (
    <>
      {image ? (
        <img
          className="rounded-lg object-contain"
          src={image.replace('upload/', 'upload/w_600/')}
          style={{ height: 400, width: 600 }}
        />
      ) : (
        <div
          className="rounded-lg border-4 border-dashed border-gray-400 bg-gray-200"
          style={{ height: 400, width: 600 }}
        >
          <form className="flex h-full items-center justify-center">
            {progress === 0 ? (
              <div className="text-center text-gray-700">
                <button
                  className="m-auto block rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-800"
                  onClick={handleImageUpload}
                  type="button"
                >
                  Browse
                </button>
              </div>
            ) : (
              <span className="text-gray-700">{progress}%</span>
            )}

            <input
              ref={fileSelect}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => handleFiles(e.target.files)}
            />
          </form>
        </div>
      )}
    </>
  )
}
