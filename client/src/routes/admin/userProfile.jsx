import { useContext, useEffect } from "react"
import { UserContext } from "./UserContext"
import {useFetcher} from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { serverUrl } from "../../server"

export async function action({request}) {
    const formData = await request.formData()
    const bodyObj = Object.fromEntries(formData)
    console.log(JSON.stringify(bodyObj))
    const httpMethod = bodyObj.picture !== "" ? "PUT" : "PATCH"
    console.log(formData.get('picture'))
   
    console.log(httpMethod)
    try {
        const response = await fetch(
          `${serverUrl}/profile/${bodyObj.id}`,
          {
            method: httpMethod,
            credentials: 'include',
            body: formData,
          }
        )
        const message = await response.json()
        return message
    } catch (error) {
        return {error: error.message}
    }
}

export default function UserProfile() {
    const fetcher = useFetcher()
    const user = useContext(UserContext)

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
      <div className="card bg-base-100 w-108 shadow-xl">
        <div className="card-body items-center">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
              <img src={ user.picture } />
            </div>
          </div>
          <fetcher.Form encType="multipart/form-data" method="post" className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                            required
                            defaultValue= {user.email}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="My Name"
                            className="input input-bordered"
                            defaultValue={user.fullName}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Picture</span>
              </label>
              <input
                name="picture"
                type="file"
                className="file-input w-full max-w-xs"
                        />
                        <input type="hidden" name="id" value={user.id}/>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="+90 537 999 00 00"
                            className="input input-bordered"
                            defaultValue={user.phone || ''}
                
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-warning"> {fetcher.state !=="idle" ? <span className="loading loading-infinity loading-md"></span>: 'Update'} </button>
                    </div>
                    <Toaster/>
          </fetcher.Form>
        </div>
      </div>
    )
}