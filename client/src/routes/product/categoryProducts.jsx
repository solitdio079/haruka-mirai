import {useEffect, useState, useRef} from 'react' 
import { useLoaderData, useParams, useLocation, useOutletContext, useNavigation } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import ProductCardClient from '../../components/productCardClient'
import { serverUrl } from '../../server'
export async function loader({ params, request }) {
  
  const { category_id } = params
  const url = new URL(request.url)
  const price = url.searchParams.get("price")
    
    try {
        const response = await fetch(
          `${serverUrl}/product/${category_id}?cursor=&limit=5&price=${
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
        const data = await response.json()
        return [data, price]
    } catch (error) {
        return {error: error.message}
    }
    
}
//THIS IS THE CUSTOM HOOK

const usePrevLocation = (location) => {

const prevLocRef = useRef(location)

useEffect(()=>{

prevLocRef.current = location

},[location])

return prevLocRef.current

}



export default function CategoryProducts() {
  const navigation = useNavigation()
  const location = useLocation()
  const [price, setPrice] = useOutletContext()[0]
  const prevLocation = usePrevLocation(location)
    const {category_id} = useParams()
    const [products, initialPrice] = useLoaderData()
   const [items, setItems] = useState(products)
   const itemIds = items.map(item => item._id).sort()
    const [hasMore, setHasMore] = useState(true)
    const [cursor, setCursor] = useState(null)


  useEffect(() => {
    
    if(!price) setPrice(initialPrice)
    //console.log(prevLocation, location)
    if (
      prevLocation !== location
    ) {
      setItems([])
      fetchMoreData(null, price)
    } else {
      console.log('same', cursor)
      if (cursor) fetchMoreData(cursor, price)
    }
   
    }, [cursor, location,price])
    

    const fetchMoreData = async (cursor, price) => {
        try {
              const response = await fetch(
                `${serverUrl}/product/${category_id}?cursor=${
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
            const data = await response.json()
            setItems(prev => [...prev, ...data])
            data.length > 0 ? setHasMore(true): setHasMore(false)
            
         } catch (error) {
            console.log(error)
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
          {' '}
          {items.length ? (
            <div className="w-full">
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
            </div>
          ) : (
            'No Products'
          )}
        </>
      )}{' '}
    </>
  )
    
}