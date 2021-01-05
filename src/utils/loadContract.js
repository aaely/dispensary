import Dispensary from '../abis/Dispensary.json'

export default async function loadContract() {
    const web3 = window.web3
    return new web3.eth.Contract(Dispensary, "0x352CEbc9f4D27840F736Ed84b9412F5eB39154F0") 
}