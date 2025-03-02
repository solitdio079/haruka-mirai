import { serverUrl } from "../server"
export async function loader() {
  try {
    const response = await fetch(serverUrl+'/sales/', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    return { error: error.message }
  }
}
