/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
export default function UserProfileCard({user}) {
    return (
      <div className="card  text-neutral-content ">
        <div className="card-body items-center text-center">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
              <img
                src={
                  user.picture ||
                  'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                }
              />
            </div>
          </div>
          <ul className="menu rounded-box w-56">
            {user.fullName ? (
              <li>
                <span> {user.fullName} </span>
              </li>
            ) : (
              ''
            )}
            <li>
              <span className="text-neutral"> {user.email} </span>
            </li>

            {user.phone ? (
              <li>
                <span> {user.phone} </span>
              </li>
            ) : (
              ''
            )}
          </ul>
        </div>
      </div>
    )
}