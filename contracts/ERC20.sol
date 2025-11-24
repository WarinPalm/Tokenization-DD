// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

abstract contract ERC20 {
    uint public totalSupply;
    
    function balanceOf(address owner) virtual public view returns(uint);

    function transfer(address to, uint amount) virtual public returns(bool);

    function transferFrom(address from, address to, uint amount) virtual public returns(bool);

    function approve(address spender, uint amount) virtual public returns(bool);

    function allowance(address owner, address spender) virtual view public returns(uint);

    function decimals() public virtual view returns(uint);

    event Transfer(address indexed from, address indexed to, uint amount);
    event Approval(address indexed owner, address indexed spender, uint amount);


}