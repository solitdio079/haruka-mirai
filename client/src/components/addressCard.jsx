import { FaMapPin } from 'react-icons/fa6'

/* eslint-disable react/prop-types */
export default function AddressCard({ item }) {
    return (<div
                 
                  className="card bg-base-100 m-2"
                >
                  <div className="card-body">
                    <h2 className="card-title"> <FaMapPin/> {item.name} </h2>
                    <ul className="menu w-56 p-0 [&_li>*]:rounded-none">
                      <li>
                        <span> {item.addressLines} </span>
                      </li>
                      <li>
                        <span> {item.country} </span>
                      </li>
                      <li>
                        <span> {item.city} </span>
                      </li>
                      <li>
                        <span> {item.zipCode} </span>
                      </li>
                    </ul>
                    
        </div>
    </div>)
}