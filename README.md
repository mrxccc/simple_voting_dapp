# simple_voting_dapp
一个以太坊链的简单投票小程序
# 如何运行
1.安装依赖,依赖主要包ganache-cli@6.12.2、solc@0.4.22、web3@1.3.6
>`npm install`

2.手动启动ganache程序，运行一个节点，保持终端不关闭
windows
> `.\node_modules\.bin\ganache-cli`

3.编译voting.sol投票合约
windows
>`node .\contract_workflow\scripts\compile.js`

4.部署合约
windows
>`node .\contract_workflow\scripts\deploy.js`

会出现以下信息
> 部署合约的账户： 0x8C6ba0616f05909eCb334C1a3707C38a8d7bDd0F
合约部署成功: 0xaCCBC818BC9224A6da2902eeF82c3d14afC82aB5
合约部署耗时: 345.211ms

5.运行界面
修改src/index.js中contractAddr合约地址变量为部署合约时返回的合约地址0xaCCBC818BC9224A6da2902eeF82c3d14afC82aB5
本地打开src/index.html，出现以下界面
![avatar](./src/voting.png)