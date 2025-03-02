import { useContext, useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { UserContext } from '../../UserContext'
export default function SalesRoot() {
  const user = useContext(UserContext)
  const navigate = useNavigate()
  useEffect(() => {
    user.isAdmin ? '' : navigate('/admin')
  })
  return (
    <div className="flex flex-col justify-between">
      <div className="w-full">
        <ul className="flex mb-3 flex-row text-center justify-between menu menu-horizontal min-w-full bg-base-200">
          <li className="mx-auto">
            <NavLink
              to={'/admin/sales/'}
              className={({ isActive, isPending }) =>
                isActive
                  ? 'bg-primary text-base-100'
                  : isPending
                  ? 'bg-secondary'
                  : ''
              }
            >
              Create Sales
            </NavLink>
          </li>
          <li className="mx-auto">
            <NavLink
              to={'/admin/sales/view'}
              className={({ isActive, isPending }) =>
                isActive
                  ? 'bg-primary text-base-100'
                  : isPending
                  ? 'bg-secondary'
                  : ''
              }
            >
              View All Sales
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet className="w-full" />
    </div>
  )
}
