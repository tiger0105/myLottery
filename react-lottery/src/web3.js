import Web3 from 'web3';

window.ethereum.enable();

const currProvider = window.web3.currentProvider
const web3 = new Web3(currProvider);

export default web3;