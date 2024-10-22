import React from 'react';

interface Cryptocoin {
  name: string;
  updated: string;
  change: string;
  price: string;
}

const cryptocoins: Cryptocoin[] = [
  { name: 'Bitcoin (BTC)', updated: '1 minute ago', change: '+264%', price: '$12,729' },
  // ... more cryptocoins
];

const CryptocoinTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Cryptocoin</th>
            <th className="px-4 py-2">Updated</th>
            <th className="px-4 py-2">Change</th>
            <th className="px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {cryptocoins.map((cryptocoin, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{cryptocoin.name}</td>
              <td className="border px-4 py-2">{cryptocoin.updated}</td>
              <td className="border px-4 py-2">{cryptocoin.change}</td>
              <td className="border px-4 py-2">{cryptocoin.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptocoinTable;