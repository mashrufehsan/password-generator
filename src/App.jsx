import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  const [length, setLength] = useState(8)

  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)

  const [password, setPassword] = useState("")

  const passwordGenerator = () => {
    let generatedPassword = ""

    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    const numbers = "0123456789"
    const specialChars = "~!@#$%^&*()_+}{|:?><"

    if (numberAllowed) {
      chars += numbers
    }
    if (charAllowed) {
      chars += specialChars
    }

    for (let i = 0; i < length; i++) {
      let random = Math.floor(Math.random() * chars.length)
      generatedPassword += chars[random]
    }

    setPassword(generatedPassword)
  }

  useEffect(()=>{
    passwordGenerator()
  }, [length, numberAllowed, charAllowed])


  const passwordRef = useRef(null)
  const copyPassToClip = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])



  


  return (
    <div className='bg-slate-700 h-screen w-full flex justify-center items-center'>
      <div className='bg-slate-500 w-5/12 h-40 rounded-xl shadow-2xl overflow-hidden'>
        <h2 className='text-center my-3 text-slate-50 font-semibold pt-2'>Password Generator</h2>

        <div className='flex justify-center mb-6'>
          <input ref={passwordRef} value={password} className='outline-none w-4/6 px-3 py-1 rounded-l-md' type="text" placeholder='Password' readOnly />
          <button className='bg-blue-300 px-3 py-1 rounded-r-md' onClick={copyPassToClip}>Copy</button>
        </div>


        <div className='flex justify-center gap-2'>
          <input className='cursor-pointer' type="range" min={6} max={16} value={length} onChange={(e) => { setLength(e.target.value) }} />
          <label className='text-white text-xs'>Length: {length}</label>
          <input type="checkbox" defaultChecked={numberAllowed} onChange={()=>{setNumberAllowed(prev => !prev)}}/>
          <label className='text-white text-xs'>Use number</label>
          <input type="checkbox" defaultChecked={charAllowed} onChange={()=>{setCharAllowed(prev => !prev)}}/>
          <label className='text-white text-xs'>Use Characters</label>
        </div>

      </div>

    </div>
  )
}

export default App
