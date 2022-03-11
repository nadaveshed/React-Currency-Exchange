import { useEffect, useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';
import 'react-dropdown/style.css';
import './App.css';

function App() {

  const [info, setInfo] = useState([]);
  const [input, setInput] = useState(0);
  let [from, setFrom] = useState("USD");
  let [to, setTo] = useState("ILS");
  let [options, setOptions] = useState([]);
  const [output, setOutput] = useState(0);

  useState(() => {
    setOptions(['USD', 'EUR', 'ILS', 'GBP', 'AUD', 'CAD', 'RUB', 'CZK', 'KRW', 'INR', 'THB']);
  }, )

  async function convert() {
    console.log("convert", input, to, from)

    await Axios.get(
        `http://localhost:3001/api/quote?from_currency_code=${from}&amount=${input}&to_currency_code=${to}`)
        .then((res) => {
          setInfo(res.data.amount);
          console.log("info:", info)
        })
    setOutput(info * 1);
  }

  function flip() {
      setOutput(0);
    let temp = from;
    setFrom(to);
    setTo(temp);
  }

  return (
      <div className="App">
        <div className="heading">
          <h1>Currency converter</h1>
        </div>
        <div className="container">
          <div className="left">
            <h3>Amount</h3>
            <input type="text"
                   placeholder="Enter the amount"
                   onChange={(e) => setInput(e.target.value)} />
          </div>
          <div className="middle">
            <h3>From</h3>
            <Dropdown options={options}
                      onChange={(e) => { setFrom(e.value) }}
                      value={from} placeholder="From" />
          </div>
          <div className="switch">
            <HiSwitchHorizontal size="30px"
                                onClick={() => { flip()}}/>
          </div>
          <div className="right">
            <h3>To</h3>
            <Dropdown options={options}
                      onChange={(e) => {setTo(e.value)}}
                      value={to} placeholder="To" />
          </div>
        </div>
        <div className="result">
          <button onClick={convert}>Convert</button>
          <h2>Converted Amount:</h2>
          <p>{input+" "+from+" = "+output.toPrecision(4).replace(/\.([^0]+)0+$/,".$1") + " " + to}</p>

        </div>
      </div>
  );
}

export default App;