import { motion } from 'framer-motion';
import React, { useMemo } from 'react';


type ContainerProps = {
    children: React.ReactNode,
    delay: number,
    type?:'scroll' | 'load',
    containerType:string,
    className?:string,
    direction?: 'up' | 'down' | 'left' | 'right';
}

  const DIRECTIONS = {
    up:    { opacity: 0, y: 50,  x: 0 },
    down:  { opacity: 0, y: -50, x: 0 },
    left:  { opacity: 0, x: -150, y: 0 },
    right: { opacity: 0, x: 150,  y: 0 },
  };

  const ANIMATED = { opacity: 1, x: 0, y: 0 };
  const viewport = { once: true, amount: 0.2 };

const AnimatedContainer = ({ 
  children, 
  delay = 0, 
  type = 'scroll',
  containerType = 'section',
  className,
  direction = 'up'
}:ContainerProps)  => {

  const MotionContainer = useMemo(
    () => motion.create(containerType) as any,
    [containerType]
  );

  const initialState = DIRECTIONS[direction];
  const animateState = ANIMATED;
  const transition = useMemo(
    () => ({ duration: 0.8, delay }),
    [delay]
  );


  // For load animations
  if (type === 'load') {
    return (
      <MotionContainer
        initial={initialState}
        animate={animateState}
        transition={transition}
        className={className}
      >
        {children}
      </MotionContainer>
    );
  }

  // For scroll animations (default)
  return (
    <MotionContainer
      initial={initialState}
      whileInView={animateState}
      viewport={viewport}
      transition={transition}
      className={className}
    >
      {children}
    </MotionContainer>
  );
}

 
export default AnimatedContainer;
