import { NextPage } from 'next'
import Head from 'next/head'
import { AiGridGuardian } from '../components/components-ai-grid-guardian'

const AiGridGuardianPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>AI Grid Guardian - Cybersecurity Icebreaker</title>
        <meta name="description" content="AI Grid Guardian game for Grand Bahama Power Company" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <AiGridGuardian />
      </main>
    </div>
  )
}

export default AiGridGuardianPage
