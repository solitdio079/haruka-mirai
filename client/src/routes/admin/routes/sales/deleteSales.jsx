import { useEffect } from 'react'
import { useNavigation, Link, useFetcher } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { serverUrl } from '../../../../server'
export async function action({ params }) {
    console.log('Inside Action')
  const { id } = params
  

  try {
    const response = await fetch(
      `${serverUrl} /admin/sales/${id}`,
      {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      }
    )

    const msg = await response.json()
    return msg
  } catch (error) {
    return { error: error.message }
  }
}

export default function DeleteSales() {
  const navigation = useNavigation()
  const fetcher = useFetcher()

  useEffect(() => {
    const toastOptions = {
      duration: 5000,
      id: Math.round(Math.random() * 1e9),
    }
    toast.dismiss()

    fetcher.data
      ? fetcher.data.error
        ? toast.error(fetcher.data.error, toastOptions)
        : toast.success(fetcher.data.msg, toastOptions)
      : ''
  }, [fetcher])
  return (
    <div className="flex flex-col m-5">
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Delete Page</h1>
            <p className="py-6">
              
                This page will tell you what happened to the delete operation!
            </p>
            <Link to="/admin/sales/view" className="btn btn-primary">
              {' '}
              {navigation.state === 'submitting' ? (
                <span className="loading loading-infinity loading-lg"></span>
              ) : (
                'Go Back'
              )}
            </Link>
            <Toaster />
          </div>
        </div>
      </div>
    </div>
  )
}
