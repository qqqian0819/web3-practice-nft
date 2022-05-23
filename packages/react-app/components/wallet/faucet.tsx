import { InputNumber, Button, message, Select } from 'antd';
import { useState } from 'react';
import { etherUnits } from '../../common/constant';

/**
 * init moeny from faucet for myAddress, so that I can do something in feature, eg pay gas fee
 * hardhat counts have money, so the counts[0] will be the faucet
 */
const Faucet = (props: any) => {

  const { provider, address, onSuccess } = props;
  
  // mabey only use 'wei' or 'eth', enough
  const [transValue, setTransValue] = useState(() => 
    etherUnits.map((key: string, index: number) => ({
        unit: key,
        value: Math.pow(10, 18 - (3 * index)) + '', // trans to equal 1 eth
        precision: 3 * index, //  "wei" is smallest, 1wei = Math.pow(10. 18)
    }))
  );

  const [selectedUnitIndex, setSelectedUnitIndex] = useState(0);

  const setMoneyToAddress = async () => {
    if (!provider._isProvider || !address) {
      message.error('there has some errors with faucet');
      return;
    }
    const price = transValue[selectedUnitIndex].value;
    const signer = provider.getSigner(); // default provider accouts 0
    // const faucetAddress = await signer.getAddress();
    const result = await signer.sendTransaction({
      to: address,
      value: price, // base all calculations in Wei.
    });

    console.log('-------------faucet result:', result);
    message.success(`success send ${price} eth to ${address}`);

    onSuccess(address, price);
  }

  return (
    <InputNumber
      style={{ width: '100%' }} 
      size="large"
      precision={transValue[selectedUnitIndex].precision}
      value={transValue[selectedUnitIndex].value}
      onChange={(v) => setTransValue(() => {
        let _transValue = transValue;
        _transValue[selectedUnitIndex].value = v;
        return _transValue;
      })}
      addonBefore={
        <Select
          value={transValue[selectedUnitIndex].unit}
          onSelect={(value: any) => setSelectedUnitIndex(value)}
          style={{ width: 100 }}
          options={transValue.map((item, index: number) => ({label: item.unit, value: index}))}
        />
      }
      addonAfter={
        <Button type="link" onClick={setMoneyToAddress}>转账</Button>
      } 
    />
  )
}

export default Faucet;
