import {useState, useEffect} from 'react'
import AdminHeader from "./components/header";
import {Outlet, useNavigate, NavLink} from 'react-router-dom'
import { FaChartArea, FaStore, FaTable, FaBagShopping, FaTags, FaUser} from 'react-icons/fa6'
import { UserContext } from './UserContext';
import { serverUrl } from '../../server';
export default function AdminRoot() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const isConnected = Boolean(user)
    useEffect(() => {
        async function getUser() {
            try {
                 const response = await fetch(
                   serverUrl+'/auth/login/status',
                   {
                     method: 'GET',
                     credentials: 'include',
                     headers: {
                       'Content-Type': 'application/json',
                     },
                   }
                 )
                const potUser = await response.json()
                //console.log(potUser);
                potUser.msg ? navigate('/login') : setUser(potUser)
                
            } catch (error) {
                return {msg : error.message}
            }
           

        }
        if (!isConnected) {
           getUser()
       }

       
    },[isConnected, navigate])
    
    return (
      <>
        {isConnected ? (
          <UserContext.Provider value={user}>
            <AdminHeader />
            <div className="flex flex-row justify-between">
              <div className="w-1/4 hidden lg:flex">
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
                      Profil
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
              <div className="w-full lg:w-3/4">
                <Outlet />
              </div>
            </div>
          </UserContext.Provider>
        ) : (
          ''
        )}
      </>
    )
    

      
    
}