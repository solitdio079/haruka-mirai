import {useState} from 'react'
import { Outlet, Form, useSubmit } from 'react-router-dom'

export default function ViewProductRoot() {
  const submit = useSubmit()
  const [type, setType] = useState('Product')
  const [search, setSearch] = useState('')
   
  return (
    <div className="flex flex-col justify-between">
      <div className="navbar bg-base-100">
        <div className="flex-1 navbar-start">
          <a className="btn btn-ghost text-xl">All Products</a>
        </div>
        <div className="flex-2 navbar-center">
          <select
            defaultValue="Product"
            onChange={(e) => setType(e.target.value)}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="Product">Product</option>
            <option value="Furniture">Furniture</option>
            <option value="Clothing">Clothing</option>
          </select>
        </div>
        <div className="flex-none gap-2 navbar-end">
          <Form action={"search"} >
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto"
                onChange={(event) => {
                  setSearch(event.target.value)
                  const isFirstSearch = search == null
                  submit(event.currentTarget.form, {
                    replace: !isFirstSearch,
                  })
                }}
                name="q"
              />
            </div>
          </Form>
        </div>
      </div>
      <Outlet
        context={[
          [type, setType],
          [search, setSearch],
        ]}
      />
    </div>
  )
}
