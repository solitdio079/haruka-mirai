import { useEffect } from "react"
import { useFetcher, NavLink  } from "react-router-dom"

export default function AllCategoriesVertical() {
    const fetcher = useFetcher() 
    useEffect(() => {
      if (fetcher.state === 'idle' && !fetcher.data) {
          fetcher.load('/product/allCategories/loader')
      }
    }, [fetcher])
    return (
        <ul className="menu bg-base-200 rounded-box w-56 my-3">
          
            {
                fetcher.data ? fetcher.data.map(item => {
                   
                    if (!item.parent_id) {
                       
                        const children = fetcher.data.filter(child => child.parent_id === item._id)
                         //console.log(children)
                        if(children.length > 0){
                          return (
                            <li key={item._id}>
                              {' '}
                              <NavLink
                                className={({ isActive, isPending }) =>
                                  isActive
                                    ? ' bg-primary text-base-100'
                                    : isPending
                                    ? ' bg-secondary'
                                    : ''
                                }
                                to={`/product/categoryProducts/${item._id}`}
                              >
                                {' '}
                                {item.name}{' '}
                              </NavLink>{' '}
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
                            </li>
                          )
                        }
                        return (
                          <li key={item._id}>
                            <NavLink
                              className={({ isActive, isPending }) =>
                                isActive
                                  ? ' bg-primary text-base-100'
                                  : isPending
                                  ? ' bg-secondary'
                                  : ''
                              }
                              to={`/product/categoryProducts/${item._id}`}
                             end>
                              {' '}
                              {item.name}{' '}
                            </NavLink>
                          </li>
                        )
                    }
                }): <li>No Categories</li>
        }
       
      </ul>
    )
}