import { serverUrl } from "../server"
export async function loader({ request }) {
  const url = new URL(request.url)

  const name = url.searchParams.get('name')
  const price = url.searchParams.get('price')
  try {
    const response = await fetch(
      `${serverUrl}/product/?type=${name}&cursor=&limit=5&price=${
        price || ''
      }`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const items = await response.json()
    console.log(items)
    return [items, name, price]
  } catch (error) {
    return { error: error.message }
  }
}
