// Copyright 2017 Rigo Investment Sarl.
// This file is part of RigoBlock.

// kovan register address 0xfAb104398BBefbd47752E7702D9fE23047E1Bca3

import * as abis from './abi';
import { REGISTRY_KOVAN, REGISTRY_HOMESTEAD } from '../Utils/const'


class Registry {
  constructor (api) {
    if (!api) {
      throw new Error('API instance needs to be provided to Registry')
    }
    this._api = api
    this._constunctorName = this.constructor.name
    this._getContractAddressFromRegister = this._getContractAddressFromRegister.bind(this);
  }

  /**
   * @param  {} contractName
   */
  _getContractAddressFromRegister = (contractName) =>{
    const api = this._api
    if (!contractName) {
      throw new Error('contractName needs to be provided to Registry')
    }
    // Checking if using Parity API and/or connected to Infura
    if (typeof api._parity !== 'undefined') {
      if (api.provider._url.includes("infura")) {
        console.log('Infura/MetaMask detected.')
        const registry = api.newContract(abis.registry, REGISTRY_KOVAN).instance;
        return Promise.all([
          registry.getAddress.call({}, [api.util.sha3(contractName), 'A'])
        ])
      }
      console.log('RigoBlock node detected.')
      return api.parity
      .registryAddress()
      .then((registryAddress) => {
        const registry = api.newContract(abis.registry, registryAddress).instance;
        return Promise.all([
          registry.getAddress.call({}, [api.util.sha3(contractName), 'A'])
        ])

      })
    }
    // Checking if using Web3
    if (typeof api.version !== 'undefined') {
      const registryContract = new api.eth.Contract(abis.registry)
      console.log('Web3 detected.')
      registryContract.options.address = REGISTRY_KOVAN
      return Promise.all([
        registryContract.methods.getAddress(api.utils.sha3(contractName), 'A').call()
      ])
      .then((address) =>{
        return address[0]
      })
    }
  }

  /**
   * @param  {} abi
   * @param  {} contractName
   */
  instance = (abi, contractName) => {
    if (!abi) {
      throw new Error('Contract ABI needs to be provided to Registry')
    }
    if (!contractName) {
      throw new Error('contractName needs to be provided to Registry')
    }
    const api = this._api
    const contract = this._getContractAddressFromRegister(contractName)
    .then((address) => {
      if (api._provider.isMetaMask) {
        return new api.eth.Contract(abi, address)
      }
      return api.newContract(abi, address)
    })
    return contract
  }
}

export default Registry;
