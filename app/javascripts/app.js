// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

/* Raj Jha -
 * When we compile and deploy our POC contract,
 * truffle stores the abi and deployed address in a json
 * file in the build directory. We will use this information
 * to setup a POC abstraction. We will use this abstraction
 * later to create an instance of the POC contract.
 */

import vlc_artifacts from '../../build/contracts/VehicleLifeCycle.json'

var VehicleLifeCycle = contract(vlc_artifacts);

window.registerCar = function() {
  let vin = $("#vin").val();
  let modelNumber = $("#model_number").val();
  let engineNumber = $("#engine_number").val();
  let chesisNumber = $("#chesis_number").val();
  let color = $("#color").val();
  if ($("#vin").val().toString() == ""){
    $("#message").html("Please fill form properly");
    return
  }
  try {
    $("#message").html("Record has been submitted. Please wait...")
    $("#vin").val("");
    $("#model_number").val("");
    $("#engine_number").val("");
    $("#chesis_number").val("");
    $("#color").val("");

    VehicleLifeCycle.deployed().then(function(contractInstance) {
      contractInstance.registerCar(vin,modelNumber,engineNumber,chesisNumber,color, {gas: 140000, from: web3.eth.accounts[0]}).then(function() {
        return contractInstance.allVehicle.call().then(function(v) {
          alert(v);
          $("#car_list").html(v.toString());
          $("#message").html("");
        });
      });
    });
  } catch (err) {
    $("#message").html(err);
    console.log(err);
  }
}

$( document ).ready(function() {
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source like Metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  VehicleLifeCycle.setProvider(web3.currentProvider);
});
