import { useState } from 'react'
import { useEffect } from 'react'
import { use } from 'react'
import { useCallback , useRef} from 'react'

function App() {
  const [length , setLength] = useState(8)
  const [numberAllowed , setNumberAllowed] = useState(false)
  const [charAllowed , setCharAllowed] = useState(false)
  const [password , setPassword] = useState('')
  const passwordRef=useRef(null)


  const passwordgenerator = useCallback(()=>{
    let pass = ""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str +="0123456789"
    if(charAllowed) str +="!@#$%^&*()_+?><:{}[]"
    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random()*str.length + 1)
      pass +=str.charAt(char)
      
      
    }
    setPassword(pass)

  },[length , numberAllowed , charAllowed , setPassword])

  const copytoClipboard = useCallback(()=>{
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0,3)
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(()=>{
    passwordgenerator()
  },[length,charAllowed,numberAllowed,passwordgenerator])
  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-lg rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center'>Password Generator</h1>
      <div className='flex shawdow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text"
        value={password}
        className="outline-none w-full py-1 px-3 bg-white"
        placeholder='Password'
        readOnly
        ref={passwordRef}
        />
        <button className='outline-none text-white bg-blue-700 px-3 py-0.5 shrink-0 '
        onClick={copytoClipboard}
        >Copy</button>
      </div>
      <div 
      className='flex text-sm gap-x-2 '>
        <div 
        className='flex items-center gap-x-1'>
          <input 
          type="range" 
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>setLength(e.target.value)}

          />
          <label >Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox" 
          value={numberAllowed}
          onChange={()=>setNumberAllowed((prev)=>!prev)}
          />
          <label>Numbers</label>
        </div>
         <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox" 
          value={charAllowed}
          onChange={()=>setCharAllowed((prev)=>!prev)}
          />
          <label>Characters</label>
        </div>
      </div>
     </div> 
    </>
  )
}

export default App
