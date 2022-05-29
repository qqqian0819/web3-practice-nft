pragma solidity ^0.8.0; 
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

/**
 * @title about user: mintNft and avator
 * @notice everybody cant mint own userinfo nft
 */
contract User is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  
  constructor() ERC721("UserToken", "UNFT") {
    console.log('--------------------user123');
  }

  // 生成用户 nft
  function minUserNft(address addr, string memory tokenURI) public returns(uint256) {
    uint256 newItemId = _tokenIds.current();
    _mint(addr, newItemId);
    _setTokenURI(newItemId, tokenURI);
    _tokenIds.increment();
    return newItemId;
  }
}