import { useEffect, useState } from "react";

export default function App() {
  const [ binaryText, setBinaryText ] = useState("");
  const [ decimalText, setDecimalText ] = useState("");
  const [isInvalid, setIsInvalid ] = useState(false);

  function updateBinary(event) {
    const num = event.currentTarget.value;
    if (binaryText.length >= 8) return;
    for ( let digit of num ) {
      digit = Number(digit);
      if(digit !== 1 && digit !== 0) {
        setIsInvalid(true);
        alert("Invalid input: Only 0s and 1s allowed!");
        return;
      };
    };
    setBinaryText(num);
  }

  function updateDecimal(e) {
    setDecimalText(e.currentTarget.value);
  }

  function binaryToDecimal() {
    let sum = 0;
    binaryText.split('')
      .map((digit, index) => {
        digit = Number(digit);
        sum += (digit * 2**(binaryText.length-index-1));
    })
    setDecimalText(sum);
  }

  function decimalToBinary() {
    let binary = "";
    let i=Number(decimalText);
    if (i===0) {
      setBinaryText("0");
      return;
    }

    while(i>0) {
      binary = (i%2) + binary;
      i = Math.floor(i/2);
    }
    setBinaryText(binary);
  }

  useEffect(() => {
    binaryToDecimal();
  }, [binaryText])

  useEffect(() => {
    decimalToBinary();
  }, [decimalText])

  return(
    <>
      <header>
        <h1>Binary {"<=>"} Decimal</h1>
      </header>
      <main>
        <section className="input-section">
          <div className="input-container">
            <h2>Binary number (base: 2)</h2>
            <input 
              type="text" 
              value={binaryText}
              onChange={(event) => updateBinary(event)}></input>
          </div>
          <div className="input-container">
            <h2>Decimal number (base: 10)</h2>
            <input 
              type="text" 
              value={decimalText}
              onChange={(e) => updateDecimal(e)}></input>
          </div>
        </section>
      </main>
    </>
  );
};