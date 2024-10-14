"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, Zap, Lock } from 'lucide-react'

export default function LoadingAnimationComponent({ progress }: { progress: number }) {
  const [progressState, setProgressState] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgressState((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer)
          return 100
        }
        const newProgress = oldProgress + 1
        return newProgress
      })
    }, 50)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const iconVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center items-center space-x-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={iconVariants}
            transition={{ delay: 0.2 }}
          >
            <Shield className="w-12 h-12 text-blue-400" />
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={iconVariants}
            transition={{ delay: 0.4 }}
          >
            <Zap className="w-12 h-12 text-yellow-400" />
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={iconVariants}
            transition={{ delay: 0.6 }}
          >
            <Lock className="w-12 h-12 text-green-400" />
          </motion.div>
        </div>
        <h2 className="text-2xl font-bold text-center text-white mb-4">
          Securing the Grid
        </h2>
        <div className="bg-gray-700 h-2 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-400 via-yellow-400 to-green-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="mt-2 text-center text-white text-sm">
          {progress}% Complete
        </div>
        <div className="mt-4 text-center text-gray-400 text-xs">
          Initializing cybersecurity protocols...
        </div>
      </div>
    </div>
  )
}
