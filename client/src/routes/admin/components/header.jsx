import { useContext } from 'react'
import {
  FaChartArea,
  FaStore,
  FaTable,
  FaBars,
  FaBagShopping,
  FaTags,
  FaUser
} from 'react-icons/fa6'
import { UserContext } from '../UserContext'
import { NavLink, Link , Form} from 'react-router-dom'

export default function AdminHeader() {
  const user = useContext(UserContext)
    return (
      <div className="navbar bg-base-100 px-2  lg:px-10">
        <div className="flex-none">
          <div className="drawer lg:hidden">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label
                htmlFor="my-drawer"
                className="btn btn-square btn-ghost drawer-button"
              >
                <FaBars className="h-5 w-5" />
              </label>
            </div>
            <div className="drawer-side z-40">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu bg-base-200 min-h-full w-56">
                <li>
                  <NavLink
                    to={'/admin/dashboard'}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? 'text-lg bg-primary text-base-100'
                        : isPending
                        ? 'text-lg bg-secondary'
                        : ''
                    }
                  >
                    <FaChartArea className="h-5 w-5" />
                    Dashboard
                  </NavLink>
                </li>
                {user.isAdmin ? (
                  <>
                    <li>
                      <NavLink
                        to={'/admin/products'}
                        className={({ isActive, isPending }) =>
                          isActive
                            ? 'text-lg bg-primary text-base-100'
                            : isPending
                            ? 'text-lg bg-secondary'
                            : ''
                        }
                      >
                        <FaStore className="h-5 w-5" />
                        Ürünler
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={'/admin/categories'}
                        className={({ isActive, isPending }) =>
                          isActive
                            ? 'text-lg bg-primary text-base-100'
                            : isPending
                            ? 'text-lg bg-secondary'
                            : ''
                        }
                      >
                        <FaTable className="h-5 w-5" />
                        Kategori
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={'/admin/sales'}
                        className={({ isActive, isPending }) =>
                          isActive
                            ? 'text-lg bg-primary text-base-100'
                            : isPending
                            ? 'text-lg bg-secondary'
                            : ''
                        }
                      >
                        <FaTags className="h-5 w-5" />
                        İndirim
                      </NavLink>
                    </li>
                  </>
                ) : (
                  ''
                )}
                <li>
                  <NavLink
                    to={'/admin/profile'}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? 'text-lg bg-primary text-base-100'
                        : isPending
                        ? 'text-lg bg-secondary'
                        : ''
                    }
                  >
                    <FaUser className="h-5 w-5" />
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={'/admin/orders'}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? 'text-lg bg-primary text-base-100'
                        : isPending
                        ? 'text-lg bg-secondary'
                        : ''
                    }
                  >
                    <FaBagShopping className="h-5 w-5" />
                    Sipariş
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            <img src={'/logo.png'} width={80} alt="logo" />
          </Link>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <Form method="post" action="/logout">
                  <button className="btn btn-base btn-sm">Logout</button>
                </Form>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
}