
import {useEffect, useState} from 'react'
import {Form, useNavigation, Link, useLoaderData } from "react-router-dom"
import { FaX, FaPen } from "react-icons/fa6"
import InfiniteScroll from 'react-infinite-scroll-component'
import { serverUrl } from '../../../../server'

export async function loader() {
  try {
    const response = await fetch(
      `${serverUrl}/admin/category/infiniteScroll?cursor=&limit=${5}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const primeCategories = await response.json()
    //console.log(primeCategories.data)
    return primeCategories
  } catch (error) {
    return { error: error.message }
  }
}


export default function  InfinitePrimes(){
 const primes = useLoaderData()
  const [items, setItems] = useState(primes)
  const [cursor, setCursor] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  
  
  const navigation = useNavigation()
   /*const searching =
     navigation.location &&
     new URLSearchParams(navigation.location.search).has('q')*/
  
  useEffect(() => {
   
    //document.getElementById('q').value = q
   
    cursor ? fetchMoreData(): ''
  }, [cursor])
     const fetchMoreData = async () => {
       try {
         const response = await fetch(
           `${serverUrl}/admin/category/infiniteScroll?cursor=${
             cursor || ''
           }&limit=${5}`,
           {
             method: 'GET',
             credentials: 'include',
             headers: {
               'Content-Type': 'application/json',
             },
           }
         )
         const newData = await response.json()
         console.log(JSON.stringify(newData))
         setItems((prevItems) => [...new Set([...prevItems, ...newData])])
         newData.length > 0 ? setHasMore(true) : setHasMore(false)
         //newData.length > 0 ? setCursor(newData[newData.length-1]._id):''
       } catch (error) {
         console.log(error)
       }
     }
    return (
      <InfiniteScroll
        dataLength={items.length}
        next={() => setCursor(items[items.length - 1]._id)}
        hasMore={hasMore}
        loader={<span className="loading loading-infinity loading-lg"></span>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="flex flex-row flex-wrap">
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item._id}
                className="card bg-base-100 image-full w-96 m-3 shadow-xl"
              >
                <figure>
                  <img
                    src={
                      'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'
                    }
                    alt="Shoes"
                  />
                </figure>
                <div className="card-body">
                  <div className="card-actions justify-end">
                    <Link
                      to={`/admin/categories/subs/${item._id}`}
                      className="btn btn-info btn-rounded border-none btn-sm"
                    >
                      View Subs
                    </Link>
                    <Link
                      to={`/admin/categories/edit/${item._id}`}
                      className="btn bg-yellow-500 btn-rounded border-none btn-sm"
                    >
                      <FaPen className="h-6 w-6 text-white" />
                    </Link>

                    <Form
                      method="post"
                      action={`/admin/categories/delete/${item._id}`}
                      /*onSubmit={(event) => {
                          if (
                            !confirm(
                              'Please confirm you want to delete this record.'
                            )
                          ) {
                            event.preventDefault()
                          }
                        }}*/
                    >
                      <button className="btn bg-red-700 btn-rounded border-none btn-sm">
                        {navigation.state === 'submitting' ? (
                          <span className="loading loading-infinity loading-sm"></span>
                        ) : (
                          <FaX className="h-6 w-6 text-white" />
                        )}
                      </button>
                    </Form>
                  </div>
                  <p className="text-white text-4xl">{item.name}</p>
                </div>
              </div>
            ))
          ) : 
           ''
          }
        </div>
      </InfiniteScroll>
    )
}