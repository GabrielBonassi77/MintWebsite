import { useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import testnft from './Testnft.json';

const testnftAddress = "0x8C72DBb556f31Cfd23C075598bD70Fa03EfaBa64";

const MainMint = ({ accounts, setAccounts }) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                testnftAddress,
                testnft.abi,
                signer
            );
            try {
                const response = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
                });
                console.log('response: ', response);
            } catch (err) {
                console.log("error: ", err)
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    };

    const handleIncrement = () => {
        if (mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    };

    return (
        <div>
            <h1>testNFT</h1>
            <p>These DOGO Test NFTs are radioactive. Mint at your own risk ☢️</p>
            <p>Max 3 Mints Per Wallet</p>
        {isConnected ? (
            <div>
                <div>
                    <button onClick={handleDecrement}>-</button>
                    <input type="number" value={mintAmount} />
                    <button onClick={handleIncrement}>+</button>
                </div>
                <button onClick={handleMint}>Mint Now</button>
            </div>
        ) : (
            <p>You Must Connect To Mint</p>
        )}
        
        </div>
    );
};

export default MainMint;