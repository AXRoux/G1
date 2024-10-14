import { NextPage } from 'next'
import Head from 'next/head'
import { PhishingPowerPlantComponent } from '../components/components-phishing-power-plant'

const PhishingPowerPlant: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Phishing Power Plant - Cybersecurity Icebreaker</title>
        <meta name="description" content="Phishing Power Plant game for Grand Bahama Power Company" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <PhishingPowerPlantComponent />
      </main>
    </div>
  )
}

export default PhishingPowerPlant
