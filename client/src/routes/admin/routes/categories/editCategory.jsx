import { useEffect } from 'react'
import { useFetcher, useLoaderData } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import PrimeCategorySelector from '../../components/primeCategorySelector'
import { serverUrl } from '../../../../server'

export async function loader({ params }) {
    const { id } = params
    
    try {

        const response = await fetch(
          `${serverUrl}/admin/category/${id}`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        const category = await response.json()
        return category
        
    } catch (error) {
        return {error: error.message}
    }
}

export async function action({ request, params }) {
    const formData = await request.formData()
    const fileName = formData.get('image').name
    const bodyObject = Object.fromEntries(formData)
    console.log(bodyObject)
    const { id } = params
    const url = `${serverUrl}/admin/category/${id}`
    const method = fileName.trim() === '' ? 'PATCH' : 'PUT'
    const finalBody = fileName.trim() === '' ? JSON.stringify(bodyObject) : formData
     const headersContent = fileName.trim() === '' ? {'Content-Type':'application/json'} : {}
    console.log(finalBody);

    try {
        const response = await fetch(url, {
            method: method,
            credentials: 'include',
            headers: headersContent,
            body: finalBody
        })
        const category = await response.json()
        return category
        
    } catch (error) {
        return {error: error.message}
    }

    
}

export default function  EditCategory(){
    const category = useLoaderData()
    const fetcher = useFetcher()

     useEffect(() => {
       const toastOptions = {
         duration: 5000,
         id: Math.round(Math.random() * 1e9),
       }
       toast.dismiss()

       fetcher.data
         ? fetcher.data.error
           ? toast.error(fetcher.data.error, toastOptions)
           : toast.success('Category modified with success!', toastOptions)
         : ''
     }, [fetcher])
    
 return (
   <>
     <div className="card my-5 mx-auto bg-base-100 w-full max-w-sm shrink-0 ">
       {category.image ? (
         <div className="avatar">
           <div className="w-24 rounded">
             <img src={serverUrl + '/' + category.image} />
           </div>
         </div>
       ) : (
         ''
       )}

       <fetcher.Form
         method="post"
         className="card-body"
         encType="multipart/form-data"
       >
         <div className="form-control">
           <label className="label">
             <span className="label-text">Name *</span>
           </label>
           <input
             type="name"
             placeholder="Category Name"
             className="input input-bordered"
             defaultValue={category.name}
             name="name"
             required
           />
         </div>
         <div className="form-control">
           <label className="label">
             <span className="label-text">Image</span>
           </label>
           <input
             type="file"
             className="file-input file-input-bordered w-full max-w-xs"
             name="image"
           />
         </div>
         <div className="form-control">
           <label className="label">
             <span className="label-text">Parent</span>
           </label>
           <PrimeCategorySelector
             defaultValue={category.parent_id}
             name="parent_id"
           />
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
   </>
 )
}