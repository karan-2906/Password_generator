import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Gen from './Gen'

export default function App() {

  return (
    <div className=''>
      <div className='text-5xl font-bold text-yellow-500'>
        <p>Password Generator</p>
      </div>
      <Gen />
    </div>
  )
}