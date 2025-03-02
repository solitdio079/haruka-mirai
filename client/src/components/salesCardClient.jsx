import Countdown from 'react-countdown'
import { Link } from 'react-router-dom'
import { serverUrl } from '../server'
/* eslint-disable react/prop-types */
export default function SalesCardClient({ item }) {
  let today = new Date(Date.now())
  let expiryDate = new Date(item.expires)
  let difference = expiryDate.getTime() - today.getTime()

  return (
    <div className="card bg-base-100 m-1 lg:m-3 image-full  w36 lg:w-96 shadow-xl">
      <figure>
        <img
          src={
            serverUrl+'/' + item.image ||
            serverUrl+'/default.webp'
          }
          className="max-h-96"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-3xl">{item.name}</h2>
        <p className="my-3 text-6xl text-white font-extrabold">
          {item.discount_rate.$numberDecimal}%
        </p>
        <Countdown className="text-4xl" date={Date.now() + difference}>
          <span className="text-2xl">Expired</span>
        </Countdown>

        <div className="card-actions justify-end">
          <div className="flex flex-row justify-end w-full">
            <Link
              to={`/product/sales/${item._id}`}
              className="btn btn-primary m-2"
            >
              Explore
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
