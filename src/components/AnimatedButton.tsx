import { motion } from 'framer-motion'
import type React from 'react';

type AnimatedButtonProp = {
 classes:string,
 func: ()=> any,
 type?: "button" | "submit" | "reset"
 disabled?: boolean
 children:React.ReactNode
}

const AnimatedButton = ({classes, func, type='button', disabled, children}:AnimatedButtonProp) => {
  return (
    <motion.button
      type={type}
      whileTap={{ scale: 0.95 }}
      onClick={func}
      disabled={disabled}
      className={classes}
    >
      {children}
    </motion.button>
  )
}
 
export default AnimatedButton;