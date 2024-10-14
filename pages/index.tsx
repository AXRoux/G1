import { useState, useEffect } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import LoadingAnimationComponent from '../components/loading-animation'
import { MainMenu } from '../components/components-main-menu'

const Home: NextPage = () => {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          return 100
        }
        return prevProgress + 1
      })
    }, 30)

    return () => clearInterval(interval)
  }, [])

  const handleGameSelect = (game: string) => {
    switch (game) {
      case 'phishingPowerPlant':
        router.push('/phishing-power-plant')
        break
      case 'aiGridGuardian':
        router.push('/ai-grid-guardian')
        break
      default:
        console.error('Unknown game selected')
    }
  }

  return (
    <div>
      <Head>
        <title>Cybersecurity Icebreaker - Grand Bahama Power Company</title>
        <meta name="description" content="Cybersecurity training games for Grand Bahama Power Company" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {loadingProgress < 100 ? (
          <LoadingAnimationComponent progress={loadingProgress} />
        ) : (
          <MainMenu onGameSelect={handleGameSelect} />
        )}
      </main>
    </div>
  )
}

export default Home
