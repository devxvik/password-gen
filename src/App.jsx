import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [password, setpassword] = useState("");
  const [length, setlength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  const passwordRef = useRef(null)

  const pswdGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefhijklmnopqrstuvwzyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%&*_[]{}()`";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [setpassword, length, numAllowed, charAllowed]);

  const copyToClip = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=>{
    pswdGenerator()
  }, [setpassword, length, numAllowed, charAllowed]);

  

  return (
    <div className="container">
      <div className="box">
        <h1>Password Generator</h1>
        <div className="pswd">
          <input
            type="text"
            value={password}
            className="inp"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button 
          className="copy"
          onClick={copyToClip}
          >Copy</button>
        </div>
        <div className="ranges">
          <input
            type="range"
            min={6}
            max={50}
            value={length}
            className="range-slider"
            onChange={(e) => {
              setlength(e.target.value);
            }}
          />
          <label> Length : {length}</label>
          <input
            type="checkbox"
            defaultChecked={numAllowed}
            id="NumAllow"
            onChange={() => {
              setNumAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="NumAllow">Numbers</label>
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="CharAllow"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="CharAllow">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
