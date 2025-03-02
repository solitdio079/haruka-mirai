/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import SplashScreen from '../components/splashScreen'

export default function App({ router }) {
  const [showSplashScreen, setShowSplashScreen] = useState(true)

  useEffect(() => {
    /*
        Since the `useNavigation()` hook is not available outside `<RouterProvider />`,
        this component won't re-render automatically when the navigation state changes.
        So we set up an interval that will keep checking whether the navigation state 
        within `router` has changed.
        */
    const splashScreenInterval = setInterval(() => {
      /*
                Normally, we'd be able to reference `navigation.state` directly using 
                `useNavigation()`. But since we are outside `<RouterProvider />`, 
                we only have the `router` object to provide us with the navigation state.
                */
      const navState = router.state.navigation.state

      /*
                When the page loads initially or on reload, navState will be "loading". 
                This is when we'll show the Splash Screen.
                Once the `loader()` has completed its processing i.e. once the data is 
                fetched from the API, `navState` will change from "loading" to "idle". 
                This is when we'll hide the Splash Screen and render the actual page.
                */
      if (navState == 'idle') {
        // Hide the splash screen.
        setShowSplashScreen(false)
        clearInterval(splashScreenInterval)
      }
    }, 1000)

    // cleanup in case of component unmount
    ;() => clearInterval(splashScreenInterval)
  }, [])

  return (
    <>
      {showSplashScreen ? <SplashScreen /> : <RouterProvider router={router} />}
    </>
  )
}
