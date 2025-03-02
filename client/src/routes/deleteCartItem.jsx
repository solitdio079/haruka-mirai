import { redirect } from "react-router-dom"
import { serverUrl } from "../server"
export async function action({ params,request }) {
    const { id } = params
    const formData = await request.formData()
    const bodyObj = Object.fromEntries(formData)

    try {
        const response = await fetch(
          `${serverUrl}/cart/${id}?itemId=${bodyObj.itemId}`,
          {
            method: 'DELETE',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        const msg = await response.json()
        if (!msg.error) return redirect(bodyObj.prevLocation)
        throw new Error(msg.error)
    } catch (error) {
        throw new Error(error.message)
    }
    
}