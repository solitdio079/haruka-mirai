import { useEffect } from 'react'
import { useOutletContext, useNavigate, useLoaderData } from 'react-router-dom'
import SalesCard from '../../components/salesCard'
import { serverUrl } from '../../../../server'
export async function loader({request}) {
    const url = new URL(request.url)
    const q = url.searchParams.get('q') || ''
    try {
        const response = await fetch(
          `${serverUrl}/admin/sales/search?q=${q}`,
          {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          }
        )
        const sales = await response.json()
        return [sales, q]
    } catch (error) {
        return {error: error.message}
    }
}

export default function SearchSales() {
    const navigate = useNavigate()
    const [query, setQuery] = useOutletContext()
    const [items, q] = useLoaderData()
     useEffect(() => {
       setQuery(q)
       if (query === '') navigate('/admin/sales/view')
     }, [q])
    return (
      <div className="flex flex-row flex-wrap">
        {' '}
        {items.length > 0
          ? items.map((item) => <SalesCard key={item._id} item={item} />)
          : ''}{' '}
      </div>
    )
}