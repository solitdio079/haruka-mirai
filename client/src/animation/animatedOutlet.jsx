import React from 'react'
import { AnimatePresence } from 'framer-motion'
import {useLocation, useOutlet} from 'react-router-dom'

export default function AnimatedOutlet() {
  const location = useLocation() // provided by react-router-dom
  const element = useOutlet() // provided by react-router-dom

  return (
    <AnimatePresence mode="wait" initial={true}>
      {element && React.cloneElement(element, { key: location.pathname })}
    </AnimatePresence>
  )
}
