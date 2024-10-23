import React from 'react';

interface Transaction {
  type: string;
  amount: string;
  total: string;
  status: string;
  date: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  return (
    <div className="overflow-x-auto mt-6">
      <h2 className="text-3xl mb-4">Recent Transactions</h2>
      <div className="py-2 px-5  bg-[#131024] transaction-table rounded">
        <table className="table-auto w-full">
          <thead>
            <tr className='border-b border-[#ffffff1a]'>
              <th className="text-left py-3 text-gray-500">Transactions</th>
              <th className="text-right px-4 py-3 text-gray-500">Amount</th>
              <th className="text-right px-4 py-3 text-gray-500">Total</th>
              <th className="text-right px-4 py-3 text-gray-500">Status</th>
              <th className="text-right py-3 text-gray-500">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No recent transactions available.
                </td>
              </tr>
            ) : (
              transactions.map((transaction, index) => (
                <tr key={index}>
                  <td className="py-3">{transaction.type}</td>
                  <td className="text-right px-4 py-3">{transaction.amount}</td>
                  <td className="text-right px-4 py-3 text-gray-500">{transaction.total}</td>
                  <td className="text-right px-4 py-3">{transaction.status}</td>
                  <td className="text-right py- text-gray-500">{transaction.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
