import { useEffect } from 'react'
import { useFetcher } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import PrimeCategorySelector from '../../components/primeCategorySelector'
import {serverUrl} from '../../../../server'

export async function action({ request }) {
  const formData = await request.formData()
  const fileName = formData.get('image').name
  let url = ''
  let bodyForm = ''
  if (fileName.trim() === "") {
    const bodyObject = Object.fromEntries(formData)
    delete bodyObject.image
    url = serverUrl + '/admin/category'
    bodyForm = JSON.stringify(bodyObject)

  } else {
     url = serverUrl + '/admin/category/multer'
     bodyForm = formData
  }
  console.log(bodyForm)
   
 const contentHeaders = typeof(bodyForm) === 'string' ? {
        'Content-Type': 'application/json',
      }: {}
  try {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: contentHeaders,
      body: bodyForm,
    })
    
    const category = await response.json()
    return category
  } catch (error) {
    return {error: error.message }
  }
}


export default function CreateCategory() {
  const fetcher = useFetcher()

  useEffect(() => {
    const toastOptions = {
      duration: 5000,
      id: Math.round(Math.random()*1E9)
    }
toast.dismiss()
    fetcher.data
      ? fetcher.data.error
        ? toast.error(fetcher.data.error, toastOptions)
        : toast.success('Category created with success!', toastOptions)
      : ''
  }, [fetcher])
    return (
      <>
        <div className="card my-5 mx-auto bg-base-100 w-full max-w-sm shrink-0 ">
          <fetcher.Form
            method="post"
            className="card-body"
            encType="multipart/form-data"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name *</span>
              </label>
              <input
                type="name"
                placeholder="Category Name"
                className="input input-bordered"
                name="name"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
                name="image"
                
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Parent</span>
              </label>
              <PrimeCategorySelector name="parent_id"/>
            </div>
            <Toaster />
            <div className="form-control mt-6">
              <button className="btn btn-primary">
                {' '}
                {fetcher.state === 'submitting' ? (
                  <span className="loading loading-infinity loading-md"></span>
                ) : (
                  'Create'
                )}
              </button>
            </div>
          </fetcher.Form>
        </div>
      </>
    )
}

