/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import {useFetcher, useLocation,Link} from 'react-router-dom'
import {FaCartShopping} from 'react-icons/fa6'
import { serverUrl } from '../server'
export default function ProductCardClient({ item }) {
  const location = useLocation()
  const fetcher= useFetcher()
  return (
    <div className="card m-3  bg-base-100 w-60 lg:w-72 shadow-xl">
      <figure>
        <Link to={`/singleProduct/${item._id}`}>
          <img
            className="max-h-80"
            src={serverUrl+'/' + item.images.split(';')[0]}
            alt="Shoes"
          />
        </Link>
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {item.name}
          <div className="badge badge-secondary">{item.type}</div>
        </h2>

        <div className="card-actions flex flex-col justify-end">
          <p> {item.description} </p>
          <div>
            <span
              className={item.onSale ? 'line-through' : 'text-xl font-bold'}
            >
              ${item.price.$numberDecimal}
            </span>
            {item.onSale ? (
              <span className="text-xl font-bold mx-2">
                
                {(
                  item.price.$numberDecimal -
                  (item.onSale.discount_rate.$numberDecimal / 100) *
                    item.price.$numberDecimal
                ).toFixed(2)} TL
              </span>
            ) : (
              ''
            )}
          </div>
          <div className="flex flex-row w-full justify-end my-3">
            <div className="badge badge-outline"> {item.category.name} </div>
          </div>
          <fetcher.Form
            method="post"
            action="/product/addToCart"
            className="w-full"
          >
            <input type="hidden" value={item._id} name="itemId" />
            <input
              type="hidden"
              value={location.pathname}
              name="prevLocation"
            />
            <input type="hidden" value={1} name="qty" />
            <button
              disabled={item.qty <= 0}
              type="submit"
              className="btn btn-primary text-white w-full"
            >
              <FaCartShopping />
              {fetcher.state !== 'submitting' ? (
                'Add To Cart'
              ) : (
                <span className="loading loading-infinity loading-md"></span>
              )}
            </button>
          </fetcher.Form>
        </div>
      </div>
    </div>
  )
}
