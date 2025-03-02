import {useEffect} from 'react'
import { useFetcher, } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { serverUrl } from '../../../../server'
export async function action({ request }) {
    console.log('Inside Sales action')
    // Get the formData from the form
    const formData = await request.formData()
    let url = serverUrl+'/admin/sales/imageless'
   

    // Get the image name 
    const imageName = formData.get('image').name

    if (imageName !== '') {
        url = serverUrl + '/admin/sales/'
    }

     try {
       const response = await fetch(url, {
         method: 'POST',
         credentials: 'include',
         body: formData,
       })
         const data = await response.json()
         console.log(data)
       return data
     } catch (error) {
       return { error: error.message }
     }
}



export default function  CreateSales(){
    const fetcher = useFetcher()
    useEffect(() => {
      const toastOptions = {
        duration: 5000,
        id: Math.round(Math.random() * 1e9),
      }
      toast.dismiss()

      fetcher.data
        ? fetcher.data.error
          ? toast.error(fetcher.data.error, toastOptions)
          : toast.success(fetcher.data.msg, toastOptions)
        : ''
     
    }, [fetcher])
    return (
      <div className="card my-5 mx-auto bg-base-100 w-full max-w-sm shrink-0 ">
        <fetcher.Form
          method="post"
          className="card-body"
          encType="multipart/form-data"
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered"
              name="name"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Discount</span>
            </label>
            <input
              type="number"
              step=".01"
              min="0"
              placeholder="0.00"
              className="input input-bordered"
              name="discount_rate"
              required
            />
          </div>
          <div className="form-control mb-5">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered file-input-primary w-full max-w-xs"
              name="image"
            />
          </div>
          <div className="form-control mb-5">
            <label className="label">
              <span className="label-text">Expiry Date</span>
            </label>
            <input
              type="date"
              className="file-input file-input-bordered file-input-primary w-full max-w-xs"
              name="expires"
              required
            />
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
                </div>
                <Toaster/>
        </fetcher.Form>
      </div>
    )
}