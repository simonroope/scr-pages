/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const mnemonic = '';

//require ('@nomiclabs/hardhat-waffle');
require ('@nomiclabs/hardhat-ethers');
require('dotenv').config({ path: './.env' });

const tKeys = process.env.REACT_APP_KOVAN_WALLET_KEYS; 

const ktUrl = `https://kovan.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`;
const rtUrl = `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`;
const mUrl = `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`;
const btUrl = `https://data-seed-prebsc-1-s1.binance.org:8545`;
const bUrl = `https://bsc-dataseed.binance.org/`;

task("accounts", "Prints list of accounts", async () => {

  const accounts = await ethers.getSigners();
  accounts.forEach(a => console.log(a.address));

});

module.exports = {
  solidity: "0.8.0",
  networks: { 
    localhosthh: {
      url: "http://127.0.0.1:8545",
      gasPrice: 50e9,
      gas: 12450000
    },
    hardhat: {
      forking: {
        url: mUrl 
      }
    },
    kovan: {
      url: ktUrl,
      accounts: tKeys.split(',')
    },
    rinkeby: {
      url: rtUrl,
      accounts: tKeys.split(',')
    },
    bscTestnet: {
      url: btUrl,
      accounts: tKeys.split(','),
      network_id: 97
    },
    bsc: {
      url: bUrl,
      accounts: {mnemonic: mnemonic},
      network_id: 56,
      gas: 20000000000,
      skipDryRun: true
    }
  }
};
