import React from 'react';

interface Transaction {
  type: string;
  amount: string;
  total: string;
  status: string;
  date: string;
}

const transactions: Transaction[] = [
  { type: 'Ethereum Purchased', amount: '0.0184 ETH', total: '$30', status: 'Pending', date: 'February 21, 2021' },
  { type: 'Bitcoin Purchased', amount: '0.3 BTC', total: '$40', status: 'Done', date: 'February 18, 2021' },
  // ... more transactions
];

const TransactionTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Total</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{transaction.type}</td>
              <td className="border px-4 py-2">{transaction.amount}</td>
              <td className="border px-4 py-2">{transaction.total}</td>
              <td className="border px-4 py-2">{transaction.status}</td>
              <td className="border px-4 py-2">{transaction.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;