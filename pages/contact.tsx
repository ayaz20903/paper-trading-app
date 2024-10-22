import React, { useState, useEffect } from 'react';
import RootLayout from '@/app/layout';
import axios from 'axios';


// const stockSymbolsList = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA']; // Add more stock symbols as needed
const Contact: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [recommendations, setRecommendations] = useState<any>(null);
    const [filteredStockData, setFilteredStockData] = useState<any[]>([]);
    const [selectedStocks, setSelectedStocks] = useState<any[]>([]); // Store selected stocks here
    const [error, setError] = useState<string | null>(null);
    const [hasTyped, setHasTyped] = useState<boolean>(false); // New state to track if user has typed

    const fetchStockRecommendations = async (symbol: string) => {
        // setLoading(true);
        setError(null);
    
        try {
          const response = await axios.get(
            `http://localhost:5000/api/stock-data?symbol=${symbol}`
          );
          if (response.data.length > 0) {
            setRecommendations(response.data); // Display the latest recommendation
            console.log(response.data)
          } else {
            setError('No recommendations found for this stock.');
          }
        } catch (err) {
          setError('Error fetching stock recommendations.');
        } finally {
        //   setLoading(false);
        }
      };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
      };


    const filterStockData = (value: string) => {
        // Retrieve stock data from local storage
        const storedData = localStorage.getItem('stockData');
        if (storedData) {
            const stockData = JSON.parse(storedData);
            // Filter based on input value
            const filteredData = stockData.filter((stock: any) =>
                stock.symbol.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredStockData(filteredData);
        }
    };

    const handleStockClick = (stock: any) => {
        // Check if the stock is already selected
        const isAlreadySelected = selectedStocks.some(selected => selected.symbol === stock.symbol);
        if (!isAlreadySelected) {
            setSelectedStocks([...selectedStocks, stock]); // Add stock to selected stocks
            setInputValue(''); // Clear the input field after selecting a stock
            setFilteredStockData([]); // Clear the filtered stock data (optional)
            setHasTyped(false); // Reset hasTyped to false after selection
        }
    };

    

    const handleStockDelete = (symbol: any) => {
        // Remove the stock with the given symbol from selectedStocks
        const updatedStocks = selectedStocks.filter(stock => stock.symbol !== symbol);
        setSelectedStocks(updatedStocks);
      };

      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputValue.trim()) {
          fetchStockRecommendations(inputValue.trim().toUpperCase());
        }
      };

    // const handleDelete = () => {
    //     setSelectedStocks(null);
    //   };

    return (

        <RootLayout>
            <div className="p-4">
                <h1>Dashboard</h1>

                <form onSubmit={handleSubmit} className="mb-4">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Enter stock symbol (e.g., AAPL)"
                        className="border rounded p-2"
                    />
                    <button type="submit" className="ml-2 bg-blue-500 text-white rounded p-2">
                        Filter Stock Data
                    </button>
                </form>

                {error && <p className="text-red-500">{error}</p>}

                {filteredStockData.length > 0 ? (
                    <div>
                        {/* <h2 className="text-xl font-bold">Filtered Stock Data</h2> */}
                        <ul className='flex flex-wrap items-center justify-start'>
                            {filteredStockData.map((stock) => (
                                <li
                                    key={stock.symbol}
                                    onClick={() => handleStockClick(stock)} // Make stock clickable
                                    className="secondary-button p-[8px] text-xs mr-1.5 mb-1.5"
                                >
                                    {stock.symbol}: ${stock.data.c} ({stock.data.dp.toFixed(2)}%)
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    hasTyped && <p>No stocks found matching your input.</p> // Only show message if user has typed
                )}

                {/* Display full details of the selected stocks */}
                {selectedStocks.map((stock) => (
                    <div key={stock.symbol} className="mt-4 p-4 border border-gray-300 rounded">
                        <h3 className="text-lg font-bold">Stock Details for {stock.symbol}</h3>
                        <p><strong>Current Price:</strong> ${stock.data.c}</p>
                        <p><strong>High Price:</strong> ${stock.data.h}</p>
                        <p><strong>Low Price:</strong> ${stock.data.l}</p>
                        <p><strong>Open Price:</strong> ${stock.data.o}</p>
                        <p><strong>Previous Close Price:</strong> ${stock.data.pc}</p>
                        <p><strong>Daily Change %:</strong> {stock.data.dp}%</p>
                        <button
                            onClick={() => handleStockDelete(stock.symbol)} // Delete button to remove stock
                            className="bg-red-500 text-white p-2 rounded-md mt-4"
                        >
                            Delete
                        </button>
                    </div>
                ))}

                

                {/* <StockRecommendations /> */}
            </div>
        </RootLayout>
    );
};

export default Contact;
