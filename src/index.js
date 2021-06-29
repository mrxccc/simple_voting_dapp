// const path = require('path');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// const contractPath = path.resolve(__dirname, '../contract_workflow/compiled/Voting.json');
contractAddr = "0x59a4e0aba063c9C7146a0B01EBe2135340E26a1e";
abi = "[{\"constant\":true,\"inputs\":[],\"name\":\"getBytes32ArrayForInput\",\"outputs\":[{\"name\":\"b32Arr\",\"type\":\"bytes32[3]\"}],\"payable\":false,\"stateMutability\":\"pure\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"candiateName\",\"type\":\"bytes32\"}],\"name\":\"totalVotesFor\",\"outputs\":[{\"name\":\"\",\"type\":\"uint8\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"votesReceived\",\"outputs\":[{\"name\":\"\",\"type\":\"uint8\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"candiateListName\",\"type\":\"bytes32\"}],\"name\":\"vote\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"canditateList\",\"outputs\":[{\"name\":\"\",\"type\":\"bytes32\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"}]"
contractInstance = new web3.eth.Contract(JSON.parse(abi),contractAddr);
candidates = { "Candidate": "candidate-1", "Alice": "candidate-2", "Cary": "candidate-3" };

let accounts;
web3.eth.getAccounts().then(result => accounts = result);

// const accounts = (async (i) => {
//     account = await web3.eth.getAccounts();
//     console.log(account[i])
//     return account[i];
// });

/*async*/ function vote() {
    let candidateName = $("#candidate").val();
    // let myaccount = await accounts(0);
    // console.log(accounts);
    try {
        contractInstance.methods.vote(stringtoHex(candidateName)).send({from: /*await accounts(0)*/accounts[0] })
        .on('transactionHash', function(hash){
            console.log("hash:" + hash)
            contractInstance.methods.totalVotesFor(stringtoHex(candidateName)).call().then(result => $("#" + candidates[candidateName]).html(result));
        })
        .on('confirmation', function(confirmationNumber, receipt){
            // console.log(confirmationNumber,receipt)
        })
        .on('receipt', function(receipt){
            // receipt example
            // console.log("receipt" +receipt);
        })
        .on('error', console.error);
    } catch (err) {
        console.log(err)
     }
} 

var stringtoHex = function (str) {
    var val = "";
    for (var i = 0; i < str.length; i++) {
        if (val == "")
            val = str.charCodeAt(i).toString(16);
        else
            val += str.charCodeAt(i).toString(16);
    }
    return "0x"+val
}

$(document).ready(function () {
    candidateNames = Object.keys(candidates);
    for (var i = 0; i < candidateNames.length; i++) {
        let name = candidateNames[i];
        contractInstance.methods.totalVotesFor(stringtoHex(name)).call().then(result => $("#" + candidates[name]).html(result));
        
        
    }
});