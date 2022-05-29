pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @dev Role Types: owner, author, normal 
   owner: 
   admin: xxxx, manage whitelist(named authorList)
   author: in whitelist; cant create the topic content;
   normal: everybody; only can comment topic or follw topic
 */
contract Acess is AccessControl {
  // define the types of role
  bytes32 public constant ADMIN_ROLE = keccak256('ADMIN_ROLE');
  bytes32 public constant AUTHOR_ROLE = keccak256('AUTHOR_ROLE');
  bytes32 public constant NORMAL_ROLE = keccak256('NORMAL_ROLE');
  address[] private authorList;

  constructor(address admin, address author, address normal) {
    super._setupRole(ADMIN_ROLE, admin);
    super._setupRole(AUTHOR_ROLE, author);
    super._setupRole(NORMAL_ROLE, normal);
  }
  
  function setAuthor(address user) public onlyRole(ADMIN_ROLE) {
    authorList.push(user);
  }

  function removeAuthor(address user) public onlyRole(ADMIN_ROLE) {
    for (uint256 index = 0; index < authorList.length; index++) {
      if (authorList[index] == user) {
        authorList[index] = authorList[authorList.length - 1];
        authorList.pop();
        break;
      }
    }
  }
}