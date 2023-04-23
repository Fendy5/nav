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
  return <motion.div initial={{ scaleX: 0.8, scaleY: 0 }} animate={{ scaleX: 1, scaleY: 1 }} transition={{ duration: 0.5, type: 'spring', delay: 0 }} {...props}>
    {props.children}
  </motion.div>
}
