import {redirect} from 'react-router-dom'
export async function action({ request }) {
    const formData = await request.formData()
  const bodyObj = Object.fromEntries(formData)
  const user_id =localStorage.getItem("user_id") 
  bodyObj.user_id= user_id !== "undefined" ? user_id: null
    try {
        const response = await fetch('http://localhost:5500/cart/', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyObj),
        })
      const message = await response.json()
        
      if (message.msg) {
        user_id  === "undefined" || Boolean(user_id) === false? localStorage.setItem("user_id", message.user_id.toString()):''
        return redirect(bodyObj.prevLocation) 
      }
      throw new Error(message.error)
    } catch (error) {
       throw new Error(error.message)
    }

}

