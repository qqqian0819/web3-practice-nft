import { useEffect, useState } from 'react';
import { ethers } from "ethers";
import { Button, Input, Typography } from 'antd';
import Faucet from './faucet';

const { Paragraph, Title, Text } = Typography;
const { Search } = Input;

/**
 * TODO: connent wallet, eg metaMask
 * This is a burner wallet, because in local development env, we often need multiple accouts. 
 * here, we can open incognito window to create wandom wallet.
 * uesed localStorage to cache the address/privateKey, key's prefix is 'web3-practice-nft_address'
 */
const BurnerWallet = () => {

  const provider = new ethers.providers.JsonRpcProvider(process.env.JSON_RPC_PROVIDER);
  const [signer, setSigner] = useState();

  const [balance, setBalance] = useState('...');
  const refresBalance = async (addr: string) => {
    if (provider._isProvider && addr) {
      const balance = await provider.getBalance(addr);
      balance && setBalance(ethers.utils.formatEther(balance));
    }
  }

  // get wallet
  const [myAddress, setMyAddress] = useState('');
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

  const getContract = async (contractName: string) => {
    // hardhat deploy export to this path
    const contractListPromise = import("../../contracts/hardhat_contracts.json");
    const deployedContracts = (await contractListPromise).default ?? {};
    const chainId = provider._network.chainId;
    const localContract = deployedContracts[chainId]?.[0]?.contracts?.[contractName] || {};
    const contracts = new ethers.Contract(
      localContract.address,
      localContract.abi,
      signer
    );
    return contracts;
  }

  // const [userName, setUserName] = useState('');
  const createUserNft = async (userName: string) => {
    const contracts = await getContract('User');
    const res = await contracts.setGreeting(`Hello, ${userName}!`)
    console.log('-------------contracts1', { greet: res, contracts, provider, signer });
  }

  return (
    <div>
      <Title level={4}>???????????????</Title>
      <Paragraph copyable>{myAddress}</Paragraph>
      
      <Title level={4}>???????????????</Title>
      <Paragraph>
        {balance} ether
        <Text strong> ????????? </Text>
        {Number(balance) * Math.pow(10, 18)} wei
      </Paragraph>
      
      <Title level={4}>?????????????????????????????????</Title>
      <Faucet
        address={myAddress}
        provider={provider}
        onSuccess={refresBalance}
      />

      <div style={{paddingTop: '20px'}}>
        <Title level={4}>????????????NFT???</Title>
        <Search
          placeholder="placeholder your name "
          allowClear
          defaultValue="qqqian0819"
          enterButton="????????????????????????NFT"
          size="large"
          onSearch={createUserNft}
        />
      </div>
    </div>
  )
}

export default BurnerWallet
