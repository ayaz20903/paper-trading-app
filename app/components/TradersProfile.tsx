import Image from 'next/image';
import avatar from "../images/avatar.png";

type TradersProfileProps = {
    boughtAssets?: { symbol: string; price: number ; totalPrice:number; quantity:number }[]; // New prop for bought assets
    totalPrice: number;
    clearAssets:() => void;
};

const TradersProfile: React.FC<TradersProfileProps> = ({ boughtAssets, totalPrice, clearAssets }) => {
   
    return (
        <div className="traders-profile sticky top-10">
            <h2 className="text-center">Trader's Profile</h2>
            <div className='flex items-center flex-col justify-center w-full py-8'>
                {/* <div className='text-center w-full'> */}
                <Image
                      src={avatar}
                      width={70}
                      height={70}
                      alt="chart picture"
                    />
                {/* </div> */}
                <p className='mt-5'>Mohd Ayaz Qureshi</p>
            
            </div>

            <div className='pb-5 border-[#ffffff1a] border-b'>
                <h4 className=''>Account</h4>
                <p className='text-gray-500 flex items-center justify-between py-3'>Joined <span className='text-[#E1DFEC]'>Oct 23, 2024</span></p>
                <p className='text-gray-500 flex items-center justify-between'>AssetsTotal <span className='text-[#E1DFEC]'>${totalPrice}</span> </p>
            </div>
            {boughtAssets && boughtAssets.length > 0 && (
                <div className='py-5'>
                    <h4 className='pb-2'>Assets</h4>
                    <ul>
                        {boughtAssets.map(asset => (
                            <li key={asset.symbol} className='py-1 text-gray-500 flex items-center justify-between'>
                                {asset.symbol}
                                <span className='text-[#E1DFEC]'>{asset.quantity}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <button className='bg-gray-500 text-white p-2 rounded-md ' onClick={(clearAssets)}>Clear Assets</button>
        </div>
    );
};

export default TradersProfile;
