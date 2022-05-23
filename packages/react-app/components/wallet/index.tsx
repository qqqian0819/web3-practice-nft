import { useEffect, useState } from 'react';
import { ethers } from "ethers";
import { Typography } from 'antd';
import Faucet from './faucet';

const { Paragraph, Title, Text } = Typography;

/**
 * TODO: connent wallet, eg metaMask
 * This is a burner wallet, because in local development env, we often need multiple accouts. 
 * here, we can open incognito window to create wandom wallet.
 * uesed localStorage to cache the address/privateKey, key's prefix is 'web3-practice-nft_address'
 */
const BurnerWallet = () => {

  const provider = new ethers.providers.JsonRpcProvider(process.env.JSON_RPC_PROVIDER);


  const [myAddress, setMyAddress] = useState('');
  const [signer, setSigner] = useState();
  const [balance, setBalance] = useState('...');

  const refresBalance = async (addr: string) => {
    if (provider._isProvider && addr) {
      const balance = await provider.getBalance(addr);
      balance && setBalance(ethers.utils.formatEther(balance));
    }
  }

  // get wallet
  useEffect(() => {

    const localPrefixName = 'web3-practice-nft_address';
    const localAddress = window.localStorage.getItem(`${localPrefixName}`);
    const localAddressPK = window.localStorage.getItem(`${localPrefixName}_PK`);
    
    let wallet: any;
    if (localAddressPK) {
      wallet = new ethers.Wallet(localAddressPK);
      if (wallet.address !== localAddress) {
        wallet = null;
      }
    }

    // new random wallet
    if (!wallet) {
      const randomWallet = ethers.Wallet.createRandom();
      const privateKey = randomWallet._signingKey().privateKey;
      wallet = new ethers.Wallet(privateKey);
      // set localstorage
      window.localStorage.setItem(localPrefixName, randomWallet.address);
      window.localStorage.setItem(`${localPrefixName}_PK`, privateKey);
    }

    const connect = async () => {
      const newSigner = await wallet.connect(provider);
      // do something when success connnet
      setSigner(newSigner);
      setMyAddress(wallet.address);
      refresBalance(wallet.address);
    }

    wallet && connect();
  }, []);

  return (
    <div>
      <Title level={4}>钱包地址：</Title>
      <Paragraph copyable>{myAddress}</Paragraph>
      
      <Title level={4}>账户余额：</Title>
      <Paragraph>
        {balance} ether
        <Text strong> 等价于 </Text>
        {Number(balance) * Math.pow(10, 18)} wei
      </Paragraph>
    
      <Title level={4}>水龙头转账至本地钱包：</Title>
      <Faucet
        address={myAddress}
        provider={provider}
        onSuccess={refresBalance}
      />
    </div>
  )
}

export default BurnerWallet
