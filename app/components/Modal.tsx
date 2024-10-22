import React, { useState } from 'react';

type ModalProps = {
    stock: any; // The stock being bought or sold
    onConfirm?: (quantity: number) => void; // Confirm buy callback with quantity
    onCancel: () => void; // Cancel callback
    onConfirmSell?: (stock: any, quantity: number) => void; // Confirm sell callback
    mode: 'buy' | 'sell'; // To distinguish between buy and sell modal
    currentQuantity: number; // Current quantity for sell mode
};

const Modal: React.FC<ModalProps> = ({ stock, onConfirm, onCancel, onConfirmSell, mode, currentQuantity }) => {
    const [quantity, setQuantity] = useState<number>(1); // Initial quantity set to 1

    const handleIncrease = () => {
        setQuantity(prevQuantity => prevQuantity + 1); // Increase quantity by 1
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1); // Decrease quantity by 1 (minimum of 1)
        }
    };

    const totalPrice = (stock?.data?.c * quantity).toFixed(2); // Use optional chaining

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
                {stock && stock.data ? (
                    <>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            {mode === 'buy' ? 'Confirm Purchase' : 'Confirm Sale'}
                        </h3>
                        <p className="text-gray-700 mb-4">
                            {mode === 'buy' ? (
                                <>
                                    Are you sure you want to buy <strong>{stock.symbol}</strong> at the current price of{' '}
                                    <strong>${stock.data.c}</strong> per stock?
                                </>
                            ) : (
                                <>
                                    You have <strong>{currentQuantity}</strong> of <strong>{stock.symbol}</strong>. Are you sure you
                                    want to sell at <strong>${stock.data.c}</strong> per stock?
                                </>
                            )}
                        </p>

                        {/* Quantity controls */}
                        <div className="mb-4">
                            <p className="text-gray-700 mb-2">Quantity:</p>
                            <div className="flex items-center">
                                <button
                                    onClick={handleDecrease}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded-md"
                                    disabled={mode === 'sell' && quantity <= 1} // Disable if quantity is 1 in sell mode
                                >
                                    -
                                </button>
                                <span className="mx-4 text-lg">{quantity}</span>
                                <button
                                    onClick={handleIncrease}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded-md"
                                    disabled={mode === 'sell' && quantity >= currentQuantity} // Disable if quantity reaches currentQuantity
                                    >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Display the total price */}
                        <p className="text-gray-700 mb-6">
                            Total Price: <strong>${totalPrice}</strong>
                        </p>

                        <div className="flex justify-end">
                            <button
                                onClick={onCancel}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md mr-2"
                            >
                                Cancel
                            </button>

                            {mode === 'buy' ? (
                                <button
                                    onClick={() => onConfirm?.(quantity)} // Only for buying
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                                >
                                    Confirm Purchase
                                </button>
                            ) : (
                                <button
                                    onClick={() => onConfirmSell?.(stock, quantity)} // Only for selling
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                                >
                                    Confirm Sale
                                </button>
                            )}
                        </div>
                    </>
                ) : (
                    <p className="text-red-500">Stock data is unavailable.</p>
                )}
            </div>
        </div>
    );
};

export default Modal;
