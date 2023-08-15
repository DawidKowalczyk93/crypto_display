import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './normalize.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <div className='container'>
            <div className="header__image"></div>
            <div className='main'>
                <div className='main__col'>
                    <div className='crypto__block--wrapper'></div>
                    <div className='crypto__block--wrapper'>
                        <ul>
                            <li><button className='crypto__block'>KRYPTO</button></li>
                            <li><button className='crypto__block'>KRYPTO</button></li>
                            <li><button className='crypto__block'>KRYPTO</button></li>
                            <li><button className='crypto__block'>KRYPTO</button></li>
                            <li><button className='crypto__block'>KRYPTO</button></li>
                            <li><button className='crypto__block'>KRYPTO</button></li>
                            <li><button className='crypto__block'>KRYPTO</button></li>
                            <li><button className='crypto__block'>KRYPTO</button></li>
                            <li><button className='crypto__block'>KRYPTO</button></li>
                        </ul>
                    </div>


                </div>

            </div>
        </div>


    </>
  )
}

export default App
