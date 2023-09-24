import React, { Component } from 'react';

class Fetch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: null, // Initialize items as null
      dataIsLoaded: false,
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch("https://api.currencyapi.com/v3/latest?apikey=cur_live_HWGaQ6pUZrhOHtHamfstdsG7hdVBjYnQiYo5kvNh&currencies=EUR%2CUSD%2CCAD%2CILS%2CBTC%2CGBP%2CTHB");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      this.setState({
        items: data.data, // Extract data from the API response
        dataIsLoaded: true,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  render() {
    const { dataIsLoaded, items } = this.state;

    if (!dataIsLoaded) {
      return (
        <div>
          <h1 className='display-4'>Please Wait</h1>
        </div>
      );
    }

    return (
      <div className='container-sm'>
      <div className='gb-box'>
        <h1 className='display-6'>List of currencies</h1>
        <ul>
          {Object.entries(items).map(([currency, data]) => (
            <li key={currency}>
              {currency}: {data.value}
            </li>
          ))}
        </ul>
      </div>
      </div>
    );
  }
}

export default Fetch;
