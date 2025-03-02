/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { Link, Form, useNavigation } from 'react-router-dom'
import { serverUrl } from '../../../server'
export default function ProductCard({ item }) {
    const navigation = useNavigation()
    return (
      <div className="card m-5  bg-base-100 w-96 shadow-xl">
        <figure>
          <img
            className="max-h-80"
            src={serverUrl +'/'+ item.images.split(';')[0]}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {item.name}
            <div className="badge badge-secondary">NEW</div>
          </h2>

          <div className="card-actions flex flex-col justify-end">
            <p> {item.description} </p>
            <div>
              <span
                className={item.onSale ? 'line-through' : 'text-xl font-bold'}
              >
                {item.price.$numberDecimal} TL
              </span>
              {item.onSale ? (
                <span className="text-xl font-bold mx-2">
                  $
                  {(
                    item.price.$numberDecimal -
                    (item.onSale.discount_rate.$numberDecimal / 100) *
                      item.price.$numberDecimal
                  ).toFixed(2)}
                </span>
              ) : (
                ''
              )}
            </div>
            <div className="flex flex-row w-full justify-end m-3">
              <div className="badge badge-outline"> {item.category.name} </div>
              <div className="badge badge-outline"> {item.type} </div> <br />
            </div>

            <div className="flex flex-row w-full justify-between">
              <Link
                to={`/admin/products/edit/${item._id}?type=${item.type}`}
                className="btn btn-warning"
              >
                {navigation.state === 'submitting' ? (
                  <span className="loading loading-infinity loading-md"></span>
                ) : (
                  ' Edit'
                )}
              </Link>
              <Form
                method="post"
                action={`/admin/products/delete/${item._id}?type=${item.type}`}
              >
                <button className="btn btn-error">
                  {navigation.state === 'submitting' ? (
                    <span className="loading loading-infinity loading-md"></span>
                  ) : (
                    ' Delete'
                  )}
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    )
}