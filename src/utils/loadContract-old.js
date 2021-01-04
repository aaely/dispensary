import Dispensary from '../abis/Dispensary.json'

export default async function loadContract() {
    const web3 = window.web3
    return new web3.eth.Contract(Dispensary, "0xc4851e498AF8EA8C63EA6b9E71Bec07c402d405C") 
}