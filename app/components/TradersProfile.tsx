type TradersProfileProps = {
    boughtAssets?: { symbol: string; price: number ; totalPrice:number; quantity:number }[]; // New prop for bought assets
    totalPrice: number;
    clearAssets:() => void;
};

const TradersProfile: React.FC<TradersProfileProps> = ({ boughtAssets, totalPrice, clearAssets }) => {
   
    return (
        <div className="traders-profile h-full">
            <h2>Trader's Profile</h2>

            <div>
                <h4>Account</h4>
                <p>Joined</p>
                <p>AssetsTotal ${totalPrice} </p>
            </div>
            {boughtAssets && boughtAssets.length > 0 && (
                <div>
                    <h4>Assets</h4>
                    <ul>
                        {boughtAssets.map(asset => (
                            <li key={asset.symbol}>
                                {asset.symbol}: {asset.quantity}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <button onClick={(clearAssets)}>Clear Assets</button>
        </div>
    );
};

export default TradersProfile;
