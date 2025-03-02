import {useEffect} from 'react'
import { useLoaderData, useOutletContext, useNavigate } from 'react-router-dom'
import ProductCard from '../../components/productCard'
import { serverUrl } from '../../../../server'
export async function loader({ request }) {
   
    const url = new URL(request.url)
    const q = url.searchParams.get('q') || ''

    try {
        const response = await fetch(
          `${serverUrl}/admin/product/search?q=${q}`,
          {
            maethod: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        const allProducts = await response.json()
        return [allProducts, q]
        
    } catch (error) {
        return {error: error.message}
    }
} 

export default function ProductSearch() {
    const navigate = useNavigate()
    const [items, q] = useLoaderData()
    console.log(items)
    const [query, setQuery] = useOutletContext()[1]

    useEffect(() => {
        setQuery(q)
        if(query === '') navigate("/admin/products/view")
    }, [q])
    return (
        <div className="flex flex-row flex-wrap">
          {items.length > 0
            ? items.map((item) => (
               <ProductCard key ={item._id} item={item}/>
              ))
            : ''}
        </div>
      
    ) 
}