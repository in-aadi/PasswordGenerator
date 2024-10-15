import { useRef } from "react"
import { useEffect, useCallback, useState } from "react"

function App() {

  const [length, setLength] = useState(8)
  const [checkNumber, setCheckNumber] = useState(false)
  const [checkCharacter, setCheckCharacter] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (checkNumber) str += "0123456789"
    if (checkCharacter) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length + 1));
    }

    setPassword(pass);
  }, [length, checkNumber, checkCharacter, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password])
  
  useEffect(() => passwordGenerator(), [length, checkNumber, checkCharacter, passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
        />
        <button
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        onClick={copyPasswordToClipboard}
        >copy</button>
        
      </div>
      <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          id="numberInput"
          defaultChecked={checkNumber}
          onChange={() => {
            setCheckNumber((prev) => !prev)
          }}
          />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              id="characterInput"
              defaultChecked={checkCharacter}
              onChange={() => {
                setCheckCharacter((prev) => !prev)
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
      </div>
    </>
  )
}

export default App
