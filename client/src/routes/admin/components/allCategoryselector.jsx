import { useEffect } from 'react'
import { useFetcher } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
export default function AllCategorySelector({ defaultValue, name }) {
  const fetcher = useFetcher()

  useEffect(() => {
    if (fetcher.state === 'idle' && !fetcher.data) {
      fetcher.load('/product/allCategories/loader')
    }
  }, [fetcher])

  return fetcher.data ? (
    <select
      defaultValue={defaultValue || null}
      className="select select-bordered w-full max-w-xs"
      name={name}
    >
      <option value={''}>No Category</option>
      {fetcher.data.map((item) => (
        <option key={item._id} value={item._id}>
          {' '}
          {item.name}{' '}
        </option>
      ))}
    </select>
  ) : (
    ''
  )
}
