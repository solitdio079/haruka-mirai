import { useState } from "react"
import { Form, useSubmit, Outlet } from "react-router-dom"


export default function PrimeCategories() {
  const [query, setQuery] = useState(null)
  const submit = useSubmit()
   /*const searching =
     navigation.location &&
     new URLSearchParams(navigation.location.search).has('q')*/

    //const primeCategories = useLoaderData()
    return (
      <div className="flex flex-col justify-between">
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">All Categories</a>
          </div>
          <div className="flex-none gap-2">
            <Form action={"search"} id="search-form" role="search">
              <div className="form-control">
                <input
                  id="q"
                  type="text"
                  placeholder="Search"
                  className="input input-bordered w-24 md:w-auto"
                  defaultValue={query ? query:''}
                  name="q"
                  onChange={(event) => {
                    setQuery(event.target.value)
                    const isFirstSearch = query == null
                    submit(event.currentTarget.form, {
                      replace: !isFirstSearch
                    })
                  }}
                />
              </div>
            </Form>
          </div>
        </div>
        
          <Outlet context={[query,setQuery]} />
      </div>
    )
}