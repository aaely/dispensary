import Dispensary from '../abis/Dispensary.json'

export default async function loadContract() {
    const web3 = window.web3
    return new web3.eth.Contract(Dispensary, "0x5419A7892cc81B820BBe23adA99d0fa69bF146B5") 
}