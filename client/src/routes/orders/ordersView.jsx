import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../admin/UserContext'
import { useLoaderData, useFetcher } from "react-router-dom"
import AddressCard from "../../components/addressCard"
import UserProfileCard from "../../components/userProfileCard"
import StaticCart from "../../components/staticCart"
import InfiniteScroll from 'react-infinite-scroll-component'
import toast, { Toaster } from 'react-hot-toast'
import { serverUrl } from '../../server'
export async function loader() {
    try {
        const response = await fetch(
          `${serverUrl}/orders/?cursor=&limit=5`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        const data = await response.json()
        return data
        
    } catch (error) {
        console.log(error.message);
    }
}

export async function action({request }) {
  const formData = await request.formData()
  const bodyObj = Object.fromEntries(formData)

  try {
    const response = await fetch(
      `${serverUrl}/orders/${bodyObj.id}`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyObj),
      }
    )
    const data = await response.json()
    return data
  } catch (error) {
    return {error: error.message}
  }

  
}

export default function ViewOrder() {
  const user = useContext(UserContext)
    const fetcher = useFetcher()
    const data = useLoaderData()
    const [items, setItems] = useState(data)
    const [cursor, setCursor] = useState(null)
    const [hasMore, setHasMore] = useState(true)


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
        if(cursor) fetchMoreData()
    }, [cursor, fetcher])

    const fetchMoreData = async () => {
        try {
            const response = await fetch(
              `${serverUrl}/orders/?cursor=${cursor}&limit=5`,
              {
                method: 'GET',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            )
            const newData = await response.json()
            console.log(newData)
            setItems((prev) => [...prev, ...newData])
            newData.length >0 ? setHasMore(true): setHasMore(false)
            
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
      <div className="flex flex-row flex-wrap">
        {' '}
        {data.length > 0 ? (
          <InfiniteScroll
            dataLength={items.length}
            next={() => setCursor(items[items.length - 1]._id)}
            hasMore={hasMore}
            loader={
              <span className="loading loading-infinity loading-lg"></span>
            }
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {data.map((item) => (
              <div key={item._id} className="card bg-base-100 shadow-xl my-5">
                <div className="card-body">
                  <h2 className="card-title">
                    <span className="text-xs">
                      #{item._id}{' '}
                      <div className="badge badge-primary"> {item.status} </div>
                    </span>{' '}
                  </h2>
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      <AddressCard item={item.address} />
                      <UserProfileCard user={item.user} />
                    </div>
                    <StaticCart cart={item.cart} />
                  </div>
                  {user.isAdmin ? (
                    <fetcher.Form method="post" className="card-body">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Shipping Link</span>
                        </label>
                        <input
                          type="text"
                          placeholder="http://cargo.com/uefbwjfbe"
                          name="shipping"
                          className="input input-bordered"
                          defaultValue={item.shipping}
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Order Status</span>
                        </label>
                        <select
                          defaultValue={''}
                          name="status"
                          className="select select-bordered w-full max-w-xs"
                        >
                          <option value="Received">Order Received</option>
                          <option value="In Cargo">In Cargo</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                      <input type="hidden" value={item._id} name="id" />
                      <div className="form-control mt-6">
                        <button className="btn btn-primary">
                          {' '}
                          {fetcher.state === 'submitting' ? (
                            <span className="loading loading-infinity loading-lg"></span>
                          ) : (
                            'Update'
                          )}{' '}
                        </button>
                      </div>
                    </fetcher.Form>
                  ) : (
                    ''
                  )}
                  <Toaster />
                  <div className="card-actions justify-end">
                    <a
                      href={item.shipping}
                      target="_blank"
                      className="btn m-3 btn-sm btn-info"
                    >
                      See Cargo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </InfiniteScroll>
        ) : (
          'No Data'
        )}{' '}
      </div>
    )
}