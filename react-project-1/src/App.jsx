import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [color, setColor] = useState("grey");
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState("false");
  const [charAllowed, setCharAllowed] = useState("false");
  const [password, setPassword] = useState("");

  const passwordRef =useRef(null)

  const passwordGenerator = useCallback(()=> {
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str+= "1234567890"
    if (charAllowed) str+= "!@#$%^&*()_+=`~"

    for (let i = 1; i<length; i++) {
      let char = Math.floor (Math.random() * str.length + 1)
      pass +=str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(()=> {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,101)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])
  


  return (
    <>
    <div>

     {/* HEADING PASSWORD GENERATOR  */}
     <h1 className="fixed flex text-3xl rounded-xl px-5 py-5 top-10 left-120" style={{backgroundColor: "yellow"}} >Password Generator</h1>

     {/* Grey Box  */}
    <div className="fixed flex bg-gray-400 px-35 py-20 left-98 top-48 rounded-2xl " >

     {/* PASSWORDBOX  */}
    <input 
    type ="text" 
    value={password} 
    className="fixed flex py-1 px-1 top-50 left-100 rounded-xl" 
    style={{backgroundColor:"white"}} 
    placeholder="Password" 
    readOnly
    ref={passwordRef}
    ></input>
   
     {/* COPY BUTTON  */}
    <buttton 
    onClick={copyPasswordToClipboard}
    className="fixed flex py-1 px-2 top-50 left-150 rounded-xl text-white cursor-pointer" 
    style={{backgroundColor:"blue"}} >Copy</buttton>
   
     {/* SLIDER  */}
    <input 
     type ="range" 
     className="fixed flex py-1 px-1 top-61 left-100 rounded-xl cursor-pointer"
     min={6} 
     max={100}
     value={length} 
     onChange={(e)=>{setLength(e.target.value)}} 
     />
     <label className="fixed flex px-1 top-61 left-135 rounded-xl" style={{backgroundColor:"white"}}>Length : {length}</label>
     
     {/* NUMBER CHECKBOX  */}
     <input 
     type ="checkbox" 
     className="fixed flex py-1 px-1 top-70 left-100 rounded-xl cursor-pointer"
     defaultChecked="numberAllowed"
     onChange={()=>{setNumberAllowed((prev) => !prev);}} 
     />
     <label className="fixed flex px-1 top-69 left-105 rounded-b-sm" style={{backgroundColor:"white"}}>Number</label>
    
     {/* CHARACTER CHECKBOX  */}
      <input 
     type ="checkbox" 
     className="fixed flex py-1 px-1 top-80 left-100 rounded-xl cursor-pointer"
     defaultChecked="charAllowed"
     onChange={()=>{setCharAllowed((prev) => !prev);}} 
     />
     <label className="fixed flex px-1 top-80 left-105 rounded-b-sm" style={{backgroundColor:"white"}}>Character</label>
    </div>
</div>

    <div
      className="w-full h-screen duration-200"
      style={{ backgroundColor: color }}
    >
      <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
        <div className="flex flex-wrap justify-center gap-3 shadow bg-white px-3 py-2 rounded-md">
          <button onClick={()=> setColor("red")} className="outline-none px-4 py-1 rounded-md text-white shadow-lg" style={{backgroundColor: "red"}}>Red </button>
          <button onClick={()=> setColor("green")} className="outline-none px-4 py-1 rounded-md text-white shadow-lg" style={{backgroundColor: "green"}}>Green</button>
          <button onClick={()=> setColor("blue")} className="outline-none px-4 py-1 rounded-md text-white shadow-lg" style={{backgroundColor: "blue"}}>Blue</button>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
