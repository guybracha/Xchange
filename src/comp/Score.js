import React from 'react';

export default function Score({ convertedAmount, toCurrencyCode }) {
  const currentDateTime = new Date();
  const formatDateTime = currentDateTime.toLocaleString();

  // Parse the convertedAmount as a float
  const numericConvertedAmount = parseFloat(convertedAmount);

  return (
    <div>
      That'll Cost you...
      <h3 id='score-container'>
        {/* Display the numeric converted amount */}
        {!isNaN(numericConvertedAmount) ? `${toCurrencyCode} ${numericConvertedAmount.toFixed(2)}` : 'N/A'}
      </h3>
      <p>Current Date and Time:<br /> {formatDateTime}</p>
    </div>
  );
}
