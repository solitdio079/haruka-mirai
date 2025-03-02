import { useEffect, useState } from 'react'
import { useFetcher} from 'react-router-dom'
import toast, {Toaster} from 'react-hot-toast'

import ProductTypeSelector from '../../components/productTypeSelector'
import SalesSelector from '../../components/salesSelector'
import AllCategorySelector from '../../components/allCategoryselector'
import { serverUrl } from '../../../../server'

export async function action({request}) {
  const formData = await request.formData()
  //console.log(JSON.stringify(Object.fromEntries(formData)));
   

    try {
        const response = await fetch(
          serverUrl+'/admin/product/',
          {
            method: 'POST',
            credentials: 'include',
            body: formData,
          }
        )

        const data = await response.json()
        return data
        
    } catch (error) {
        return {error: error.message}
    }
}

export default function CreateProduct() {
  const fetcher = useFetcher()
 // const navigate = useNavigate()
   const [type, setType] = useState('')
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
      //navigate('/admin/products/view')
    },[fetcher])
   
    
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
              required
            />
          </div>
          <div className="form-control mb-5">
            <label className="label">
              <span className="label-text">Type</span>
            </label>
            <select
              name="type"
              onChange={(e) => setType(e.target.value)}
              defaultValue="product"
              className="select select-bordered w-full max-w-xs"
            >
              <option value="product" disabled>
                Product
              </option>
              <option value="furniture">Furniture</option>
              <option value="clothing">Clothing</option>
            </select>
          </div>
          <ProductTypeSelector type={type} />
          <AllCategorySelector name="category" />
          <SalesSelector name="onSale" />
          <div className="form-control">
            <label className="label">
              <span className="label-text">Additional Infos</span>
            </label>
            <textarea
              placeholder="Desc"
              className="textarea textarea-bordered textarea-lg w-full max-w-xs"
              name="additional_info"
            ></textarea>
          </div>
          <Toaster />
          <div className="form-control mt-6">
            <button className="btn btn-primary">
              {' '}
              {fetcher.state === 'submitting' ? (
                <span className="loading loading-infinity loading-md"></span>
              ) : (
                'Create'
              )}
            </button>
          </div>
        </fetcher.Form>
      </div>
    )
}