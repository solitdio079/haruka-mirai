import { useState } from 'react'
import { Outlet,Form, useNavigation,Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'

export default function OrderRoot(
  
) {
    const navigation = useNavigation()
    const [startDate, setStartDate] = useState(Date.now())
  return (
    <div className="flex flex-col">
      <div className="navbar bg-base-100 p-5">
        <div className="flex-1">
          <Link to="/admin/orders" className="btn btn-ghost text-xl">All Orders</Link>
        </div>
        <div className="flex-none gap-2">
          <Form className='flex flex-row items-center' method="get" action={"/admin/orders/filter"}>
            <div className="form-control">
              <DatePicker
                selected={startDate}
                name="date"
                onChange={(date) => {
                  setStartDate(date)
                  
                 }}
              />
            </div>
            <button type="submit" className="btn btn-primary"> 
              {navigation.state !=="idle" ? <span className="loading loading-infinity loading-md"></span>: 'Filter'}
            </button>
          </Form>
        </div>
      </div>
      <Outlet context={[startDate, setStartDate]} />
    </div>
  )
}