// @ts-ignore
import { run, ethers } from "hardhat";

const accounts = [
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC'
]

async function main() {
  await run("compile");
  // await run('deploy');
  const _name = 'User';
  const Contract = await ethers.getContractFactory(_name);
  
  const contract = await Contract.deploy();
  const res = await contract.minUserNft(accounts[0], 'daksdjald');
  const res1 = await contract.minUserNft(accounts[1], 'daksdjald1');
  const res2 = await contract.minUserNft(accounts[2], 'daksdjald2');
  console.log('-----------------done', res, res1,res2);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });