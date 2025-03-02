import { serverUrl } from "../server"
/* eslint-disable react/prop-types */
export default function StaticCart({ cart }) {
    return (
      <div className="shadow-md">
        <table className="table table-xs my-5 table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <td>Name</td>
              <td>Qty</td>
              <td>Price</td>
              <td>Sub</td>
              <td>Size</td>
            </tr>
          </thead>
          <tbody>
            {cart.items
              ? cart.items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={serverUrl+'/' + item.image}
                              alt="Product Image"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{item.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>{item.qty}</td>

                    <td>
                      {' '}
                      $
                      {parseFloat(
                        item.price.$numberDecimal || item.price
                      ).toFixed()}
                    </td>
                    <td>
                      {' '}
                      $
                      {parseFloat(
                        item.price.$numberDecimal * item.qty ||
                          item.price * item.qty
                      ).toFixed()}
                    </td>
                    <td> {item.size ? item.size : 'None'} </td>
                  </tr>
                ))
              : ''}
          </tbody>
        </table>
        <span className="font-semibold text-xl">
          Subtotal: $
          {cart.items ? parseFloat(cart.subtotal.$numberDecimal).toFixed(2) : 0}{' '}
        </span>
      </div>
    )
}