import { SiReact } from 'react-icons/si'

export default function Home() {
  return (
    <section className='space-y-2 selection:bg-blue-300 dark:selection:bg-pink-500 dark:selection:text-white'>
      <div className='grid place-items-center text-7xl lg:text-9xl text-blue-500 dark:text-blue-400'>
        <SiReact />
      </div>
      <div className='bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text'>
        <h1 className='text-center text-xl lg:text-4xl font-bold uppercase text-transparent'>
          stravital
        </h1>
      </div>
      <p className='text-center lg:text-lg text-gray-800 dark:text-gray-300'>
        React, Vite w/ Tailwind CSS minimalist starter template.
      </p>
      <div className='w-full h-1 rounded-full overflow-hidden'>
        <div className='w-1/2 h-full bg-gradient-to-r from-pink-500 to-blue-500 animate-slebew'></div>
      </div>
    </section>
  )
}
