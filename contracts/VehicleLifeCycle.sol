pragma solidity ^0.4.10; //We have to specify what version of compiler this code will use

import "./strings.sol";
contract VehicleLifeCycle {
  using strings for *;
  string public s;
  function string_concat(string s2) {
      s = s.toSlice().concat(s2.toSlice());
    }
  struct Vehicle {
    string vin;
    string modelNumber;
    string engineNumber;
    string chesisNumber;
    string color;
    address owner;
  }

  mapping(string => Vehicle) uniqueVin;
  string[] public vehicleArray; //all vahicle

  function VehicleLifeCycle() {  // this is the CONSTRUCTOR (same name as contract) it gets called ONCE only when contract is first deployed
   //do nothing for now!!
  }

  function registerCar(string vin, string modelNumber, string engineNumber, string chesisNumber, string color) {
    var vehiclenew = Vehicle(vin, modelNumber ,engineNumber, chesisNumber,color, msg.sender);
    uniqueVin[vin] = vehiclenew;
    vehicleArray.push(vin);
  }

  function vehicleByVin(string vin) constant returns (string, string, string, string, string, address){
   return (uniqueVin[vin].vin, uniqueVin[vin].modelNumber, uniqueVin[vin].engineNumber, uniqueVin[vin].chesisNumber, uniqueVin[vin].color, uniqueVin[vin].owner);
  }

  function allVehicle() constant returns (string)
  {
    for (uint i ; i < vehicleArray.length; i++){
      string_concat(vehicleArray[i]);
      string_concat("::"); //add a delimeter
    }
    return s;
  }

  function transferOwnerShip(address to, string vin)
  {
    if (msg.sender == to) throw;
    uniqueVin[vin].owner = to;
  }


}
