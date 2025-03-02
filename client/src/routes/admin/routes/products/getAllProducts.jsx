import { useEffect, useState } from 'react'
import { useLoaderData, useOutletContext } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import ProductCard from '../../components/productCard'
import { serverUrl } from '../../../../server'
export async function loader() {
    try {
        const response = await fetch(
          `${serverUrl}/admin/product/?cursor=&limit=${5}&type=Product`,
          {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          }
        )
        const allProducts = await response.json()
        console.log(allProducts);
        return allProducts
    } catch (error) {
        return {error: error.message}
    }
}

export default function GetAllProducts() {
    const firstItems = useLoaderData()
    const [type, setType] = useOutletContext()[0]
    const [items, setItems] = useState(firstItems)
    const itemsIds = items.map((item) => item._id).sort()
    const [cursor, setCursor] = useState(null)
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
            setType(type)
            cursor ? fetchMoreData() : ''
    }, [cursor,type])

    const fetchMoreData = async () => {
        try {
            const response = await fetch(
              `${serverUrl}/admin/product/?cursor=${
                cursor || ''
              }&limit=${5}&type=${type}`,
              {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
              }
            )
            const moreItems = await response.json()
            console.log(moreItems);
            setItems((prevItems) => [...prevItems, ...moreItems])
           
            moreItems.length > 0 ? setHasMore(true): setHasMore(false)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
      {items.length > 0 ? (
        <InfiniteScroll
          dataLength={items.length || 0}
          next={() => setCursor(itemsIds[itemsIds.length - 1])}
          hasMore={hasMore}
          loader={<span className="loading loading-infinity loading-lg"></span>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="flex flex-row flex-wrap">
            {items.map((item) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        'No Products!'
      )}
    </div>
  )
}