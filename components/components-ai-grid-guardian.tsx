import React from 'react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Zap, Lock, Smartphone, Laptop, Cloud, User, Key, Eye, EyeOff, AlertTriangle, Check, X, Wifi, Mail, Database, ArrowRight, Code, Unlock, Download, FileText, Send, Bot, ArrowLeft } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import Image from 'next/image'
import { useRouter } from 'next/router'

type Challenge = {
  id: number
  title: string
  description: string
  component: React.ReactNode
  onCorrectAnswer: () => void
}

const CookieStealerChallenge = ({ onCorrectAnswer }: { onCorrectAnswer: () => void }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const question = "Why is it important to clear browser cookies regularly?"
  const options = [
    "To free up storage space on your device",
    "To improve website loading speed",
    "To protect your privacy and security",
    "To reset your browser settings"
  ]
  const correctAnswer = 2
  const explanation = "Regularly clearing cookies is important for privacy and security. It helps prevent unauthorized access to your accounts, removes tracking data that websites have collected about your browsing habits, and reduces the risk of your personal information being compromised if your device is accessed by others or if a website you've logged into is hacked."

  const infectionSteps = [
    { icon: Download, description: "Malware Download" },
    { icon: Laptop, description: "System Infection" },
    { icon: Database, description: "Cookie Scanning" },
    { icon: Send, description: "Data Exfiltration" },
    { icon: User, description: "Identity Theft" }
  ]

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev >= infectionSteps.length - 1 ? 0 : prev + 1))
    }, 1000)

    return () => clearInterval(stepInterval)
  }, [])

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index)
    setShowExplanation(true)
    if (index === correctAnswer) {
      onCorrectAnswer()
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4">Cookie Stealer Education</h3>

      <div className="mb-6">
        <motion.div
          className="bg-gray-700 p-4 rounded-lg mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Laptop className="w-6 h-6 mr-2" />
              <span>Your Browser</span>
            </div>
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="relative h-32 bg-gray-800 rounded-lg overflow-hidden">
            <div className="absolute top-2 left-2 flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex space-x-8">
                {infectionSteps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <step.icon className={`w-8 h-8 ${index <= currentStep ? 'text-red-500' : 'text-gray-500'}`} />
                    <span className="text-xs mt-1">{step.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-gray-700 p-2 rounded">
            <p className="font-semibold">Cookies at risk:</p>
            <ul className="list-disc list-inside">
              <li>Session tokens</li>
              <li>User preferences</li>
              <li>Tracking data</li>
            </ul>
          </div>
          <div className="bg-gray-700 p-2 rounded">
            <p className="font-semibold">Potential consequences:</p>
            <ul className="list-disc list-inside">
              <li>Account hijacking</li>
              <li>Data theft</li>
              <li>Privacy violation</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">{question}</h4>
        <div className="space-y-2">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                selectedAnswer !== null
                  ? index === correctAnswer
                    ? 'bg-green-600 text-white'
                    : index === selectedAnswer
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              } ${selectedAnswer !== null ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-blue-900 p-4 rounded-lg mb-4"
          >
            <div className="flex items-center mb-2">
              {selectedAnswer === correctAnswer ? (
                <Check className="w-6 h-6 text-green-500 mr-2" />
              ) : (
                <X className="w-6 h-6 text-red-500 mr-2" />
              )}
              <span className="font-semibold">
                {selectedAnswer === correctAnswer ? 'Correct!' : 'Incorrect.'}
              </span>
            </div>
            <p>{explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const AIPrivacyChallenge = ({ onCorrectAnswer }: { onCorrectAnswer: () => void }) => {
  const [input, setInput] = useState('')
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'assistant'; content: string }[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const question = "What are the potential risks of sharing sensitive company information with AI chatbots?"
  const options = [
    "There are no risks as AI chatbots are completely secure",
    "The information could be used to train the AI model and potentially be exposed",
    "AI chatbots immediately delete all information after the conversation",
    "Only the company that owns the AI chatbot can access the information"
  ]
  const correctAnswer = 1
  const explanation = "AI chatbots, including those like GPT, typically store and use conversation data to improve their models. This means that sensitive company information shared in these chats could potentially be exposed or used in ways not intended by the user. It's crucial to treat AI chatbots as public spaces and avoid sharing confidential or proprietary information."

  const handleSubmit = () => {
    if (input.trim() === '') return

    const newUserMessage = { role: 'user' as const, content: input }
    setChatHistory(prev => [...prev, newUserMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = { role: 'assistant' as const, content: "I've processed your input. Please be cautious about sharing sensitive company information in AI chats. This data could potentially be used to train AI models or be accessed by unauthorized parties." }
      setChatHistory(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index)
    setShowExplanation(true)
    if (index === correctAnswer) {
      onCorrectAnswer()
    }
  }

  useEffect(() => {
    // Simulate initial conversation
    const initialConversation = [
      { role: 'user' as const, content: "Hi, I'm working on a confidential project for my company. Can you help me brainstorm some ideas?" },
      { role: 'assistant' as const, content: "Hello! I'd be happy to help you brainstorm. However, I want to remind you that it's best not to share confidential company information in AI chats. Could you provide a more general description of what you're working on without revealing sensitive details?" },
      { role: 'user' as const, content: "Oh, I see. Well, we're developing a new product that will revolutionize our industry. It uses a proprietary algorithm that..." },
      { role: 'assistant' as const, content: "I apologize for interrupting, but I must stress the importance of not sharing proprietary or confidential information here. This conversation could potentially be used to train AI models or be accessed by others. Let's focus on more general concepts without specific details about your company's projects." }
    ]

    setChatHistory(initialConversation)
  }, [])

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="mb-4 flex items-center space-x-2">
        <Bot className="w-6 h-6" />
        <span>AI Privacy Guardian</span>
      </div>
      <div className="bg-gray-900 rounded-lg p-4 h-80 overflow-y-auto mb-4">
        {chatHistory.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`flex items-start space-x-2 mb-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && <Bot className="w-6 h-6 mt-1" />}
            <div className={`rounded-lg p-2 max-w-[70%] ${message.role === 'user' ? 'bg-blue-600' : 'bg-gray-700'}`}>
              {message.content}
            </div>
            {message.role === 'user' && <User className="w-6 h-6 mt-1" />}
          </motion.div>
        ))}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-2"
          >
            <Bot className="w-6 h-6" />
            <div className="text-gray-400">AI is typing...</div>
          </motion.div>
        )}
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 rounded-lg bg-gray-700 text-white"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
        >
          <Send className="w-6 h-6" />
        </button>
      </div>

      <div className="mt-8">
        <h4 className="text-lg font-semibold mb-2">{question}</h4>
        <div className="space-y-2">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                selectedAnswer !== null
                  ? index === correctAnswer
                    ? 'bg-green-600 text-white'
                    : index === selectedAnswer
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              } ${selectedAnswer !== null ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-blue-900 p-4 rounded-lg mt-4"
          >
            <div className="flex items-center mb-2">
              {selectedAnswer === correctAnswer ? (
                <Check className="w-6 h-6 text-green-500 mr-2" />
              ) : (
                <X className="w-6 h-6 text-red-500 mr-2" />
              )}
              <span className="font-semibold">
                {selectedAnswer === correctAnswer ? 'Correct!' : 'Incorrect.'}
              </span>
            </div>
            <p>{explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const PasswordStrengthChallenge = ({ onCorrectAnswer }: { onCorrectAnswer: () => void }) => {
  const [password, setPassword] = useState('')
  const [strength, setStrength] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const question = "Which of the following is the most secure password?"
  const options = [
    "ILoveMyCat123!",
    "P@ssw0rd2023",
    "Tr0ub4dor&3xtra_S3cur3",
    "MyS3curePassw0rd2023"
  ]
  const correctAnswer = 2
  const explanation = "The most secure password is 'Tr0ub4dor&3xtra_S3cur3' because it's the longest, combines uppercase and lowercase letters, numbers, and special characters, and doesn't use common words or patterns. It's more resistant to brute-force attacks due to its length and complexity."

  useEffect(() => {
    let newStrength = 0
    if (password.length >= 12) newStrength++
    if (password.length >= 16) newStrength++
    if (password.match(/[A-Z]/)) newStrength++
    if (password.match(/[a-z]/)) newStrength++
    if (password.match(/[0-9]/)) newStrength++
    if (password.match(/[^A-Za-z0-9]/)) newStrength++
    setStrength(newStrength)
  }, [password])

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index)
    setShowExplanation(true)
    if (index === correctAnswer) {
      onCorrectAnswer()
    }
  }

  const getStrengthColor = () => {
    if (strength <= 2) return 'bg-red-500'
    if (strength <= 4) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getStrengthText = () => {
    if (strength <= 2) return 'Weak'
    if (strength <= 4) return 'Moderate'
    return 'Strong'
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="mb-6 flex items-center space-x-2">
        <Key className="w-6 h-6" />
        <span className="text-xl font-semibold">Password Strength Tester</span>
      </div>
      <div className="relative mb-6">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 text-black rounded-md pr-10"
          placeholder="Enter a password..."
        />
        <button
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
      <div className="mb-4">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${getStrengthColor()}`}
            initial={{ width: '0%' }}
            animate={{ width: `${(strength / 6) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span>Weak</span>
          <span>Moderate</span>
          <span>Strong</span>
        </div>
      </div>
      <p className="mb-6 text-center font-semibold">
        Password Strength: <span className={`${getStrengthColor().replace('bg-', 'text-')}`}>{getStrengthText()}</span>
      </p>

      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-3">{question}</h4>
        <div className="space-y-3">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                selectedAnswer !== null
                  ? index === correctAnswer
                    ? 'bg-green-600 text-white'
                    : index === selectedAnswer
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              } ${selectedAnswer !== null ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-blue-900 p-4 rounded-lg mt-4"
          >
            <div className="flex items-center mb-2">
              {selectedAnswer === correctAnswer ? (
                <Check className="w-6 h-6 text-green-500 mr-2" />
              ) : (
                <X className="w-6 h-6 text-red-500 mr-2" />
              )}
              <span className="font-semibold">
                {selectedAnswer === correctAnswer ? 'Correct!' : 'Incorrect.'}
              </span>
            </div>
            <p>{explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const PhishingEmailChallenge = ({ onCorrectAnswer }: { onCorrectAnswer: () => void }) => {
  const [showContent, setShowContent] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const question = "Why is this email likely to be fraudulent?"
  const options = [
    "The email address looks legitimate",
    "It contains a QR code for easy access",
    "It offers a beneficial program for employees",
    "It uses urgency and unusual verification methods"
  ]
  const correctAnswer = 3
  const explanation = "This email shows several red flags of a phishing attempt: 1) It creates a sense of urgency with a 24-hour deadline. 2) It asks for sensitive information via an unusual method (QR code). 3) It threatens negative consequences (loss of opportunity). 4) The sender's email, while looking official, should be verified through other channels. Always be cautious of emails asking you to act quickly or provide sensitive information, even if they appear to be from within your organization."

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index)
    setShowExplanation(true)
    if (index === correctAnswer) {
      onCorrectAnswer()
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="mb-4 flex items-center space-x-2">
        <Mail className="w-6 h-6" />
        <span>Suspicious Email</span>
      </div>
      <button
        onClick={() => setShowContent(!showContent)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full mb-4"
      >
        {showContent ? 'Hide Email' : 'Show Email'}
      </button>
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white text-black p-4 rounded-md mb-4"
          >
            <p><strong>From:</strong> hr@gb.power.com</p>
            <p><strong>Subject:</strong> Urgent: Tuition Assistance Program - Action Required</p>
            <p className="mt-2">Dear Valued Employee,</p>
            <p>We are excited to announce a new Tuition Assistance Program! To qualify, you must verify your eligibility within the next 24 hours.</p>
            <p>Scan the QR code below to access the secure verification portal:</p>
            <div className="my-4 flex justify-center">
              <QRCodeSVG value="https://malicious-site.com/verify" size={128} />
            </div>
            <p>Don't miss this opportunity to advance your education. Failure to verify will result in automatic disqualification.</p>
            <p>Best regards,<br />HR Department</p>
          </motion.div>
        )}
      </AnimatePresence>

      <h4 className="text-lg font-semibold mb-2">{question}</h4>
      <div className="space-y-2">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              selectedAnswer !== null
                ? index === correctAnswer
                  ? 'bg-green-600 text-white'
                  : index === selectedAnswer
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-700 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            } ${selectedAnswer !== null ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            disabled={selectedAnswer !== null}
          >
            {option}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-blue-900 p-4 rounded-lg mt-4"
          >
            <div className="flex items-center mb-2">
              {selectedAnswer === correctAnswer ? (
                <Check className="w-6 h-6 text-green-500 mr-2" />
              ) : (
                <X className="w-6 h-6 text-red-500 mr-2" />
              )}
              <span className="font-semibold">
                {selectedAnswer === correctAnswer ? 'Correct!' : 'Incorrect.'}
              </span>
            </div>
            <p>{explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const UnauthorizedWifiChallenge = ({ onCorrectAnswer }: { onCorrectAnswer: () => void }) => {
  const [connected, setConnected] = useState(false)
  const [usingSecureNetwork, setUsingSecureNetwork] = useState(false)
  const [activity, setActivity] = useState<string[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [securityScore, setSecurityScore] = useState(100)
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [hackerProgress, setHackerProgress] = useState(0)
  const [hackerStage, setHackerStage] = useState(0)

  const hackerStages = [
    "Detecting unauthorized network...",
    "Intercepting utility data...",
    "Accessing SCADA systems...",
    "Manipulating grid controls...",
    "Critical infrastructure compromised!"
  ]

  const question = "Which scenario poses the greatest risk to the electric utility's cybersecurity?"
  const options = [
    "Using a personal smartphone's hotspot to access work emails",
    "Connecting a company laptop to the official, secure company network",
    "Bringing a personal MiFi device to access internet in remote substations",
    "Using a company-provided tablet on the guest WiFi network"
  ]
  const correctAnswer = 2
  const explanation = "Bringing a personal MiFi device to remote substations poses the greatest risk. These unauthorized devices can create unsecured entry points into critical infrastructure networks. They bypass company security measures, potentially allowing attackers to intercept sensitive data or gain access to SCADA systems. Company-provided devices and networks have security measures in place, while personal devices, especially in sensitive locations like substations, can compromise the entire grid's security."

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (connected && !usingSecureNetwork) {
      interval = setInterval(() => {
        setHackerProgress(prev => {
          const newProgress = Math.min(prev + 5, 100)
          setHackerStage(Math.floor(newProgress / 20))
          return newProgress
        })
      }, 500)
    }
    return () => clearInterval(interval)
  }, [connected, usingSecureNetwork])

  const handleConnect = () => {
    setConnected(true)
    setActivity(prev => [...prev, "Connected to unauthorized 'Personal MiFi' network"])
    setSecurityScore(prev => Math.max(prev - 30, 0))
  }

  const handleDisconnect = () => {
    setConnected(false)
    setUsingSecureNetwork(false)
    setActivity([])
    setHackerProgress(0)
    setSecurityScore(100)
  }

  const handleToggleSecureNetwork = () => {
    setUsingSecureNetwork(!usingSecureNetwork)
    setActivity(prev => [...prev, usingSecureNetwork ? "Disconnected from secure company network" : "Connected to secure company network"])
    setSecurityScore(prev => usingSecureNetwork ? Math.max(prev - 50, 0) : Math.min(prev + 50, 100))
    if (usingSecureNetwork) setHackerProgress(0)
  }

  const handleAccessData = () => {
    if (connected) {
      if (usingSecureNetwork) {
        setActivity(prev => [...prev, "Safely accessed utility data through secure company network"])
        setSecurityScore(prev => Math.min(prev + 10, 100))
      } else {
        setActivity(prev => [...prev, "Warning: Accessed sensitive utility data on unsecured network"])
        setSecurityScore(prev => Math.max(prev - 20, 0))
      }
    }
  }

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index)
    setShowExplanation(true)
    if (index === correctAnswer) {
      onCorrectAnswer()
    }
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-center">Unauthorized WiFi Device Simulation</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h4 className="text-xl font-semibold mb-4">Network Status</h4>
          <div className="flex items-center justify-between mb-4">
            <span>Connection:</span>
            <span className={`font-semibold ${connected ? 'text-green-500' : 'text-red-500'}`}>
              {connected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span>Secure Company Network:</span>
            <span className={`font-semibold ${usingSecureNetwork ? 'text-green-500' : 'text-red-500'}`}>
              {usingSecureNetwork ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Security Score:</span>
            <span className={`font-semibold ${
              securityScore > 70 ? 'text-green-500' : securityScore > 30 ? 'text-yellow-500' : 'text-red-500'
            }`}>
              {securityScore}%
            </span>
          </div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg">
          <h4 className="text-xl font-semibold mb-4">Threat Detection</h4>
          <div className="flex items-center mb-4">
            <Image
              src="/icons8-hacker-64.png"
              alt="Hacker Icon"
              width={32}
              height={32}
              className={`mr-2 ${hackerProgress > 0 ? 'animate-pulse' : ''}`}
            />
            <div className="flex-grow">
              <div className="w-full bg-gray-700 rounded-full h-4">
                <motion.div
                  className="bg-red-500 h-4 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${hackerProgress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={hackerStage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`text-sm ${hackerProgress === 100 ? 'text-red-500 font-bold' : 'text-yellow-400'}`}
            >
              {hackerStages[hackerStage]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <button
          onClick={connected ? handleDisconnect : handleConnect}
          className={`px-4 py-2 rounded-full ${connected ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white transition-colors duration-300`}
        >
          {connected ? 'Disconnect Personal MiFi' : 'Connect Personal MiFi'}
        </button>
        <button
          onClick={handleToggleSecureNetwork}
          className={`px-4 py-2 rounded-full ${usingSecureNetwork ? 'bg-blue-500 hover:bg-blue-600' : 'bg-yellow-500 hover:bg-yellow-600'} text-white transition-colors duration-300`}
          disabled={!connected}
        >
          {usingSecureNetwork ? 'Disconnect Secure Network' : 'Connect Secure Network'}
        </button>
      </div>
      
      {connected && (
        <div className="mb-6">
          <h4 className="text-xl font-semibold mb-4">Simulated Actions</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleAccessData}
              className="px-4 py-2 rounded-full bg-purple-500 hover:bg-purple-600 text-white transition-colors duration-300"
            >
              Access Utility Data
            </button>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter SCADA credentials..."
                className="w-full px-4 py-2 rounded-full bg-gray-700 text-white"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <h4 className="text-xl font-semibold mb-4">Activity Log</h4>
        <div className="h-40 overflow-y-auto">
          {activity.map((action, index) => (
            <motion.p 
              key={index} 
              className="text-sm text-green-400 mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ArrowRight className="inline w-4 h-4 mr-2" />
              {action}
            </motion.p>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-xl font-semibold mb-4">{question}</h4>
        <div className="space-y-3">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full text-left p-4 rounded-lg transition-colors duration-300 ${
                selectedAnswer !== null
                  ? index === correctAnswer
                    ? 'bg-green-600 text-white'
                    : index === selectedAnswer
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              } ${selectedAnswer !== null ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-blue-900 p-4 rounded-lg mt-4"
          >
            <div className="flex items-center mb-2">
              {selectedAnswer === correctAnswer ? (
                <Check className="w-6 h-6 text-green-500 mr-2" />
              ) : (
                <X className="w-6 h-6 text-red-500 mr-2" />
              )}
              <span className="font-semibold">
                {selectedAnswer === correctAnswer ? 'Correct!' : 'Incorrect.'}
              </span>
            </div>
            <p>{explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const challenges: Challenge[] = [
  {
    id: 1,
    title: "Cookie Stealer Defense",
    description: "Learn about browser cookies and how to protect yourself from cookie theft.",
    component: <CookieStealerChallenge onCorrectAnswer={() => {}} />,
    onCorrectAnswer: () => {}
  },
  {
    id: 2,
    title: "AI Privacy Guardian",
    description: "Learn to interact with AI assistants without revealing sensitive personal information.",
    component: <AIPrivacyChallenge onCorrectAnswer={() => {}} />,
    onCorrectAnswer: () => {}
  },
  {
    id: 3,
    title: "Password Strength Tester",
    description: "Create a strong password and see how it rates on the strength meter.",
    component: <PasswordStrengthChallenge onCorrectAnswer={() => {}} />,
    onCorrectAnswer: () => {}
  },
  {
    id: 4,
    title: "Phishing Email Detective",
    description: "Analyze an email and determine if it's legitimate or a phishing attempt.",
    component: <PhishingEmailChallenge onCorrectAnswer={() => {}} />,
    onCorrectAnswer: () => {}
  },
  {
    id: 5,
    title: "Unauthorized WiFi Device Simulation",
    description: "Navigate the risks of using unauthorized WiFi devices by making smart connection choices.",
    component: <UnauthorizedWifiChallenge onCorrectAnswer={() => {}} />,
    onCorrectAnswer: () => {}
  }
]

export function AiGridGuardian() {
  const [currentChallenge, setCurrentChallenge] = useState(0)
  const [completed, setCompleted] = useState<number[]>([])
  const [score, setScore] = useState(0)
  const router = useRouter()

  const handleCorrectAnswer = () => {
    if (!completed.includes(currentChallenge)) {
      setCompleted(prev => [...prev, currentChallenge])
      setScore(prev => prev + 1)
    }
  }

  const nextChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(currentChallenge + 1)
    }
  }

  const prevChallenge = () => 
    setCurrentChallenge(Math.max(0, currentChallenge - 1))

  const markCompleted = () => {
    if (!completed.includes(currentChallenge)) {
      setCompleted(prev => [...prev, currentChallenge])
      setScore(prev => prev + 1)
    }
    // Reset to the first challenge
    setCurrentChallenge(0)
  }

  const handleBackToHome = () => {
    router.push('/')
  }

  // Update the challenges array to use the handleCorrectAnswer function
  const updatedChallenges = challenges.map(challenge => ({
    ...challenge,
    component: React.cloneElement(challenge.component as React.ReactElement, { onCorrectAnswer: handleCorrectAnswer }),
    onCorrectAnswer: handleCorrectAnswer
  }))

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
          <h1 className="text-3xl md:text-4xl font-bold text-center">Cyber Awareness</h1>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold">Challenge {currentChallenge + 1} of {challenges.length}</span>
            <span className="text-lg font-semibold">Score: {score}/{challenges.length}</span>
          </div>
          <h2 className="text-2xl font-bold mb-4">{updatedChallenges[currentChallenge].title}</h2>
          <p className="mb-4">{updatedChallenges[currentChallenge].description}</p>
          {updatedChallenges[currentChallenge].component}
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={prevChallenge}
            disabled={currentChallenge === 0}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full disabled:opacity-50"
          >
            Previous Challenge
          </button>
          <div>
            Challenge {currentChallenge + 1} of {challenges.length}
          </div>
          {currentChallenge < challenges.length - 1 ? (
            <button
              onClick={nextChallenge}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
            >
              Next Challenge
            </button>
          ) : (
            <button
              onClick={markCompleted}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full"
            >
              Complete
            </button>
          )}
        </div>

        {completed.length === challenges.length && (
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Congratulations! You've completed all challenges!</h2>
            <p className="mb-4">You've demonstrated excellent cybersecurity awareness. Keep applying these lessons in your daily digital life!</p>
            <p>You can now go through the challenges again to reinforce your knowledge.</p>
          </div>
        )}
      </div>
    </div>
  )
}