var VehicleLifeCycle = artifacts.require("./VehicleLifeCycle.sol");
var Strings = artifacts.require("./strings.sol");

module.exports = function(deployer) {
  deployer.deploy(VehicleLifeCycle,{gas: 500000});
  deployer.deploy(Strings,{gas: 500000});
};
