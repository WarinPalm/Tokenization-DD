// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const INITIAL_SUPPLY = 1_000_000;

module.exports = buildModule("MyTokenModule", (m) => {

  const _initialSupply = m.getParameter("_initialSupply", INITIAL_SUPPLY);

  const myToken = m.contract("MyToken", [_initialSupply]);

  return { myToken };
});