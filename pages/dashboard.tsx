import React, { useEffect, useState } from 'react';
import RootLayout from '@/app/layout';
import AssetCard from '@/app/components/AssetCard';
import StockRecommendations from '@/app/components/StockRecommendations';
import TradersProfile from '@/app/components/TradersProfile';
import Modal from '@/app/components/Modal'; // Import the Modal component

const Dashboard: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [filteredStockData, setFilteredStockData] = useState<any[]>([]);
    const [selectedStocks, setSelectedStocks] = useState<any[]>([]);
    const [boughtAssets, setBoughtAssets] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal visibility state
    const [stockToBuy, setStockToBuy] = useState<any | null>(null); // Stock to be confirmed for purchase
    const [isSellModalOpen, setIsSellModalOpen] = useState<boolean>(false); // Sell modal visibility
    const [stockToSell, setStockToSell] = useState<any | null>(null); // Stock to be sold
    const [currentQuantity, setCurrentQuantity] = useState<number>(0); // To hold the current quantity for selling


    // getting initial data from localstorage
    useEffect(() => {
        const storedBoughtAssets = localStorage.getItem('boughtStocks');
        if (storedBoughtAssets) {
            setBoughtAssets(JSON.parse(storedBoughtAssets));
        }
    }, []);

    const totalPrice = boughtAssets.reduce((acc, stock) => acc + parseFloat(stock.totalPrice), 0).toFixed(2);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        filterStockData(value);
    };

    // filter searches stocks from available stocks
    const filterStockData = (value: string) => {
        const storedData = localStorage.getItem('stockData');
        if (storedData) {
            const stockData = JSON.parse(storedData);
            const filteredData = stockData.filter((stock: any) =>
                stock.symbol.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredStockData(filteredData);
        }
    };

    // show stock stack screen
    const handleStockClick = (stock: any) => {
        const isAlreadySelected = selectedStocks.some(selected => selected.symbol === stock.symbol);
        if (!isAlreadySelected) {
            setSelectedStocks([...selectedStocks, stock]);
            setInputValue('');
            setFilteredStockData([]);
        }
    };

    // delete stock from the stack
    const handleStockDelete = (symbol: any) => {
        const updatedStocks = selectedStocks.filter(stock => stock.symbol !== symbol);
        setSelectedStocks(updatedStocks);
    };

    // update stockToBuy and open modal
    const handleBuyClick = (stock: any) => {
        setStockToBuy(stock); // Store the stock to be bought
        setIsModalOpen(true); // Open the modal
    };

    // checks localstorage if the stock is availabe if yes  add 
    const handleConfirmBuy = (quantity: number) => {
        if (stockToBuy) {

            // checks localstorage is availabe 
            const storedBoughtAssets = localStorage.getItem('boughtStocks');
            let updatedBoughtAssets = [];


            if (storedBoughtAssets) {
                const boughtStocks = JSON.parse(storedBoughtAssets);

                // if localstorage has data check if the stock is already purchased
                const existingStockIndex = boughtStocks.findIndex((stock: any) => stock.symbol === stockToBuy.symbol);

                // if yes update the buy quantity and update
                if (existingStockIndex !== -1) {
                    const existingStock = boughtStocks[existingStockIndex];
                    const updatedStock = {
                        ...existingStock,
                        quantity: existingStock.quantity + quantity,
                        totalPrice: (
                            parseFloat(existingStock.totalPrice) + (stockToBuy.data.c * quantity)
                        ).toFixed(2),
                    };

                    boughtStocks[existingStockIndex] = updatedStock;
                } else {
                    const newStock = {
                        symbol: stockToBuy.symbol,
                        price: stockToBuy.data.c,
                        quantity: quantity,
                        totalPrice: (stockToBuy.data.c * quantity).toFixed(2),
                    };
                    boughtStocks.push(newStock);
                }

                updatedBoughtAssets = boughtStocks;
            } else {
                const newStock = {
                    symbol: stockToBuy.symbol,
                    price: stockToBuy.data.c,
                    quantity: quantity,
                    totalPrice: (stockToBuy.data.c * quantity).toFixed(2),
                };
                updatedBoughtAssets = [newStock];
            }

            setBoughtAssets(updatedBoughtAssets);
            localStorage.setItem('boughtStocks', JSON.stringify(updatedBoughtAssets));

            setIsModalOpen(false);
            setStockToBuy(null);
        }
    };

    const handleSellClick = (stock: any) => {
        setStockToSell(stock);
        setIsSellModalOpen(true);
    };

    const handleCancelBuy = () => {
        setIsModalOpen(false);
        setStockToSell(null);
    };


    const handleConfirmSell = (stock: any, quantity: number) => {
        const updatedBoughtAssets = boughtAssets.reduce((acc, asset) => {
            if (asset.symbol === stock.symbol) {
                if (asset.quantity > quantity) {
                    acc.push({
                        ...asset,
                        quantity: asset.quantity - quantity,
                        totalPrice: ((asset.quantity - quantity) * asset.price).toFixed(2),
                    });
                    setCurrentQuantity(asset.quantity); // Get the current quantity

                }
                return acc;
            }
            acc.push(asset);
            return acc;
        }, [] as any[]);

        setBoughtAssets(updatedBoughtAssets);
        localStorage.setItem('boughtStocks', JSON.stringify(updatedBoughtAssets));
        
        // Close the sell modal
        setIsSellModalOpen(false);
        setStockToSell(null);
    };

    return (
        <RootLayout>
            <section className='flex'>
                <div className="p-4 w-4/5">
                    <h1>Dashboard</h1>

                    <form onSubmit={(e) => e.preventDefault()} className="mb-4">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Enter stock symbol (e.g., AAPL)"
                            className="border rounded p-2"
                        />
                    </form>

                    {filteredStockData.length > 0 && (
                        <div>
                            <ul className='flex flex-wrap items-center justify-start'>
                                {filteredStockData.map((stock) => (
                                    <li
                                        key={stock.symbol}
                                        onClick={() => handleStockClick(stock)}
                                        className="secondary-button p-[8px] text-xs mr-1.5 mb-1.5"
                                    >
                                        {stock.symbol}: ${stock.data.c} ({stock.data.dp.toFixed(2)}%)
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {selectedStocks.map((stock) => (
                        <div key={stock.symbol} className="mt-4 p-4 border border-gray-300 rounded">
                            <h3 className="text-lg font-bold">{stock.symbol}</h3>
                            <div className='flex items-center justify-between mb-1'>
                                <p><strong>Current: </strong> ${stock.data.c}</p>
                                <p><strong>High: </strong> ${stock.data.h}</p>
                                <p><strong>Low: </strong> ${stock.data.l}</p>
                                <p><strong>Open: </strong> ${stock.data.o}</p>
                                <p><strong>Daily %: </strong> {stock.data.dp}%</p>
                                <button
                                    onClick={() => handleStockDelete(stock.symbol)}
                                    className="bg-red-500 text-white p-2 rounded-md w-[75px]"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleBuyClick(stock)} // Open modal for confirmation
                                    className="bg-green-500 text-white p-2 rounded-md w-[75px]"
                                >
                                    Buy
                                </button>
                                <button
                                    onClick={() => handleSellClick(stock)} // Open modal for selling
                                    className="bg-yellow-500 text-white p-2 rounded-md w-[75px]"
                                >
                                    Sell
                                </button>
                            </div>
                        </div>
                    ))}

                    <AssetCard onConfirmSell={handleConfirmSell} boughtAssets={boughtAssets} />
                </div>
                <div className="container mx-auto px-4 py-8 w-1/5">
                    <TradersProfile boughtAssets={boughtAssets} totalPrice={totalPrice} />
                </div>
            </section>

            {/* Modal for confirming purchase */}
            {isModalOpen && stockToBuy && (
                <Modal
                    stock={stockToBuy}
                    onConfirm={handleConfirmBuy}
                    onCancel={handleCancelBuy}
                    mode="buy"
                    currentQuantity={currentQuantity}
                />
            )}
            {/* Modal for confirming sale */}
            {isSellModalOpen && stockToSell && (
                <Modal
                    stock={stockToSell}
                    onConfirmSell={handleConfirmSell}
                    onCancel={() => setIsSellModalOpen(false)} // Close sell modal without action
                    mode="sell"
                    currentQuantity={currentQuantity} // Pass the current quantity for selling
                />
            )}
        </RootLayout>
    );
};

export default Dashboard;
