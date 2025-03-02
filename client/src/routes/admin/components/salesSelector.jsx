import { useEffect } from 'react'
import { useFetcher } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
export default function SalesSelector({ defaultValue, name }) {
  const fetcher = useFetcher()

  useEffect(() => {
    if (fetcher.state === 'idle' && !fetcher.data) {
      fetcher.load('/admin/sales/loader')
    }
  }, [fetcher])

  return fetcher.data ? (
    <select
      defaultValue={defaultValue || null}
      className="select select-bordered w-full max-w-xs my-3"
      name={name}
    >
      <option value={''}>No sales</option>
      {fetcher.data.map((item) => (
        <option key={item._id} value={item._id}>
          {' '}
          {item.name}{' '} | {item.discount_rate.$numberDecimal}%
        </option>
      ))}
    </select>
  ) : (
    ''
  )
}
