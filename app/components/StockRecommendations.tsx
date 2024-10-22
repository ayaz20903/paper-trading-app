import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockRecommendations: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [recommendations, setRecommendations] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredSymbols, setFilteredSymbols] = useState<string[]>([]);

//   const companySymbols =  ['AAPL', 'GOOGL' , 'MSFT' , 'AMZN', 'TSLA', 'NFLX', 'PYPL' ,'BABA' ,'BAC', 'SHOP' ,'INTC', 'NVDA', 'FB'];

  // Fetch recommendations for the entered stock symbol
  const fetchStockRecommendations = async (symbol: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://finnhub.io/api/v1/stock/recommendation?symbol=${symbol}&token=cs8on8hr01qu0vk4gjggcs8on8hr01qu0vk4gjh0`
      );
      if (response.data.length > 0) {
        setRecommendations(response.data[0]); // Display the latest recommendation
        console.log(response.data)
      } else {
        setError('No recommendations found for this stock.');
      }
    } catch (err) {
      setError('Error fetching stock recommendations.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      fetchStockRecommendations(inputValue.trim().toUpperCase());
    }
  };

  // Filter symbols based on input value
//   useEffect(() => {
//     if (inputValue) {
//       const filtered = companySymbols.filter(symbol => 
//         symbol.toLowerCase().includes(inputValue.toLowerCase())
//       );
//       setFilteredSymbols(filtered);
//     } else {
//       setFilteredSymbols([]);
//     }
//   }, [inputValue]);

//   const handleSymbolClick = (symbol: string) => {
//     setInputValue(symbol);      // Set the input value to the selected symbol
//     // setInputValue('');
//     setFilteredSymbols([]);     // Clear the dropdown after selection
//   };

  return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Stock Recommendations</h1>
        
        <form onSubmit={handleSubmit} className="mb-4 relative">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter stock symbol (e.g., AAPL)"
            className="border p-2 rounded mr-2 w-full"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Get Recommendations
          </button>
          {/* {filteredSymbols.length > 0 && (
            <ul className="absolute z-10 bg-white border border-gray-300 rounded w-full mt-1">
              {filteredSymbols.map((symbol) => (
                <li 
                  key={symbol} 
                  onClick={() => handleSymbolClick(symbol)} 
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  {symbol}
                </li>
              ))}
            </ul>
          )
        } */}
        </form>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {recommendations && (
          <div className="mt-4 p-4 border border-gray-300 rounded">
            <h3 className="text-xl font-bold">Recommendations for {recommendations.symbol}</h3>
            <p><strong>Buy:</strong> {recommendations.buy}</p>
            <p><strong>Hold:</strong> {recommendations.hold}</p>
            <p><strong>Sell:</strong> {recommendations.sell}</p>
            <p><strong>Strong Buy:</strong> {recommendations.strongBuy}</p>
            <p><strong>Strong Sell:</strong> {recommendations.strongSell}</p>
          </div>
        )}
      </div>
  );
};

export default StockRecommendations;
