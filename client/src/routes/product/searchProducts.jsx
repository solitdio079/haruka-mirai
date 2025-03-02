import { useState, useEffect, useRef } from 'react'
import { useLoaderData, useLocation, useNavigate, useOutletContext, useNavigation } from 'react-router-dom'
import ProductCardClient from '../../components/productCardClient'
import InfiniteScroll from 'react-infinite-scroll-component'
import { serverUrl } from '../../server'
export async function loader({ request }) {
  const url = new URL(request.url)

  const q = url.searchParams.get('q')
  const price = url.searchParams.get('price')
  try {
    const response = await fetch(
      `${serverUrl}/product/search?q=${q}&cursor=&limit=5&price=${
        price || ''
      }`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const items = await response.json()
    console.log(items)
    return [items, q, price]
  } catch (error) {
    return { error: error.message }
  }
}
//THIS IS THE CUSTOM HOOK

const usePrevLocation = (location) => {
  const prevLocRef = useRef(location)

  useEffect(() => {
    prevLocRef.current = location
  }, [location])

  return prevLocRef.current
}

export default function SearchProductsClient() {
  const navigation = useNavigation()
     const [price, setPrice] = useOutletContext()[0]
  const location = useLocation()
  const prevLocation = usePrevLocation(location)
  const [initialItems, q, initPrice] = useLoaderData()
 
  const [query, setQuery] = useOutletContext()[1]
  const [cursor, setCursor] = useState(null)
  const [items, setItems] = useState(initialItems)
  const itemIds = items.map((item) => item._id).sort()
    const [hasMore, setHasMore] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
     // console.log(price)
     
     if (!price) setPrice(initPrice)
      setQuery(q)
      if (query === '') navigate('/product/type?name=product')
    //console.log(prevLocation, location)
        if (prevLocation !== location) {
       
      setItems([])
      fetchMoreData(null,price)
    } else {
      
      //console.log('same', cursor)
      if (cursor) fetchMoreData(cursor,price)
    }
  }, [cursor, location, price, q])

  const fetchMoreData = async (cursor,price) => {
    try {
      const response = await fetch(
        `${serverUrl}/product/search?q=${q}&cursor=${
          cursor || ''
        }&limit=5&price=${price || ''}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const newItems = await response.json()
      setItems((prev) => [...prev, ...newItems])
      newItems.length > 0 ? setHasMore(true) : setHasMore(false)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      {navigation.state === 'loading' ? (
        <div className="flex justify-between flex-row flex-wrap w-full">
          <div className="flex w-52 flex-col m-2 gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
          <div className="flex w-52 flex-col m-2 gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
          <div className="flex w-52 flex-col m-2 gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        </div>
      ) : (
        <>
          {items.length > 0 ? (
            <InfiniteScroll
              className="w-full"
              dataLength={items.length}
              hasMore={hasMore}
              next={() => setCursor(itemIds[itemIds.length - 1])}
              loader={
                <span className="loading loading-infinity loading-lg"></span>
              }
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              <div className="flex w-full flex-row items-start flex-wrap lg:p-5 lg:m-5">
                {items.map((item) => (
                  <ProductCardClient key={item._id} item={item} />
                ))}
              </div>
            </InfiniteScroll>
          ) : (
            'No Product Found!'
          )}
        </>
      )}{' '}
    </>
  )
}
