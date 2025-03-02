import { useEffect } from 'react'
import { useFetcher, NavLink } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
export default function SalesSelectorClient() {
  const fetcher = useFetcher()

  useEffect(() => {
    if (fetcher.state === 'idle' && !fetcher.data) {
      fetcher.load('/sales/loader')
    }
  }, [fetcher])

  return fetcher.data ? (
    <ul className="menu bg-base-200 rounded-box w-56">
      <li>
        <h2 className="menu-title">Sales</h2>{' '}
      </li>

      {fetcher.data.map((item) => (
        <li key={item._id}>
          <NavLink
            key={item._id}
            className={({ isActive, isPending }) =>
              isActive
                ? ' bg-primary text-base-100'
                : isPending
                ? ' bg-secondary'
                : ''
            }
            to={`/product/sales/${item._id}`}
            end
          >
            {' '}
            {item.name} | {item.discount_rate.$numberDecimal}
          </NavLink>
        </li>
      ))}
    </ul>
  ) : (
    ''
  )
}
