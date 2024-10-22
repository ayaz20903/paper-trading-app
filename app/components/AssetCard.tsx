import React, { useState } from 'react';
import Modal from '@/app/components/Modal';

type AssetCardProps = {
  onConfirmSell: (stock: any, quantity: number) => void; // Confirm sell callback
  boughtAssets?: { symbol: string; price: number; totalPrice: number; quantity: number; }[]; // Updated prop to include quantity
};

const AssetCard: React.FC<AssetCardProps> = ({ boughtAssets, onConfirmSell }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [stockToSell, setStockToSell] = useState<any | null>(null);
  const [currentQuantity, setCurrentQuantity] = useState<number>(0); // Store the current quantity of the stock

  const handleSellClick = (symbol: string) => {
    const storedBoughtAssets = localStorage.getItem('boughtStocks');
    if (storedBoughtAssets) {
      const assets = JSON.parse(storedBoughtAssets);
      const asset = assets.find((item: any) => item.symbol === symbol);
      if (asset) {
        // Simulate fetching stock data (replace this with your actual stock data fetching logic)
        const stockData = {
          symbol: asset.symbol,
          data: {
            c: asset.price, // Assuming asset.price is the current price of the stock
          },
        };
        setCurrentQuantity(asset.quantity); // Set the current quantity
        setStockToSell(stockData); // Set the stock data
        setIsModalOpen(true); // Open the modal
      }
    }
  };

  const handleCancelSell = () => {
    setIsModalOpen(false); // Close modal without selling
    setStockToSell(null); // Clear stockToSell
  };

  const handleConfirmSell = (stock: any, quantity: number) => {
    const storedBoughtAssets = localStorage.getItem('boughtStocks');
    if (storedBoughtAssets) {
      const assets = JSON.parse(storedBoughtAssets);
      const assetIndex = assets.findIndex((item: any) => item.symbol === stock.symbol);
      
      if (assetIndex !== -1) {
        const updatedAssets = [...assets];
        const updatedAsset = { ...updatedAssets[assetIndex] };

        if (updatedAsset.quantity > quantity) {
          updatedAsset.quantity -= quantity; // Decrease the quantity
          updatedAssets[assetIndex] = updatedAsset;
        } else {
          updatedAssets.splice(assetIndex, 1); // Remove the asset if quantity reaches zero
        }

        localStorage.setItem('boughtStocks', JSON.stringify(updatedAssets)); // Update local storage
        onConfirmSell(stock, quantity); // Call the callback to update the parent component state
      }
    }
    setIsModalOpen(false); // Close the modal after selling
    setStockToSell(null); // Clear stockToSell
  };

  return (
    <div className="asset-card">
      <h2>Assets</h2>
      {boughtAssets && boughtAssets.length > 0 && (
        <div>
          <ul className="flex align-center justify-start flex-wrap">
            {boughtAssets.map(asset => (
              <li key={asset.symbol} className="mr-3 mb-3">
                <h3 className="text-xl font-bold">{asset.symbol}</h3>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <p className="text-3xl font-extrabold">${asset.totalPrice}</p>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleSellClick(asset.symbol)}
                      className="bg-green-500 text-white p-2 rounded-md w-[75px]"
                    >
                      Sell
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isModalOpen && stockToSell && (
        <Modal
          stock={stockToSell}
          onConfirmSell={handleConfirmSell}
          onCancel={handleCancelSell}
          mode="sell"
          currentQuantity={currentQuantity} // Pass the current quantity to the Modal
        />
      )}
    </div>
  );
};

export default AssetCard;
