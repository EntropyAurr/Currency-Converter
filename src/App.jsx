import { useEffect, useState } from "react";

const KEY = "99b81557e63a57d5f0defe33";

export default function App() {
  const [unit, setUnit] = useState("VND");

  return (
    <div className="container">
      <AddInput unit={unit} setUnit={setUnit} />
      <Result unit={unit} />
    </div>
  );
}

function AddInput({ unit, setUnit }) {
  const [money, setMoney] = useState("");

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

function Result({ unit }) {
  useEffect(function () {
    async function getExchangeRates() {
      const res = await fetch(`https://v6.exchangerate-api.com/v6/${KEY}/latest/${unit}`);
    }
  });

  return (
    <div className="result">
      <p>Result: </p>
    </div>
  );
}
