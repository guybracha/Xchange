import React, { useEffect, useState } from 'react';
import Score from './Score';

export default function Input() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('ILS');
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRates, setExchangeRates] = useState({});

  const calculateConversion = () => {
    if (fromCurrency && toCurrency && amount) {
      if (fromCurrency === toCurrency) {
        setConvertedAmount(amount);
      } else {
        const currencyPair = `${fromCurrency}${toCurrency}`;
        const apiUrl = "https://api.currencyapi.com/v3/latest?apikey=cur_live_HWGaQ6pUZrhOHtHamfstdsG7hdVBjYnQiYo5kvNh&currencies=EUR%2CUSD%2CCAD%2CILS%2CBTC%2CGBP%2CTHB";

        fetch(apiUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((apiData) => {
            if (apiData && apiData.data) {
              setExchangeRates(apiData.data); // Store exchange rates in state

              if (exchangeRates[fromCurrency] && exchangeRates[toCurrency]) {
                const exchangeRate = exchangeRates[toCurrency].value / exchangeRates[fromCurrency].value;
                const result = (parseFloat(amount) * exchangeRate).toFixed(2);
                setConvertedAmount(result.toString());
              } else {
                setConvertedAmount('N/A');
              }
            } else {
              console.error("Invalid API response format");
              setConvertedAmount(null);
            }
          })
          .catch((error) => {
            console.error("Error fetching or parsing data:", error);
            setConvertedAmount(null);
          });
      }
    } else {
      setConvertedAmount(null);
    }
  };

  useEffect(() => {
    // Fetch currencies from the API and set them in the state
    const doApi = async () => {
      try {
        const url = "https://api.currencyapi.com/v3/latest?apikey=cur_live_HWGaQ6pUZrhOHtHamfstdsG7hdVBjYnQiYo5kvNh&currencies=EUR%2CUSD%2CCAD%2CILS%2CBTC%2CGBP%2CTHB";
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const apiData = await response.json();
        const currencyCodes = Object.keys(apiData.data);
        setCurrencies(currencyCodes);
        setExchangeRates(apiData.data); // Store exchange rates in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    doApi();
  }, []);

  const handleAmountChange = (event) => {
    const inputValue = event.target.value;
    if (!isNaN(inputValue)) {
      setAmount(inputValue);
    }
  };

  const handleFromCurrencyChange = (event) => {
    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = (event) => {
    setToCurrency(event.target.value);
  };

  const handleSwapCurrencies = () => {
    // Swap the selected currencies
    const tempFromCurrency = fromCurrency;
    const tempToCurrency = toCurrency;
    const tempAmount = amount;
  
    setFromCurrency(tempToCurrency);
    setToCurrency(tempFromCurrency);
    
    // Recalculate the converted amount with the new currencies
    calculateConversion(tempAmount, tempToCurrency, tempFromCurrency);
  };
  
  
  

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm'>
          <form>
            <h2>Enter Amount</h2>
            <hr></hr>
            <input
              className='form-control'
              type='number'
              value={amount}
              onChange={handleAmountChange}
            />
          </form>
          <br />
          <div>From</div>
          <select
            className='form-select'
            value={fromCurrency}
            onChange={handleFromCurrencyChange}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>

          <br />
          <div>To</div>
          <select
            className='form-select'
            value={toCurrency}
            onChange={handleToCurrencyChange}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>

          <button type='button' className='btn btn-success' onClick={calculateConversion}>
            Calculate
          </button>
          <button type='button' className='btn btn-success' onClick={() => handleSwapCurrencies()}>
            Swap Currencies
          </button>
          <br></br>
          <br></br>
        </div>
        <div className='col-sm'>
          <h2>Result</h2>
          <hr></hr>
          <Score convertedAmount={convertedAmount} toCurrencyCode={toCurrency} />
        </div>
      </div>
    </div>
  );
}
