import { redirect } from "react-router-dom"
import { serverUrl } from "../server"
export async function action({ request }) {
    const formData = await request.formData()
    const bodyObj = Object.fromEntries(formData)

    try {
        const response = await fetch(
          `${serverUrl}/cart/${bodyObj.cartId}`,
          {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyObj),
          }
        )
        const msg = await response.json()
        if (!msg.error) return redirect(bodyObj.prevLocation)
        throw new Error(msg.error)
    } catch (error) {
        throw new Error(error.message)
    }
}