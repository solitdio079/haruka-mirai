import { useState } from 'react'

import { Outlet, useSubmit, Form } from 'react-router-dom'
export default function ViewSalesRoot() {
  const [query, setQuery] = useState(null)
  const submit = useSubmit()
    return (
      <div className="flex flex-col justify-between">
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">All Sales</a>
          </div>
          <div className="flex-none gap-2">
            <Form action={'search'} id="search-form" role="search">
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Search"
                  className="input input-bordered w-24 md:w-auto"
                  defaultValue={query ? query : ''}
                  name="q"
                  onChange={(event) => {
                    setQuery(event.target.value)
                    const isFirstSearch = query == null
                    submit(event.currentTarget.form, {
                      replace: !isFirstSearch,
                    })
                  }}
                />
              </div>
            </Form>
          </div>
        </div>
        <Outlet context={[query, setQuery]} />
      </div>
    )
}