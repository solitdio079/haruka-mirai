import { useLoaderData, Link, Form , useNavigation} from 'react-router-dom'
import { FaX, FaPen } from 'react-icons/fa6'
import { serverUrl } from '../../../../server'

export async function loader({ params }) {
    const { parent_id } = params

    try {
        const response = await fetch(
          `${serverUrl}/admin/category/subs/${parent_id}`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        ) 
        const subs = await response.json()
        return subs
        
    } catch (error) {
        return {error: error.message}
    }
    
    
}
export default function GetSubCategories() {
    const subs = useLoaderData()
    const navigation = useNavigation()
    return (
      <>
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">SubCategories</a>
          </div>
          <div className="flex-none gap-2"></div>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label></label>
                </th>
                <th>Name</th>

                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {subs.length === 0 ? (
                <tr>
                  <td>
                    <p className="text-3xl">No SubCategories found</p>
                  </td>
                </tr>
              ) : (
                subs.map((item) => (
                  <tr key={item._id}>
                    <th>
                      <label>
                        <Form
                          method="post"
                          action={`/admin/categories/delete/${item._id}`}
                          /*onSubmit={(event) => {
                          if (
                            !confirm(
                              'Please confirm you want to delete this record.'
                            )
                          ) {
                            event.preventDefault()
                          }
                        }}*/
                        >
                          <button className="btn bg-red-700 btn-rounded border-none btn-sm">
                            {navigation.state === 'submitting' ? (
                              <span className="loading loading-infinity loading-sm"></span>
                            ) : (
                              <FaX className="h-6 w-6 text-white" />
                            )}
                          </button>
                        </Form>
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={
                                item.image
                                  ? `${serverUrl}/categories/${item.image}`
                                  : 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'
                              }
                              alt={`Image of ${item.name}`}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-xl"> {item.name} </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <Link
                        to={`/admin/categories/edit/${item._id}`}
                        className="btn bg-yellow-500 btn-rounded border-none btn-sm"
                      >
                        <FaPen className="h-6 w-6 text-white" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}

              {/* row 2 */}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th></th>
                <th>Name</th>

                <th>Edit</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </>
    )
}