import { useEffect, useState } from 'react'
import { useFetcher, useLoaderData } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import { serverUrl } from '../../../../server'
export async function loader({ params }) {
  const { id } = params
   
    
    try {
        const response = await fetch(
          `${serverUrl}/admin/sales/${id}`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        const data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        console.log(error.message)
        throw new Error(error.message)
    }
}

export async function action({ params, request }) {
    const formData = await request.formData() 
    const imageName = formData.get('image').name
    const { id } = params
    
    try {
        const response = await fetch(
          `${serverUrl}/admin/sales/${id}`,
          {
            method: imageName === '' ? 'PATCH' : 'PUT',
            credentials: 'include',
            body: formData,
          }
        ) 
        const data = await response.json()
        return data
    } catch (error) {
        return {error: error.message}
    }
}

export default function EditSales() {
   
    const singleSale = useLoaderData()
     const [startDate, setStartDate] = useState(singleSale.expires)
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
            defaultValue={singleSale.name}
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
            defaultValue={singleSale.discount_rate.$numberDecimal}
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
            <span className="label-text">
              Expiry Date (Prev: {singleSale.expires})
            </span>
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
          <input
            name="expires"
            className="input input-bordered"
            type="hidden"
            value={new Date(startDate).toISOString()}
          />

          <div className="form-control mt-6">
            <button className="btn btn-primary">
              {' '}
              {fetcher.state === 'submitting' ? (
                <span className="loading loading-infinity loading-md"></span>
              ) : (
                'Edit'
              )}
            </button>
          </div>
        </div>
        <Toaster />
      </fetcher.Form>
    </div>
  )
}
