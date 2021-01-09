import Dispensary from '../abis/Dispensary.json'

export default async function loadContract() {
    const web3 = window.web3
    return new web3.eth.Contract(Dispensary, "0x0eeF07a36302485fd02df846a0eEce825c57bCb9") 
}