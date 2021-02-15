import WalletConnectProvider from '@walletconnect/web3-provider';
import React, { Component } from 'react';
import { getChain } from 'evm-chains';
import Web3Modal from 'web3modal';
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3';

class App extends Component {

  async componentWillMount() {
    await this.init()
  }

  /** Settings for:
    *   Web3Modal+WalletConnect 
    *   Web3Modal+MetaMask,
    *   MetaMask.
  */ 
  async init() {
    // Declare WalletConnect
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: "db6231b5ef424bd9a61a76670e56086b",
        }
      }
    };

    var web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions, // required
      disableInjectedProvider: false, // Declare MetaMask
    });

    this.setState({web3Modal: web3Modal})

    //Settings for only MetaMask
    if(typeof window.ethereum!=='undefined'){
      let network, balance, web3

      window.ethereum.autoRefreshOnNetworkChange = false;

      //Update address&account when MM user change account
      //Coding Flag 5

      //Update chainID when after user modification
      //Coding Flag 5
    }
  }
  /**
    * "Connect" button, selecting provider via Web3Modal
  */ 
  async on(event) {
    event.preventDefault()

    // Restore provider session
     //await this.state.web3Modal.clearCachedProvider();
     let provider, account, network, balance, web3
    
    try {      
      // Activate windows with providers (MM and WC) choice
      provider = await this.state.web3Modal.connect();
      console.log('Provider: ', provider)

      this.setState({ loading: true, provider: null }) 

      if(provider.isMetaMask){ // When MetaMask was chosen as a provider
      //Flag 1

      }else {
        window.alert('Error, provider not recognized')
      }

      this.setState({
        // web3: web3,
         loading: false,
         account: account,
         balance: balance,
         provider: provider,
         network: network
      })

    } catch(e) {
      console.log("Could not get a wallet connection", e);
      return;
    }

    // //Update account&balance
    window.ethereum.on("accountsChanged", async (accounts) => {
      let account, balance, network

      this.setState({ account: null, balance: null, loading: true })      

      if(provider.isMetaMask && provider.selectedAddress!==null){
        //Flag 2
      } 

      this.setState({ account: accounts[0], balance: balance, loading: false })
    });

    //Update network
    window.ethereum.on("chainChanged", async (chainId) => {
      let account, balance, network
      
      this.setState({balance: null, network: null, loading: true })
      
      if(provider.isMetaMask && provider.selectedAddress!==null){
     
        //Flag 3
      
      }

      this.setState({ balance: balance, network: network, loading: false })
    });
  }

  /**
    * Disconnect button
   */
  async off(event) {
    event.preventDefault()

    if(this.provider===null || typeof this.provider==='undefined'){
      window.alert('Logout on MetaMask') // Inform to disconnect from MetaMask
    }
  }

  /** 
    * "Send ~ 0.1 ETH to yourself" button
  */
  async send(event){
  
  event.preventDefault()

  //Flag 6

    if(this.provider===null && !this.account) {
      window.alert('Error')
    } else if (this.provider.isMetaMask || this.provider ===null) { //MetaMask

    //Flag 7

    } 
  }

  constructor(props) {
    super(props)
    this.state = {
      account: null,
      balance: null,
      network: null,
      provider: null,
      loading: false,
      onlyNetwork: false
    }

    this.on = this.on.bind(this)
    this.off = this.off.bind(this)
    //this.send = this.send.bind(this)

  }

  render() {
    return (
      <div>
        <Navbar
          on={this.on}
          off={this.off}
          account={this.state.account}
          loading={this.state.loading}
        />&nbsp;
        <Main
          send={this.send}
          offQr={this.offQr}
          account={this.state.account}
          balance={this.state.balance}
          loading={this.state.loading}
          network={this.state.network}
          provider={this.state.provider}
          onlyNetwork={this.state.onlyNetwork}
        />
      </div>
    );
  }
}

export default App;