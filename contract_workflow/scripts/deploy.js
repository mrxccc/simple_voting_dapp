const path = require('path');
const Web3 = require('web3');
const fs = require('fs-extra'); 
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
// 1. 拿到 abi 和 bytecode 
const contractPath = path.resolve(__dirname, '../compiled/Voting.json');
const { interface, bytecode } = require(contractPath);
(async () => {
    // 2. 获取钱包里面的账户
    const accounts = await web3.eth.getAccounts();
    console.log('部署合约的账户：', accounts[0]);
    // 3. 创建合约实例并且部署
    console.time('合约部署耗时');
    var result = await new
        web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode})
        .send({
            from: accounts[0],
            gas: 1500000,
            gasPrice: '30000000000000'
        })
        .then(function(newContractInstance){
            console.log('合约部署成功: ' + newContractInstance.options.address) // instance with the new contract address
        });
    console.timeEnd('合约部署耗时');
})();