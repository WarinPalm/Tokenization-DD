// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import "./ERC20.sol";

contract MyToken is ERC20 {
    string public name = "MyToken";
    string public symbol = "MTKN";
    uint public _decimals = 18;

    mapping(address => uint) balances;
    mapping(address => mapping(address => uint)) allowances; //address แรกคือเจ้าของเหรียญ --- address สองคือคนที่จะใช้เหรียญที่เราอนุญาติ

    constructor(uint _initialSupply) {
        totalSupply = _initialSupply * 10 ** _decimals;
        balances[msg.sender] = _initialSupply;
    }

    function balanceOf(address owner) public view override returns (uint) {
        return balances[owner];
    }

   function transfer(address to, uint amount) public override returns (bool) {
        require(balances[msg.sender] >= amount, "Not enough balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function approve(address spender, uint amount) public override returns (bool) {
        allowances[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address from,address to,uint amount) public override returns (bool) {
        require(balances[from]>=amount, "Not enough balances");
        require(allowances[from][msg.sender] >= amount, "Not enough allowances");
        balances[from]-= amount;
        balances[to] += amount;
        allowances[from][msg.sender] -= amount;
        emit Transfer(from, to, amount);
        return true;
    }

    function allowance(address owner,address spender) public view override returns (uint) {
        return allowances[owner][spender];
    }

    function decimals() public view override returns (uint) {
        return _decimals;
    }
}
