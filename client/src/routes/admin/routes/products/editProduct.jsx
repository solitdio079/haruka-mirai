import {useEffect, useState} from 'react'
import { useFetcher, useLoaderData, redirect } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import AllCategorySelector from '../../components/allCategoryselector'
import ProductTypeSelector from '../../components/productTypeSelector'
import SalesSelector from '../../components/salesSelector'
import { serverUrl } from '../../../../server'
export async function loader({ request,params }) {
    const {id} = params
    const url = new URL(request.url)
    const type = url.searchParams.get('type') || 'product'

    //console.log(`http:localhost:5500/admin/product/${id}?type=${type}`)

    try {
        const response = await fetch(
          `${serverUrl}/admin/product/${id}?type=${type}`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        const product = await response.json()
        //console.log(product)
        return product
    } catch (error) {
        return {error: error.message}
    }
}

export async function action({ request, params }) {
     const {id} = params
    const formData = await request.formData()

    const url = `${serverUrl}/admin/product/${id}`
    let methodName = 'PUT'
    let bodyObj = formData
    let headersObj = {}

    // Setting the request options for there is no image with the request
    if (formData.get('images').name === '') {
        methodName = 'PATCH'
        bodyObj = JSON.stringify(Object.fromEntries(formData))
        headersObj = {'Content-Type': 'application/json'}
        
       
    }
    try {
        const data = await SendRequest(url, methodName, bodyObj, headersObj)
        return data
    } catch (error) {
         return { error: error.message }
    }
   
     
   
}
async function SendRequest(url,methodName,bodyObj, headersObj) {
     try {
        const response = await fetch(url, {
          method: methodName,
          credentials: 'include',
          headers: headersObj,
          body: bodyObj,
        })
        const data = await response.json()
        return data
      } catch (error) {
        return { error: error.message }
      }
    
}

export default function EditProduct() {
    const product = useLoaderData()
     const details =
       product.type === 'furniture'
         ? {
             color: product.color,
             material: product.material,
             width: product.width,
             length: product.length,
           }
         : product.type === 'clothing' ? {color:product.color, size: product.size}:''
     const fetcher = useFetcher()
     const [type, setType] = useState(product.type)
     useEffect(() => {
       const toastOptions = {
         duration: 5000,
         id: Math.round(Math.random() * 1e9),
       }
       toast.dismiss()

       fetcher.data
         ? fetcher.data.error
           ? toast.error(fetcher.data.error, toastOptions)
           : toast.success(fetcher.data.msg, toastOptions)
           : ''
        
        redirect('/admin/products/view')
     }, [fetcher])

     return (
       <div className="card my-5 mx-auto bg-base-100 w-full max-w-sm shrink-0 ">
         <fetcher.Form
           method="post"
           className="card-body"
           encType="multipart/form-data"
         >
           <div className="form-control">
             <label className="label">
               <span className="label-text">Name</span>
             </label>
             <input
               type="text"
               placeholder="Name"
               className="input input-bordered"
               name="name"
               defaultValue={product.name}
               required
             />
           </div>
           <div className="form-control">
             <label className="label">
               <span className="label-text">Price</span>
             </label>
             <input
               type="number"
               step=".01"
               min="0"
               placeholder="0.00"
               className="input input-bordered"
               name="price"
               defaultValue={product.price['$numberDecimal']}
               required
             />
           </div>
           <div className="form-control">
             <label className="label">
               <span className="label-text">Description</span>
             </label>
             <textarea
               placeholder="Desc"
               className="textarea textarea-bordered textarea-lg w-full max-w-xs"
               name="description"
               defaultValue={product.description}
               required
             ></textarea>
           </div>

           <div className="form-control">
             <label className="label">
               <span className="label-text">Quantity</span>
             </label>
             <input
               type="number"
               step="1"
               min="0"
               placeholder="0"
               className="input input-bordered"
               name="qty"
               defaultValue={product.qty}
               required
             />
           </div>
           <div className="form-control mb-5">
             <label className="label">
               <span className="label-text">Images</span>
             </label>
             <input
               type="file"
               className="file-input file-input-bordered file-input-primary w-full max-w-xs"
               name="images"
               multiple
               accept="image/png, image/jpeg"
             />
           </div>
           <div className="form-control mb-5">
             <label className="label">
               <span className="label-text">Type</span>
             </label>
             <select
               name="type"
               onChange={(e) => setType(e.target.value)}
               defaultValue={product.type}
               className="select select-bordered w-full max-w-xs"
             >
               <option value="Product">Product</option>
               <option value="furniture">Furniture</option>
               <option value="clothing">Clothing</option>
             </select>
           </div>
           <ProductTypeSelector type={type} dValues={details} />
           <AllCategorySelector
             defaultValue={product.category.category_id}
             name="category"
           />
           <SalesSelector
             defaultValue={product.onSale ? product.onSale.sales_id : null}
             name="onSale"
           />
           <div className="form-control">
             <label className="label">
               <span className="label-text">Additional Infos</span>
             </label>
             <textarea
               placeholder="Desc"
               className="textarea textarea-bordered textarea-lg w-full max-w-xs"
               name="additional_info"
             >
               {product.additional_info}
             </textarea>
           </div>
           <Toaster />
           <div className="form-control mt-6">
             <button className="btn btn-warning">
               {' '}
               {fetcher.state === 'submitting' ? (
                 <span className="loading loading-infinity loading-md"></span>
               ) : (
                 'Edit'
               )}
             </button>
           </div>
         </fetcher.Form>
       </div>
     )
    
    
}