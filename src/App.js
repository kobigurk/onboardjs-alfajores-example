import logo from './logo.svg';
import './App.css';
import Onboard from 'bnc-onboard'
import Web3 from 'web3'
import Common from 'ethereumjs-common'


let web3;

const rpcUrl = "https://alfajores-forno.celo-testnet.org";
const onboard = Onboard({
  dappId: "07be5563-7d63-47c9-9cc1-4607d8337754",       // [String] The API key created by step one above
  networkId: 44787,  // [Integer] The Ethereum network ID your Dapp uses.
  networkName: 'Celo',
  subscriptions: {
    wallet: wallet => {
       web3 = new Web3(wallet.provider)
    }
  },
  walletSelect: {
    wallets: [
      {
        walletName: 'ledger',
        rpcUrl,
        customNetwork: {
          networkId: 44787,
"genesis":{
        "hash": "0x0b6d3e680af2fc525392c720666cce58e3d8e6fe75ba4b48cb36bcc69039229b",
        "chainId": 44787,
        "timestamp": null,
        "gasLimit": 6000000,
        "difficulty": 131072,
        "nonce": "0x0000000000000000",
        "extraData": "",
        "stateRoot": ""
    },
    "hardforks": [
        {
        "name": "chainstart",
        "block": 0,
        "consensus": "poa",
        "finality": null
        },
        {
        "name": "istanbul",
        "block": 4922294,
        "consensus": "poa",
        "finality": null
        }
    ],
    "bootstrapNodes": []
        }
      },
    ]
  },
  walletCheck: [
    { checkName: 'derivationPath' },
    { checkName: 'connect' },
    { checkName: 'accounts' },
    { checkName: 'network' },
    { checkName: 'balance', minimumBalance: '100000' }
  ]
});

async function login() {
  await onboard.walletSelect();
  await onboard.walletCheck();

  web3.eth.sendTransaction({
    chainId: 44787,
    from: '0x85238dad5822d34b74f5cb9532ec79e68ec9af75',
    to: '0x85238dad5822d34b74f5cb9532ec79e68ec9af75',
    value: '1000000000000000'
  })
  .then(function(receipt){
    console.log(JSON.stringify(receipt));
  });
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={login}>Login</button>
      </header>
    </div>
  );
}

export default App;
