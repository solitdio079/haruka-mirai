import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useLoaderData, Outlet, useParams, } from 'react-router-dom'
import { serverUrl } from '../server'
import AnimatedLayout from '../animation/animatedLayout'


const stripePromise = loadStripe(
  'pk_test_51JQRmnCrM5sxvtxSl9OOwQbmMQigtwocNYgG6gGmFEwF6e34pGe5TJ3iA01Cz9EjyD7t1gFdrzSKCtHCf9ETSigq00Ux3sGWkn'
)

export async function loader() {
  try {
    const response = await fetch(`${serverUrl}/cart/`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const cart = await response.json()
    //console.log(cart)
    return cart
  } catch (error) {
    return { error: error.message }
  }
}

export default function Checkout() {
  const { address } = useParams()
  //console.log(address)
  const cart = useLoaderData()
  //console.log(cart)
  //const navigate = useNavigate()

  const [clientSecret, setClientSecret] = useState('')
  const [dpmCheckerLink, setDpmCheckerLink] = useState('')
 console.log(dpmCheckerLink);
  useEffect(() => {
    
    // Create PaymentIntent as soon as the page loads
    fetch(
      `${serverUrl}/stripe/create-payment-intent?addressId=${address}`,
      {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) console.log(data.error)
        console.log('client secret: ' + data.clientSecret)
        setClientSecret(data.clientSecret)
        // [DEV] For demo purposes only
        setDpmCheckerLink(data.dpmCheckerLink)
      })
      .catch((error) => console.log(error))
  }, [])

  const appearance = {
    theme: 'stripe',
  }
  const options = {
    clientSecret,
    appearance,
  }
  
  return (
    <AnimatedLayout>
      <div className="flex flex-col justify-center items-center lg:flex-row">
        {cart.items ? (
          <>
            <div className="card p-5 m-5 bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
              <table className="table table-xs table-pin-rows table-pin-cols">
                <thead>
                  <tr>
                    <td>Name</td>
                    <td>Qty</td>
                    <td>Price</td>
                    <td>Sub</td>
                    <td>Size</td>
                  </tr>
                </thead>
                <tbody>
                  {cart.items
                    ? cart.items.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="avatar">
                                <div className="mask mask-squircle h-12 w-12">
                                  <img
                                    src={serverUrl + '/' + item.image}
                                    alt="Product Image"
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="font-bold">{item.name}</div>
                              </div>
                            </div>
                          </td>
                          <td>{item.qty}</td>

                          <td>
                            {' '}
                            $
                            {parseFloat(
                              item.price.$numberDecimal || item.price
                            ).toFixed()}
                          </td>
                          <td>
                            {' '}
                            $
                            {parseFloat(
                              item.price.$numberDecimal * item.qty ||
                                item.price * item.qty
                            ).toFixed()}
                          </td>
                          <td> {item.size ? item.size : 'None'} </td>
                        </tr>
                      ))
                    : ''}
                </tbody>
              </table>
              <span className="font-semibold text-xl">
                Subtotal: $
                {cart.items
                  ? parseFloat(cart.subtotal.$numberDecimal).toFixed(2)
                  : 0}{' '}
              </span>
            </div>
            <div className="card p-5 m-5 bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
              {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                  <Outlet />
                </Elements>
              )}
            </div>
          </>
        ) : (
          ''
        )}
      </div>
    </AnimatedLayout>
  )
}
