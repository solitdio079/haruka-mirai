import {useState, useEffect} from 'react'
import { useLoaderData } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import SalesCard from '../../components/salesCard';
import { serverUrl } from '../../../../server';
export async function loader() {
    try {
        const response = await fetch(
          `${serverUrl}/admin/sales/infinity?cursor=&limit=5`,
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
        return {error: error.message}
    }
}
export default function InfinitySales() {
    const primaryData = useLoaderData()
    const [items, setItems] = useState(primaryData)
    const [cursor, setCursor] = useState(null)
    const [hasMore, setHasMore] = useState(true)


    useEffect(() => {
        if (cursor) fetchMoreData()
    }, [cursor])
    
    const fetchMoreData = async () => {
        try {
            const response = await fetch(
              `${serverUrl}/admin/sales/infinity?cursor=${
                cursor || ''
              }&limit=5`,
              {
                method: 'GET',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            )
            const newData = await response.json()
            setItems((prevItems) => [...prevItems, ...newData])
            newData.length > 0 ? setHasMore(true): setHasMore(false)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div> {items.length > 0 ? <InfiniteScroll
          dataLength={items.length || 0}
          next={() => setCursor(items[items.length - 1]._id)}
          hasMore={hasMore}
          loader={<span className="loading loading-infinity loading-lg"></span>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }>
            <div className="flex flex-row flex-wrap">
                {items.map(item => <SalesCard key={item._id} item={item}/>)}
             </div>

        </InfiniteScroll>: 
        'No Sales'} </div>
    )

    
}