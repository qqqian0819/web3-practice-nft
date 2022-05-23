import type { NextPage } from 'next';
import { Divider } from 'antd';
import Wallet from '../components/wallet';
import Artwork from '../components/artwork';

const Home: NextPage = () => {
  return (
    <div style={{padding: '50px 100px'}}>
      <Wallet />
      <Divider />
      <Artwork />
    </div>
  )
}

export default Home
