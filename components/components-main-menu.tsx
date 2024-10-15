"use client"

import { motion } from 'framer-motion'
import { ShieldCheckIcon, BoltIcon } from 'lucide-react'
import Image from 'next/image'

export function MainMenu({ onGameSelect }: { onGameSelect: (game: string) => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black flex flex-col items-center justify-between p-8 md:p-12">
      <header className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-white"
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-nazSxR40DW1erLHTnmMcz9thfydJax.png"
            alt="Grand Bahama Power Company Logo"
            width={300}
            height={150}
            className="mx-auto mb-8 w-full h-auto max-w-[300px]"
          />
          <h1 className="text-5xl font-bold mb-2 text-yellow-400">Cybersecurity Icebreaker</h1>
          <p className="text-xl text-blue-300">Protect our power, secure our future</p>
        </motion.div>
      </header>

      <main className="flex-grow flex items-center justify-center w-full max-w-4xl my-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
          <GameCard
            onGameSelect={onGameSelect}
            title="Phishing Simulator"
            description="Test your skills in identifying and responding to various phishing attempts targeting our power grid infrastructure."
            icon={<ShieldCheckIcon className="h-12 w-12" />}
            game="phishingPowerPlant"
          />
          <GameCard
            onGameSelect={onGameSelect}
            title="Cyber Awareness"
            description="Enhance your overall cybersecurity knowledge and decision-making skills through interactive scenarios and quizzes."
            icon={<BoltIcon className="h-12 w-12" />}
            game="aiGridGuardian"
          />
        </div>
      </main>

      <footer className="w-full max-w-4xl text-center text-white mt-12 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-lg"
        >
          Designed by Vance Poitier<br />IT Team
        </motion.div>
      </footer>
    </div>
  )
}

function GameCard({ title, description, icon, game, onGameSelect }: { title: string; description: string; icon: React.ReactNode; game: string; onGameSelect: (game: string) => void }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-lg shadow-lg p-6 flex flex-col items-center text-center text-white border border-gray-700"
    >
      <motion.div
        className="text-blue-400 mb-4"
        initial={{ rotateY: 0 }}
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.5 }}
      >
        {icon}
      </motion.div>
      <h2 className="text-2xl font-bold mb-2 text-yellow-400">{title}</h2>
      <p className="text-gray-300 mb-4">{description}</p>
      <button
        onClick={() => onGameSelect(game)}
        className="bg-blue-700 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Start IceBreaker
      </button>
    </motion.div>
  )
}
