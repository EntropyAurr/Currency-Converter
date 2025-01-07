import { useEffect, useState } from "react";

const KEY = "99b81557e63a57d5f0defe33";

export default function App() {
  const [money, setMoney] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");
  const [unitFrom, setUnitFrom] = useState("VND");
  const [unitTo, setUnitTo] = useState("USD");

  const rawResult = parseFloat(money.replace(/,/g, "")) * exchangeRate;
  const formatedResult = new Intl.NumberFormat("en-US").format(rawResult);

  function handleInputFormat(number) {
    const rawValue = number.target.value.replace(/,/g, "");
    const formatedValue = new Intl.NumberFormat("en-US").format(rawValue);
    setMoney(formatedValue);

    console.log(typeof number.target.value);
  }

  return (
    <div className="container">
      <CurrencyConverter money={money} onMoneyFormat={handleInputFormat} unitFrom={unitFrom} setUnitFrom={setUnitFrom} unitTo={unitTo} setUnitTo={setUnitTo} exchangeRate={exchangeRate} setExchangeRate={setExchangeRate} rawResult={rawResult} formatedResult={formatedResult} />
    </div>
  );
}

function CurrencyConverter({ money, onMoneyFormat, unitFrom, setUnitFrom, unitTo, setUnitTo, setExchangeRate, formatedResult }) {
  useEffect(
    function () {
      async function getExchangeRates() {
        const res = await fetch(`https://v6.exchangerate-api.com/v6/${KEY}/latest/${unitFrom}`);
        const data = await res.json();

        setExchangeRate(data.conversion_rates[`${unitTo}`]);
      }

      getExchangeRates();
    },
    [unitTo]
  );

  return (
    <>
      <div className="money">
        <input type="text" min={0} value={money} onChange={onMoneyFormat} placeholder="Enter amount..." />

        <select className="unit-from" value={unitFrom} onChange={(e) => setUnitFrom(e.target.value)}>
          <option value="VND">VND</option>
          <option value="USD">USD</option>
          <option value="KRW">KRW</option>
          <option value="EUR">EUR</option>
        </select>

        <select className="unit-to" value={unitTo} onChange={(e) => setUnitTo(e.target.value)}>
          <option value="USD">USD</option>
          <option value="VND">VND</option>
          <option value="KRW">KRW</option>
          <option value="EUR">EUR</option>
        </select>
      </div>

      <div className="result">
        <p>Result: {formatedResult}</p>
      </div>
    </>
  );
}
