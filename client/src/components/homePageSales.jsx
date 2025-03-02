import { useEffect } from 'react'
import { useFetcher } from 'react-router-dom'
import SalesCardClient from './salesCardClient'


// eslint-disable-next-line react/prop-types
export default function HomePageSales() {
  const fetcher = useFetcher()

  useEffect(() => {
    if (fetcher.state === 'idle' && !fetcher.data) {
      fetcher.load('/sales/loader')
    }
  }, [fetcher])

  return fetcher.data ? (
    <div className="carousel carousel-center  w-full space-x-4 p-4">
      {fetcher.data.map((item) => (
        <div key={item._id} className="carousel-item">
         <SalesCardClient item={item}/>
        </div>
      ))}
    </div>
  ) : (
    ''
  )
}
