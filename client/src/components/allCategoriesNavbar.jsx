import { useEffect } from 'react'
import { useFetcher, NavLink } from 'react-router-dom'

export default function AllCategoriesNavbar() {
  const fetcher = useFetcher()
  useEffect(() => {
    if (fetcher.state === 'idle' && !fetcher.data) {
      fetcher.load('/product/allCategories/loader')
    }
  }, [fetcher])
  return (
    <div className="carousel flex flex-row items-center justify-center carousel-center menu menu-horizontal  w-full space-x-4 p-4">
      {fetcher.data
        ? fetcher.data.map((item) => {
            if (!item.parent_id) {
              const children = fetcher.data.filter(
                (child) => child.parent_id === item._id
              )
              if (children.length > 0) {
                return (
                  <li key={item._id} className="carousel-item">
                    <details>
                      <summary>
                        <NavLink
                          className={({ isActive, isPending }) =>
                            isActive
                              ? 'w-full p-2 rounded bg-primary text-base-100'
                              : isPending
                              ? 'w-full p-2 rounded bg-secondary'
                              : ''
                          }
                          to={`/product/categoryProducts/${item._id}`}
                        >
                          {' '}
                          {item.name}{' '}
                        </NavLink>{' '}
                      </summary>
                      <ul>
                        {children.map((child) => (
                          <li key={child._id}>
                            <NavLink
                              className={({ isActive, isPending }) =>
                                isActive
                                  ? ' bg-primary text-base-100'
                                  : isPending
                                  ? ' bg-secondary'
                                  : ''
                              }
                              to={`/product/categoryProducts/${child._id}`}
                            >
                              {child.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                )
              }
              return (
                <li className="carousel-item" key={item._id}>
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isActive
                        ? ' bg-primary text-base-100'
                        : isPending
                        ? ' bg-secondary'
                        : ''
                    }
                    to={`/product/categoryProducts/${item._id}`}
                    end
                  >
                    {' '}
                    {item.name}{' '}
                  </NavLink>
                </li>
              )
            }
          })
        : 'No Categories'}
    </div>
  )
}
