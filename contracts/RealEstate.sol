// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';

import 'hardhat/console.sol';

contract RealEstate is ERC1155 {

  address public admin;
  address public fAddress;
  address public reAddress;
  IERC20  public dai;

  uint propertyCount;
  uint investorCount;
  uint propId = 0;
  uint propTranId = 0;
  uint invTranId = 0;
  
  uint public constant F1 = 999;    // Fund Id
  uint public constant NFT = 1;

  enum INVEST { BUY, SELL }  // 0/1 - Invest/Redeem
 
  constructor(address _daiAddress) ERC1155('http://baseUrlToMetadata') {

    admin = msg.sender;
    dai = IERC20(_daiAddress);  

    reAddress = address(this);

    // Fund 1 - F1 id, mint 1500 shares + create address 
    fAddress = address(uint160(bytes20(keccak256(abi.encodePacked(admin,F1)))));  // '0x89ddda39179E4414E121A02114e897A48A3E5b8a';    
    _mint(address(this), F1, 1500, "");
  }

 
  struct Investor
  {
    address  investor;
    bytes32  name;
    bytes32  country;
    uint     shareBalance;
    uint     daiBalance;
  }
  
  mapping ( address => Investor ) public investors;
  Investor[] public allInvestors;             // investorList
  address[] public investorAddresses;
 
  struct Fund
  {
    bytes32  name;
    uint     nav;
    uint     sharesIssued;
    uint     sharePrice;
    uint     capitalValue;
    uint     cash;
    uint     investors;
  }

  mapping ( uint => Fund ) public funds;
  Fund[] public allFunds;

  struct Property
  {
    uint     id;
    bytes32  code;
    bytes32  name;
  }


  mapping ( address => Property ) public properties;
  mapping ( uint => address ) public propertyAddr;
  mapping ( uint => uint ) public propertyNoShares; 
  
  Property[] public allProperties;
  address[]  public propertyAddresses;

  
  event newInvestorEvent( address indexed investor, bytes32 name );
  event investInFundEvent( address indexed investor, uint indexed invest, uint daiAmount, uint shareAmount);

  function getAllInvestors() external view returns ( Investor[] memory ) {
    return allInvestors;
  }

  // Returns Name
  function getInvestorName ( address _investor ) external view returns ( bytes32 ) {
      return ( investors[_investor].name );
  }

  // Returns Share Balance
  function getInvestorStructBalance ( address _investor ) external view returns ( uint ) {
      return investors[_investor].shareBalance;
  }

  mapping ( address => uint ) public investorShareBalances;
  mapping ( address => uint ) public investorDaiBalances;
  mapping ( address => uint ) public fundDaiBalances;

  uint[] allInvestorShareBalances;
  uint public fundShareBalance;


  function addFund ( bytes32 _name )
    external {

      // Mapping - to Struct
      funds[0] = Fund ( { name: _name, nav: 0, sharesIssued: 0, sharePrice: 0, capitalValue: 0, cash: 0, investors: 0 });

      // Array
      Fund memory newFund = Fund ( { name: _name, nav: 0, sharesIssued: 0, sharePrice: 0, capitalValue: 0, cash: 0, investors: 0 });
      allFunds.push(newFund); 

    }

  function updateFund ( uint _nav, uint _sharesIssued, uint _sharePrice, uint _capitalValue, uint _cash, uint _investors )
    public {

     if ( _nav > 0 ) {
       funds[0].nav = _nav;
       allFunds[0].nav = _nav;
     }
     if ( _sharesIssued > 0 ) {
       funds[0].sharesIssued =  _sharesIssued;
       allFunds[0].sharesIssued = _sharesIssued;
     }
     if ( _sharePrice > 0 ) {
       funds[0].sharePrice =  _sharePrice;
       allFunds[0].sharePrice = _sharePrice;
     }
     if ( _capitalValue > 0 ) {
       funds[0].capitalValue =  _capitalValue;
       allFunds[0].capitalValue = _capitalValue;
     }
     if ( _cash > 0 ) {
       funds[0].cash =  _cash;
       allFunds[0].cash = _cash;
       fundDaiBalances[fAddress] = _cash;
     }
     if ( _investors > 0 ) {
       funds[0].investors =  _investors;
       allFunds[0].investors = _investors;
     }
  }

  function getFundBalances () external view returns ( Fund[] memory ) {
    return allFunds;   // Array of Structs
  }

  
  function investInFund ( uint _invest, bytes32 _name, bytes32 _country, uint _shareAmount, uint _daiAmount )  //  fundExists(_fundName)
    external {

      if ( _invest == 0 ) {  // Buy

        // Check balances
        require ( balanceOf(address(this),F1) >= _shareAmount, 'Insufficient Shares available' );
        require ( dai.balanceOf(msg.sender) >= _daiAmount, 'Investor has insufficient Dai' );

        // New Investor
        if ( investors[msg.sender].name == 0 ) {

          Investor memory newInvest = Investor ( { investor: msg.sender, name: _name, country: _country, shareBalance: 0, daiBalance: 1000000000000000000000});

          investors[msg.sender] = newInvest;
          // or investors[msg.sender] = Investor ( { investor: msg.sender, name: _name, country: _country, shareBalance: 0 });

          investorAddresses.push(msg.sender);
          allInvestors.push(newInvest); 

          investorDaiBalances[msg.sender] = 1000000000000000000000; 

          emit newInvestorEvent( msg.sender, _name );

        }

        // check if investor is listed
        require (investors[msg.sender].name > 0, "Investor does not exist");

        // Checks: Investor Dai balance and Shares remaining


        // Receive Dai from Investor. Investor approval required first. dai.approve(address(this),_daiAmount);
        // Investor invokes and SENDS Dai ( user MUST first approve Dai contract to spend, passing this SC address )  SC <= User
        dai.transferFrom( msg.sender, address(this), _daiAmount );

        _mint (msg.sender, F1, _shareAmount, '');
        _burn (address(this), F1, _shareAmount);

        // Balances
        investorShareBalances[msg.sender] = investorShareBalances[msg.sender] + (_shareAmount); // Mapping: investor addr => shares - mapping
        investorDaiBalances[msg.sender] = investorDaiBalances[msg.sender] - (_daiAmount);       // Mapping: investor addr => dai - mapping

        //Investor storage inv = investors[msg.sender];
        //inv.shareBalance = investorShareBalances[msg.sender];  // struct.balance
        // OR
        investors[msg.sender].shareBalance = investorShareBalances[msg.sender];  // Mapping: investor addr => Struct
        investors[msg.sender].daiBalance = investorDaiBalances[msg.sender];      // Mapping: investor addr => Struct

        for (uint i = 0; i < allInvestors.length; i++) {
          if (allInvestors[i].investor == msg.sender) {
            allInvestors[i].shareBalance = investorShareBalances[msg.sender];
            allInvestors[i].daiBalance = investorDaiBalances[msg.sender];
            break;
          }
        }          
        
        // Fund Balances
        fundDaiBalances[fAddress] = fundDaiBalances[fAddress] + (_daiAmount);   // Mapping to Uint 
        fundShareBalance = balanceOf(address(this),F1);

        // Fund Balances - Investor summaries
        uint fSharesIssued = 0;
        for (uint i = 0; i < allInvestors.length; i++) {
          fSharesIssued += allInvestors[i].shareBalance;
        }
      
        uint fInvestors = allInvestors.length;

        funds[0].sharesIssued = fSharesIssued;     // mapping to Struct
        allFunds[0].sharesIssued = fSharesIssued;  // array

        funds[0].investors = fInvestors; 
        allFunds[0].investors = fInvestors; 

        funds[0].cash = fundDaiBalances[fAddress]; 
        allFunds[0].cash = fundDaiBalances[fAddress]; 
      }
      
      if ( _invest == 1 ) {  // Withdraw from Fund

        require ( dai.balanceOf(address(this)) >= _daiAmount, 'Insufficient Dai available' );
        require ( investorShareBalances[msg.sender] >= _shareAmount, 'Investor has insufficient shares to redeem' );
        
        dai.transfer( msg.sender,_daiAmount);
        
        _burn ( msg.sender, F1, _shareAmount);
        _mint ( address(this), F1, _shareAmount,'');
        
        // Balances
        investorShareBalances[msg.sender] = investorShareBalances[msg.sender] - (_shareAmount);  // investor returns shares
        investorDaiBalances[msg.sender] = investorDaiBalances[msg.sender] + (_daiAmount);        // Mapping: investor addr => dai - mapping

        fundDaiBalances[fAddress] = fundDaiBalances[fAddress] - (_daiAmount); // Fund Dai balance decreases
        fundShareBalance = balanceOf(address(this),F1);                       // Fund shares increase
        
      }
      
      emit investInFundEvent(msg.sender, 0, _daiAmount, _shareAmount);
        
    }

  function getfundDaiBalance() external view returns ( uint ) {
    return fundDaiBalances[fAddress];
  }
 

  function buyProperty( bytes32 _code, bytes32 _name, uint _daiAmount, uint _shareAmount ) external onlyAdmin() {

    propertyCount++;
    propId++;
    propTranId++;

    // Property - Token id & mint X shares
    _mint(address(this), propId, NFT, "");
    _mint(address(this), propId+1000, _shareAmount, "");
    
    address pAddress = address(uint160(bytes20(keccak256(abi.encodePacked(admin,propId,NFT)))));
    
    propertyAddr[propId] = pAddress;
    propertyNoShares[propId] = _shareAmount;
    
    // Populate the structs
    Property memory prop = Property( propId, _code, _name );
    properties[pAddress] = prop;
    allProperties.push(prop);
    propertyAddresses.push(pAddress);
    
    // Pay for property
    dai.transfer(msg.sender,_daiAmount);
      
  }

  function getAllProperties() external view returns ( Property[] memory) {  // default getter function returns 1 record in the array.
    return allProperties;
  }
  
  function onERC1155Received() external pure returns (bytes4) { return bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)")); }
    
  modifier onlyAdmin() {
    require(msg.sender == admin, 'only admin');
    _;
  }
}
