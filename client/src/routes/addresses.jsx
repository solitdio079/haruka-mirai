import { useEffect } from "react"
import { useFetcher, useLoaderData, Link, useNavigate } from "react-router-dom"
import { FaMapPin } from "react-icons/fa6"
import toast, {Toaster} from 'react-hot-toast'
import AnimatedLayout from "../animation/animatedLayout"
import { serverUrl } from "../server"
export async function action({ request }) {
    const formData = await request.formData()
    const bodyObject = Object.fromEntries(formData)
    try {
        const response = await fetch(`${serverUrl}/addresses/`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bodyObject),
        })
      const newAddress = await response.json()
    
        return newAddress
        
    } catch (error) {
        return {error: error.message}
    }
    
}
export async function loader() {
     try {
       const response = await fetch(`${serverUrl}/addresses/`, {
         method: 'GET',
         credentials: 'include',
         headers: {
           'Content-Type': 'application/json',
         },
       })
       const addresses = await response.json()
         console.log(addresses)
       return addresses
     } catch (error) {
       return { error: error.message }
     }
}
export default function Addresses() {
    const fetcher = useFetcher()
    const addresses = useLoaderData()||null
    const navigate = useNavigate()
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
        if (fetcher.data) {
          fetcher.data.id
            ? setTimeout(() => navigate(`/checkout/${fetcher.data.id}`), 5000)
            : ''
     }
    }, [fetcher])
  return (
   
      <div className="flex flex-col w-full justify-center items-center lg:flex-row p-5 ">
        {addresses ? (
          <>
            {' '}
            <div className="flex">
              {addresses.map((item) => (
                <div
                  key={item._id}
                  className="card bg-base-100 w-96 shadow-xl m-2"
                >
                  <div className="card-body">
                    <h2 className="card-title">
                      {' '}
                      <FaMapPin /> {item.name}{' '}
                    </h2>
                    <ul className="menu w-56 p-0 [&_li>*]:rounded-none">
                      <li>
                        <span> {item.addressLines} </span>
                      </li>
                      <li>
                        <span> {item.country} </span>
                      </li>
                      <li>
                        <span> {item.city} </span>
                      </li>
                      <li>
                        <span> {item.zipCode} </span>
                      </li>
                    </ul>
                    <div className="card-actions justify-end">
                      <Link
                        to={`/checkout/${item._id}`}
                        className="btn btn-outline btn-primary"
                      >
                        Choisir
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="divider lg:divider-horizontal">OU</div>
          </>
        ) : (
          ''
        )}

        <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
          <fetcher.Form method="post" className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Address Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="text"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Address Line</span>
              </label>
              <textarea
                name="addressLines"
                className="textarea textarea-bordered"
                placeholder="Complete Address"
              ></textarea>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Country</span>
              </label>
              <input
                type="text"
                name="country"
                placeholder="Country"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">City</span>
              </label>
              <input
                type="text"
                name="city"
                placeholder="city"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Zip Code</span>
              </label>
              <input
                type="text"
                name="zipCode"
                placeholder="37150"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">
                {fetcher.state === 'submitting' ? (
                  <span className="loading loading-infinity loading-md"></span>
                ) : (
                  'Create'
                )}
              </button>
            </div>
          </fetcher.Form>
          <Toaster />
        </div>
      </div>
    
  )
}