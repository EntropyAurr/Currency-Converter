import { useEffect, useState } from "react";

const KEY = "99b81557e63a57d5f0defe33";

export default function App() {
  const [money, setMoney] = useState("");
  const [unit, setUnit] = useState("VND");

  return (
    <div className="container">
      <AddInput money={money} setMoney={setMoney} unit={unit} setUnit={setUnit} />
      <Result unit={unit} money={money} />
    </div>
  );
}

function AddInput({ money, setMoney, unit, setUnit }) {
  return (
    <div className="money">
      <input type="number" min={0} value={money} onChange={(e) => setMoney(e.target.value)} placeholder="Enter amount..." />

      <select className="unit-from" value={unit} onChange={(e) => setUnit(e.target.value)}>
        <option value="VND">VND</option>
        <option value="USD">USD</option>
        <option value="KRW">KRW</option>
        <option value="EUR">EUR</option>
      </select>

      <select className="unit-to" value={unit} onChange={(e) => setUnit(e.target.value)}>
        <option value="USD">USD</option>
        <option value="VND">VND</option>
        <option value="KRW">KRW</option>
        <option value="EUR">EUR</option>
      </select>
    </div>
  );
}

function Result({ unit, money }) {
  const [exchangeRate, setExchangeRate] = useState(0);

  useEffect(function () {
    async function getExchangeRates() {
      const res = await fetch(`https://v6.exchangerate-api.com/v6/${KEY}/latest/${unit}`);
      const data = await res.json();

      setExchangeRate(data.conversion_rates);
      console.log(exchangeRate);
    }

    getExchangeRates();
  }, []);

  return (
    <div className="result">
      <p>Result: </p>
    </div>
  );
}
