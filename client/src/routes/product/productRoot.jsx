import {useState} from 'react'
import { Form, useSubmit, Outlet, useLocation } from 'react-router-dom'
import AllCategoriesVertical from '../../components/allCategoriesVertical'
//import SalesSelector from '../admin/components/salesSelector'
import SalesSelectorClient from '../../components/salesSelectorClient'
import AnimatedLayout from '../../animation/animatedLayout'
export default function ProductRootClient() {
  const submit = useSubmit()
  const [query, setQuery] = useState(null)
  const [sortBy, setSortBy] = useState()
  const location = useLocation()

  const name = location.search.includes("name") ? location.search.split("=")[1].split("&")[0] : null
  const q = location.search.includes('?q=')
    ? location.search.split('=')[1].split('&')[0]
    : null
  return (
    <AnimatedLayout>
      <div className="flex flex-col lg:flex-row">
        <div className="drawer lg:drawer-open m-5 w-96">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-start justify-start mx-5">
            {/* Page content here */}
            <label
              htmlFor="my-drawer-2"
              className="btn btn-sm btn-primary drawer-button lg:hidden"
            >
              Filter
            </label>
          </div>
          <div className="drawer-side z-40">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              <li>
                <h2 className="menu-title">Type</h2>
                <ul>
                  <Form method="get" action="/product/type">
                    <li className="flex flex-row">
                      <a>
                        <input
                          type="radio"
                          name="name"
                          className="radio checked:bg-blue-500"
                          value={'Product'}
                          onChange={(e) => {
                            e.target.checked ? submit(e.currentTarget.form) : ''
                          }}
                        />
                        Product
                      </a>
                    </li>
                    <li>
                      <a>
                        <input
                          type="radio"
                          name="name"
                          className="radio checked:bg-blue-500"
                          value={'clothing'}
                          onChange={(e) => {
                            e.target.checked ? submit(e.currentTarget.form) : ''
                          }}
                        />
                        Clothing
                      </a>
                    </li>
                    <li>
                      <a>
                        <input
                          type="radio"
                          name="name"
                          className="radio checked:bg-blue-500"
                          value={'furniture'}
                          onChange={(e) => {
                            e.target.checked ? submit(e.currentTarget.form) : ''
                          }}
                        />
                        Furnitures
                      </a>
                    </li>
                  </Form>
                </ul>
              </li>
              <li>
                {' '}
                <SalesSelectorClient />
              </li>
              <AllCategoriesVertical />
            </ul>
          </div>
        </div>
        <div className="flex flex-col">
          <ul className="menu bg-base-200 menu-horizontal my-5 w-full">
            <li className="mx-2">
              {' '}
              <Form action={'/product/search'}>
                <div className="form-control">
                  <input
                    type="text"
                    name="q"
                    defaultValue={query ? query : ''}
                    placeholder="Search"
                    className="input input-bordered w-auto"
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
            </li>

            <li className="mx-2">
              <Form action={location.pathname}>
                <div className="form-control">
                  {q ? <input type="hidden" name="q" value={q} /> : ''}
                  {name ? <input type="hidden" name="name" value={name} /> : ''}
                  <select
                    name="price"
                    onChange={(e) => {
                      setSortBy(e.target.value)
                      submit(e.currentTarget.form)
                    }}
                    className="select select-bordered w-full max-w-xs"
                    defaultValue={sortBy || ''}
                  >
                    <option value={''}>Sort by (None)</option>
                    <option value="asc">Price Asc</option>
                    <option value="desc">Price Desc</option>
                  </select>
                </div>
              </Form>
            </li>
          </ul>
          <Outlet
            context={[
              [sortBy, setSortBy],
              [query, setQuery],
            ]}
          />
        </div>
      </div>
    </AnimatedLayout>
  )
}