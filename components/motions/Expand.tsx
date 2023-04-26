/**
 * @Author fendy
 * @CreateTime 2023/4/22 23:52
 * @Description
 */
import { motion } from 'framer-motion'
import React, { PropsWithChildren } from 'react'

interface MotionProps extends PropsWithChildren{
  className?: string
}
export const Expand = (props: MotionProps) => {
  return <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.3,
      ease: [0, 0.71, 0.2, 1.01],
      scale: {
        type: "spring",
        damping: 5,
        stiffness: 100,
        restDelta: 0.001
      }
    }}  {...props}>
    {props.children}
  </motion.div>
}
