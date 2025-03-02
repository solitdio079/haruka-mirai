import { useEffect } from 'react'
import { useFetcher } from 'react-router-dom'
import ProductCardClient from './productCardClient'

// eslint-disable-next-line react/prop-types
export default function HomePageLast6() {
  const fetcher = useFetcher()

  useEffect(() => {
    if (fetcher.state === 'idle' && !fetcher.data) {
      fetcher.load('/product/last6/loader')
    }
  }, [fetcher])

    return fetcher.data ? (
      <div className=" bg-base-200 p-10 w-full">
        <h1 className="text-4xl m-6 font-bold"> New Products </h1>
       
        <div className="carousel carousel-center w-full space-x-4">
          {fetcher.data.map((item) => (
            <div key={item._id} className="carousel-item">
              <ProductCardClient item={item} />
            </div>
          ))}
        </div>
      </div>
    ) : (
      ''
    )
}
