/* eslint-disable react/prop-types */

import { NavLink, Form, Link } from 'react-router-dom'
import CartDropdown from './cartDropdown'
import AllCategoriesNavbar from './allCategoriesNavbar'

export default function Navbar({ user, cart }) {
 
  return (
    <>
      <div className="navbar bg-base-100 sticky top-0 z-40 lg:z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                {user.msg ? (
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isActive
                        ? ' bg-primary text-base-100'
                        : isPending
                        ? ' bg-secondary'
                        : ''
                    }
                    to="/login"
                  >
                    Login
                  </NavLink>
                ) : (
                  <NavLink to="/admin/products/">Account</NavLink>
                )}
              </li>
              <li>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive
                      ? ' bg-primary text-base-100'
                      : isPending
                      ? ' bg-secondary'
                      : ''
                  }
                  to="/product"
                >
                  Product
                </NavLink>
              </li>
            </ul>
          </div>
          <Link to={'/'} className="btn btn-ghost text-xl">
            <img width={80} src={'/logo.png'} alt="logo" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              {user.msg ? (
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive
                      ? ' bg-primary text-base-100'
                      : isPending
                      ? ' bg-secondary'
                      : ''
                  }
                  to="/login"
                >
                  Login
                </NavLink>
              ) : (
                <NavLink to="/admin/products/">Account</NavLink>
              )}
            </li>
            <li>
              <NavLink
                className={({ isActive, isPending }) =>
                  isActive
                    ? ' bg-primary text-base-100'
                    : isPending
                    ? ' bg-secondary'
                    : ''
                }
                to="/product/type?name=product"
              >
                Product
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end mx-5">
          <CartDropdown user={user} cart={cart} />
          {user.msg ? (
           ''
          ) : (
            <Form method="post" action="/logout">
              <button className="btn btn-base btn-sm">Logout</button>
            </Form>
          )}
        </div>
      </div>
      <hr />
      <AllCategoriesNavbar />
    </>
  )
}
