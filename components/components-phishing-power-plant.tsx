"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, Globe, AlertTriangle, CheckCircle, XCircle, ArrowRight, Paperclip, Lock, Search, Bell, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/router'

type Scenario = {
  id: number
  title: string
  type: 'email' | 'phone' | 'web' | 'physical' | 'sms'
  content: React.ReactNode
  options: string[]
  correctOption: number
  explanation: string
}

const scenarios: Scenario[] = [
  {
    id: 1,
    title: "Urgent Email from President",
    type: 'email',
    content: (
      <div className="bg-white text-black p-4 rounded-lg shadow-md max-w-2xl mx-auto">
        <div className="border-b border-gray-300 pb-2 mb-2">
          <p><strong>From:</strong> Davie McGregor &lt;Davie.McGregor@gb.power.com&gt;</p>
          <p><strong>To:</strong> Vance Poitier &lt;vance.poitier@gb-power.com&gt;</p>
          <p><strong>Subject:</strong> Urgent: Confidential Financial Matter</p>
        </div>
        <div className="mt-4">
          <p>Hello Vance,</p>
          <p className="mt-2">I hope this email finds you well. We have an urgent financial matter that requires immediate attention. We're in the final stages of a confidential acquisition, and I need you to process a wire transfer to the new account.</p>
          <p className="mt-2">Please transfer $50,000 to the following account:</p>
          <p>Bank: International Bank of Commerce<br />
          Account Number: 1234567890<br />
          Routing Number: 987654321</p>
          <p className="mt-2">This is extremely time-sensitive and must be done today. Due to the confidential nature of this acquisition, please do not discuss this with anyone else in the company.</p>
          <p className="mt-2">I'm currently in a meeting but will be available on my cell if you have any questions.</p>
          <p className="mt-2">Thank you for your prompt attention to this matter.</p>
          <p className="mt-2">Best regards,<br />Davie McGregor<br />President, Grand Bahama Power Company</p>
        </div>
      </div>
    ),
    options: [
      "Process the wire transfer immediately as requested",
      "Reply to the email asking for more details",
      "Report the email as phishing and delete it",
      "Call the CEO directly to verify the request"
    ],
    correctOption: 2,
    explanation: "This email shows signs of a potential Business Email Compromise (BEC) attack. The correct action is to report it as phishing and delete it. For urgent financial matters, always verify through established company protocols, not via email."
  },
  {
    id: 2,
    title: "Suspicious Phone Call",
    type: 'phone',
    content: (
      <div className="bg-gray-100 text-black p-4 rounded-lg shadow-md max-w-md mx-auto">
        <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
          <span>00:42</span>
          <span>Active Call</span>
          <Phone className="h-6 w-6" />
        </div>
        <div className="p-4">
          <h3 className="font-bold mb-2">IT Support</h3>
          <div className="space-y-2">
            <p className="bg-blue-100 p-2 rounded-lg"><strong>IT Support:</strong> "Hello, this is Mike from IT support. We've detected a critical security issue with your computer that needs immediate attention."</p>
            <p className="bg-green-100 p-2 rounded-lg"><strong>You:</strong> "Oh, I see. What kind of security issue?"</p>
            <p className="bg-blue-100 p-2 rounded-lg"><strong>IT Support:</strong> "We've identified a potential malware infection that's trying to access sensitive company data. To fix this, we need to remotely access your computer, but first, I'll need your login credentials to verify your identity and initiate the repair process."</p>
            <p className="bg-green-100 p-2 rounded-lg"><strong>You:</strong> "My login credentials? Is that really necessary?"</p>
            <p className="bg-blue-100 p-2 rounded-lg"><strong>IT Support:</strong> "Yes, it's crucial for the security protocol. We need to act fast to prevent any data breaches. Can you please provide your username and password?"</p>
          </div>
        </div>
        <div className="bg-gray-200 p-4 rounded-b-lg flex justify-around">
          <button className="bg-red-500 text-white p-2 rounded-full"><Phone className="h-6 w-6" /></button>
          <button className="bg-gray-400 text-white p-2 rounded-full"><AlertTriangle className="h-6 w-6" /></button>
        </div>
      </div>
    ),
    options: [
      "Provide your login credentials as requested",
      "Ask for the caller's employee ID and call back the official IT support number",
      "Refuse to give any information, hang up, and report the incident",
      "Transfer the call to your supervisor"
    ],
    correctOption: 2,
    explanation: "Never provide login credentials over the phone, even if the caller claims to be from IT support. The correct action is to refuse the request, end the call, and report the incident to your IT security team."
  },
  {
    id: 3,
    title: "Phishing Website",
    type: 'web',
    content: (
      <div className="bg-white text-black p-4 rounded-lg shadow-md max-w-2xl mx-auto">
        <div className="border-b border-gray-300 pb-2 mb-4 flex items-center">
          <Lock className="text-green-500 mr-2" />
          <span className="text-gray-600">https://</span>
          <span className="font-semibold">grandbahama-power.securitytraining.com</span>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-blue-600 mb-2">Grand Bahama Power Company</h2>
          <h3 className="text-xl font-semibold mb-4">Employee Security Training Portal</h3>
        </div>
        <form className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input type="text" id="username" name="username" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" name="password" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors">
              Log In
            </button>
          </div>
        </form>
        <div className="mt-4 text-sm text-gray-600">
          <p>By logging in, you agree to our Terms of Service and Privacy Policy.</p>
        </div>
      </div>
    ),
    options: [
      "Enter your credentials and log in to access the training",
      "Close the website and report it as a potential phishing attempt",
      "Contact IT security to verify the authenticity of the training portal",
      "Share the link with colleagues to see if they received the same email"
    ],
    correctOption: 1,
    explanation: "When encountering a suspicious website, especially one asking for login credentials, the safest action is to close it immediately and report it as a potential phishing attempt. Never enter your credentials on a site you're unsure about."
  },
  {
    id: 4,
    title: "Mysterious USB Drive",
    type: 'physical',
    content: (
      <div className="bg-gray-100 text-black p-4 rounded-lg shadow-md max-w-md mx-auto">
        <h3 className="font-bold mb-2 text-center">Outside the Office</h3>
        <div className="relative rounded-lg overflow-hidden mb-4">
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/usb_image-6Q6uYEy9xd7TkW8w0WZ6eZ278QS69d.png" 
            alt="Man walking near a USB drive" 
            className="w-full h-auto"
          />
        </div>
        <p className="mt-4">As you approach the office entrance, you notice a USB drive lying on the ground. It's not in any packaging, and there's no one else around who might have dropped it.</p>
      </div>
    ),
    options: [
      "Plug it into your work computer to see what's on it and if you can identify the owner",
      "Hand it to your supervisor or the IT department without plugging it in",
      "Throw it away to avoid any potential security risks",
      "Post about it on the company's internal messaging system to find the owner"
    ],
    correctOption: 1,
    explanation: "Never plug in unknown USB drives, even if they appear to be from the company. They could contain malware. The correct action is to hand it to the IT department or security personnel without plugging it in, allowing them to investigate safely."
  },
  {
    id: 5,
    title: "Suspicious SMS",
    type: 'sms',
    content: (
      <div className="bg-gray-100 text-black p-4 rounded-lg shadow-md max-w-sm mx-auto">
        <div className="bg-blue-600 text-white p-2 rounded-t-lg">
          <h3 className="font-bold">Messages</h3>
        </div>
        <div className="bg-white p-4 space-y-2 min-h-[200px]">
          <div className="bg-blue-100 p-2 rounded-lg max-w-[80%]">
            <p className="text-sm">Hello, this is GBPC HR. We're updating our employee database. Please confirm your details by clicking the link: http://bit.ly/gbpc-update</p>
          </div>
          <div className="bg-blue-100 p-2 rounded-lg max-w-[80%]">
            <p className="text-sm">This is urgent and required for all employees. Thank you for your cooperation.</p>
          </div>
        </div>
        <div className="bg-gray-200 p-2 rounded-b-lg flex">
          <input type="text" placeholder="Message" className="flex-grow p-2 rounded-l-lg" />
          <button className="bg-blue-500 text-white p-2 rounded-r-lg">Send</button>
        </div>
      </div>
    ),
    options: [
      "Click the link and update your details as requested",
      "Ignore the message and delete it",
      "Reply asking for more information about the update process",
      "Report the message as a potential spam or phishing attempt without clicking the link"
    ],
    correctOption: 3,
    explanation: "Unexpected SMS messages asking you to click links or provide personal information are often phishing attempts. The correct action is to report the message as suspicious without clicking any links or responding to it."
  }
]

export function PhishingPowerPlantComponent() {
  const [currentScenario, setCurrentScenario] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [correctOption, setCorrectOption] = useState<number | null>(null)
  const router = useRouter()

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex)
    setShowExplanation(true)
    setCorrectOption(scenarios[currentScenario].correctOption)
    if (optionIndex === scenarios[currentScenario].correctOption) {
      setScore(score + 1)
    }
  }

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1)
      setSelectedOption(null)
      setCorrectOption(null)
      setShowExplanation(false)
    }
  }

  const prevScenario = () => {
    if (currentScenario > 0) {
      setCurrentScenario(currentScenario - 1)
      setSelectedOption(null)
      setCorrectOption(null)
      setShowExplanation(false)
    }
  }

  const resetGame = () => {
    setCurrentScenario(0)
    setSelectedOption(null)
    setCorrectOption(null)
    setShowExplanation(false)
    setScore(0)
  }

  const handleBackToHome = () => {
    router.push('/')
  }

  const getIcon = (type: 'email' | 'phone' | 'web' | 'physical' | 'sms') => {
    switch (type) {
      case 'email': return <Mail className="w-8 h-8" />
      case 'phone': return <Phone className="w-8 h-8" />
      case 'web': return <Globe className="w-8 h-8" />
      case 'physical': return <AlertTriangle className="w-8 h-8" />
      case 'sms': return <Bell className="w-8 h-8" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={handleBackToHome}
            className="flex items-center bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-center">Phishing Simulator</h1>
        </div>
        
        {currentScenario < scenarios.length ? (
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold">Challenge {currentScenario + 1} of {scenarios.length}</span>
              <span className="text-lg font-semibold">Score: {score}/{scenarios.length}</span>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center mb-2">
                {getIcon(scenarios[currentScenario].type)}
                <h2 className="text-xl font-bold ml-2">{scenarios[currentScenario].title}</h2>
              </div>
              <div className="mt-4 mb-6 overflow-auto max-h-96">
                
                {scenarios[currentScenario].content}
              </div>
            </div>
            
            <div className="space-y-4">
              {scenarios[currentScenario].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  disabled={showExplanation}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    showExplanation
                      ? index === correctOption
                        ? 'bg-green-600 text-white'
                        : index === selectedOption
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-700 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {option}
                </button>
              ))}
            </div>
            
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-6 p-4 bg-blue-900 rounded-lg"
                >
                  <h3 className="text-lg font-semibold mb-2">Explanation:</h3>
                  <p>{scenarios[currentScenario].explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Training Complete!</h2>
            <p className="text-xl mb-4">Your final score: {score}/{scenarios.length}</p>
            <p className="mb-6">Great job completing the Phishing Power Plant training. Remember to always stay vigilant and apply these lessons in your daily work to keep our power grid secure.</p>
            <button
              onClick={resetGame}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors"
            >
              Retake Training
            </button>
          </div>
        )}

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={prevScenario}
            disabled={currentScenario === 0}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full disabled:opacity-50"
          >
            Previous Scenario
          </button>
          <div>
            Scenario {currentScenario + 1} of {scenarios.length}
          </div>
          {currentScenario < scenarios.length - 1 ? (
            <button
              onClick={nextScenario}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
            >
              Next Scenario
            </button>
          ) : (
            <button
              onClick={resetGame}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full"
            >
              Complete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}