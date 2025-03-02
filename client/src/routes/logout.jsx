import { redirect } from 'react-router-dom'
import { serverUrl } from '../server'
export async function action() {
    try {
        const response = await fetch(
          serverUrl+'/auth/logout',
          {
            method: 'POST',
            credentials: 'include',
            body: {},
          }
        )
        await response.json()
        return redirect("/")
    } catch (error) {
        return {error: error.message}
    }
}