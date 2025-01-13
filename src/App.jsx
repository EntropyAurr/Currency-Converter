import { useEffect, useState } from "react";

const KEY = "99b81557e63a57d5f0defe33";

export default function App() {
  const [money, setMoney] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");
  const [unitFrom, setUnitFrom] = useState("USD");
  const [unitTo, setUnitTo] = useState("VND");
  const [isLoading, setIsLoading] = useState(false);

  const rawResult = parseFloat(money.replace(/,/g, "")) * exchangeRate;
  const formatedResult = new Intl.NumberFormat("en-US").format(rawResult);

  return (
    <div className="container">
      <CurrencyConverter setIsLoading={setIsLoading} money={money} setMoney={setMoney} unitFrom={unitFrom} setUnitFrom={setUnitFrom} unitTo={unitTo} setUnitTo={setUnitTo} exchangeRate={exchangeRate} setExchangeRate={setExchangeRate} rawResult={rawResult} formatedResult={formatedResult} />

      <Result money={money} formatedResult={formatedResult} unitTo={unitTo} isLoading={isLoading} />
    </div>
  );
}

function CurrencyConverter({ money, setMoney, unitFrom, setUnitFrom, unitTo, setUnitTo, setExchangeRate, setIsLoading }) {
  useEffect(
    function () {
      async function getExchangeRates() {
        setIsLoading(true);

        const res = await fetch(`https://v6.exchangerate-api.com/v6/${KEY}/latest/${unitFrom}`);
        const data = await res.json();

        setExchangeRate(data.conversion_rates[unitTo]);
        setIsLoading(false);
      }
      getExchangeRates();
    },
    [money, unitFrom, unitTo]
  );

  return (
    <>
      <div className="money">
        <input type="text" min={0} value={money} onChange={(e) => setMoney(e.target.value)} placeholder="Enter amount..." />

        <select className="unit-from" value={unitFrom} onChange={(e) => setUnitFrom(e.target.value)}>
          <option value="VND">VND</option>
          <option value="USD">USD</option>
          <option value="KRW">KRW</option>
          <option value="EUR">EUR</option>
          <option value="JPY">JPY</option>
          <option value="CNY">CNY</option>
        </select>

        <select className="unit-to" value={unitTo} onChange={(e) => setUnitTo(e.target.value)}>
          <option value="USD">USD</option>
          <option value="VND">VND</option>
          <option value="KRW">KRW</option>
          <option value="EUR">EUR</option>
          <option value="JPY">JPY</option>
          <option value="CNY">CNY</option>
        </select>
      </div>
    </>
  );
}

function Result({ isLoading, money, formatedResult, unitTo }) {
  return (
    <div className="result">
      <p>
        <span>Result: </span>
        {!money ? "" : <>{isLoading ? "Converting..." : `${formatedResult} ${unitTo}`}</>}
      </p>
    </div>
  );
}
