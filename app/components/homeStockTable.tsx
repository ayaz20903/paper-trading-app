import React, { useState } from 'react';

type DashboardProps = {
    stockData: any[];
}

const HomeStockTable: React.FC<DashboardProps> = ({ stockData }) => {
    const [searchValue, setSearchValue] = useState<string>(''); // Manage search input

    // Filtered stock data based on search input
    const filteredStockData = stockData.filter(stock =>
        stock.symbol.toLowerCase().includes(searchValue.toLowerCase())
    );

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value); // Update the search value
    };

    return (
            <div className="w-[90%] mx-auto px-20 py-10 mt-10 container bg-[#13102478] border border-[#ffffff1a] rounded">
                {/* Search Bar */}
                <div className="flex justify-center mb-4">
                    <input
                        type="text"
                        placeholder="Search by stock symbol"
                        value={searchValue}
                        onChange={handleSearchChange} // Update search value on typing
                        className="border rounded p-2 w-full max-w-md text-black"
                    />
                </div>

                {/* Stock Table */}
                <div className="flex items-center justify-center">
                    <table className="w-full home-stock-table">
                        <thead className="h-[70px]">
                            <tr>
                                <th className="text-left text-sm font-bold">Asset</th>
                                <th className="text-center text-sm font-bold">Daily Change %</th>
                                <th className="text-right text-sm font-bold">Current Price</th>
                                <th className="text-right text-sm font-bold">High Price</th>
                                <th className="text-right text-sm font-bold">Low Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStockData.length > 0 ? (
                                filteredStockData.map((stock, index) => (
                                    <tr key={index} className='border-b border-white last:border-none'>
                                        <td className=" py-[15px]  text-left text-sm font-medium">
                                            {stock.symbol}
                                        </td>
                                        <td className=" py-[15px] border-white text-center text-sm font-medium">
                                            {stock.data.dp.toFixed(2)}%
                                        </td>
                                        <td className=" py-[15px] border-white text-right text-sm font-medium">
                                            ${stock.data.c}
                                        </td>
                                        <td className=" py-[15px] border-white text-right text-sm font-medium">
                                            ${stock.data.h}
                                        </td>
                                        <td className=" py-[15px] border-white text-right text-sm font-medium">
                                            ${stock.data.l}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-[15px]">
                                        No stocks found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
    );
}

export default HomeStockTable;
