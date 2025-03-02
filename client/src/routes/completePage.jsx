import { useEffect, useState } from 'react'
import { useStripe } from '@stripe/react-stripe-js'
import { FaCheck, FaX, FaInfo, FaSquareArrowUpRight } from 'react-icons/fa6'
//import './App.css'

const SuccessIcon = (
  <FaCheck/>
)

const ErrorIcon = (
  <FaX/>
)

const InfoIcon = (
  <FaInfo/>
)

const STATUS_CONTENT_MAP = {
  succeeded: {
    text: 'Payment succeeded',
    iconColor: '#30B130',
    icon: SuccessIcon,
  },
  processing: {
    text: 'Your payment is processing.',
    iconColor: '#6D6E78',
    icon: InfoIcon,
  },
  requires_payment_method: {
    text: 'Your payment was not successful, please try again.',
    iconColor: '#DF1B41',
    icon: ErrorIcon,
  },
  default: {
    text: 'Something went wrong, please try again.',
    iconColor: '#DF1B41',
    icon: ErrorIcon,
  },
}

export default function CompletePage() {
  const stripe = useStripe()

  const [status, setStatus] = useState('default')
  const [intentId, setIntentId] = useState(null)

  useEffect(() => {
    if (!stripe) {
      return
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    )

    if (!clientSecret) {
      return
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) {
        return
      }

      setStatus(paymentIntent.status)
      setIntentId(paymentIntent.id)
    })
  }, [stripe])

  return (
    <div
      className="flex flex-col justify-center items-center p-5"
      id="payment-status"
    >
      <div
        className="text-5xl mask mask-circle my-1"
        id="status-icon"
        style={{ backgroundColor: STATUS_CONTENT_MAP[status].iconColor }}
      >
        {STATUS_CONTENT_MAP[status].icon}
      </div>
      <h2 className="text-md my-1" id="status-text">{STATUS_CONTENT_MAP[status].text}</h2>
      {intentId && (
        <div id="details-table">
          <table className="table my-3">
            <tbody>
              <tr>
                <td className="TableLabel">id</td>
                <td id="intent-id" className="TableContent">
                  {intentId}
                </td>
              </tr>
              <tr>
                <td className="TableLabel">status</td>
                <td id="intent-status" className="TableContent">
                  {status}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {intentId && (
        <a
          className="btn btn-info p-2 w-full my-3"
          href={`https://dashboard.stripe.com/payments/${intentId}`}
          id="view-details"
          rel="noopener noreferrer"
          target="_blank"
        >
          View details
          <FaSquareArrowUpRight />
        </a>
      )}
    </div>
  )
}
