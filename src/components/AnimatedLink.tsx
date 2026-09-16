import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router';
import type {  LinkProps } from '@tanstack/react-router'
import type { ReactNode } from 'react'

type AnimatedLinkProp = {
  children:ReactNode,
  route:string,
  classes:string,
  func?:()=> any,
  params?: LinkProps['params'],
  disabled?: boolean
}

const AnimatedLink = ({children, route, classes, func, params, disabled= false}:AnimatedLinkProp) => {
    const MotionLink = motion.create(Link)
    return ( 
      <MotionLink
        to={route}
        params={params as any}
        whileTap={{ scale: 0.95 }}
        onClick={() => func}
        className={classes}
        disabled={disabled}
      >
        {children}
      </MotionLink>
     );
}
 
export default AnimatedLink;