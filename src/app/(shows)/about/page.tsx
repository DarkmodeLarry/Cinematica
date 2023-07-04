'use client'

import { motion } from 'framer-motion'
import '@/styles/about.css'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

function About() {
  const router = useRouter()
  const [email, setEmail] = useState('')

  // Todo add an onSubmit handler to the form

  const initAnim = { opacity: 0, y: '1rem' }
  const animAnim = { opacity: 1, y: 0 }
  return (
    <>
      <div className='about'>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: '5rem' }}
          exit={{ opacity: 0, y: '5rem' }}
          className='about__inner'
        >
          <motion.h1 initial={initAnim} animate={animAnim} transition={{ delay: 0.2 }}>
            Unlimited films, TV shows and more.
          </motion.h1>

          <motion.h2 initial={initAnim} animate={animAnim} transition={{ delay: 0.25 }}>
            Watch anywhere and cancel anytime.
          </motion.h2>

          <motion.form
            transition={{ delay: 0.35 }}
            initial={initAnim}
            animate={animAnim}
            // onSubmit={handleSubmit}
            className='subscribe'
          >
            <input
              type='email'
              value={email}
              required
              placeholder='Enter your email address...'
              onChange={(e) => setEmail(e.target.value)}
            />

            <button>Try 30 Days FREE</button>
          </motion.form>

          <motion.p transition={{ delay: 0.5 }} initial={initAnim} animate={animAnim}>
            Read to watch? Enter your email to create or access your account.
          </motion.p>
        </motion.div>
      </div>
    </>
  )
}

export default About
