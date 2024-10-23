import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../app/globals.css';
import Navbar from '@/app/components/Navbar';
import RootLayout from '@/app/layout';
import HomeStockTable from "../app/components/homeStockTable"

export default function Home() {

  const [stockData, setStockData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/stock-data');

        const sortedData = response.data.sort((a: any, b: any) => b.data.dp - a.data.dp);
        setStockData(sortedData);

        console.log(stockData);

        localStorage.setItem('stockData', JSON.stringify(response.data));

      } catch (error) {
        console.error('Error fetching stock data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  useEffect(() => {
    console.log('Updated stock data:', stockData); // This will log whenever stockData changes
  }, [stockData]);
  

  return (

    <main className='bg-black'>
      <RootLayout>
      <div className="bg-cover bg-center h-96 flex items-center justify-center home-banner">
        <div className="p-8 text-center home-banner-text">
          <h1 className="text-4xl text-white font-bold mb-4">Welcome Paper Trading App</h1>
          <p className="text-lg text-white mb-4 home-intro">Paper trading is virtual or simulated trading, is the practice of buying and selling assets in a simulated market without risking real money.</p>
          <button className="primary-button">
            Get Started
          </button>
          <button className="secondary-button mx-4">
            Login
          </button>
        </div>
      </div>
      
        <HomeStockTable stockData={stockData}/>

         {/* <header className="flex justify-between mb-8">
                        <div className="flex items-center">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded">More Assets</button>
                            <div className="ml-4">
                                <img src="profile-image.jpg" alt="Profile" className="w-10 h-10 rounded-full" />
                                <span className="ml-2">Han Ji Pyeong</span>
                            </div>
                        </div>
                    </header> */}
        </RootLayout>
    </main>


  );
}
