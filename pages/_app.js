import '@/styles/globals.css'
import { Analytics } from "@vercel/analytics/react"
import React from 'react'
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Omar Abdiwali</title>
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
