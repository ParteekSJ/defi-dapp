import map from "@artifacts/deployments/map.json";
import { ethers } from "ethers";

export const loadContract = async (chain, contractName, web3Provider) => {
  // Get the address of the most recent deployment from the deployment map
  let address;
  try {
    address = map[chain][contractName][0];
  } catch (e) {
    console.log(
      `Couldn't find any deployed contract "${contractName}" on the chain "${chain}".`
    );
    return undefined;
  }

  // Load the artifact with the specified address
  let contractArtifact;
  try {
    contractArtifact = await import(
      `../artifacts/deployments/${chain}/${address}.json`
    );
  } catch (e) {
    console.log(
      `Failed to load contract artifact "./artifacts/deployments/${chain}/${address}.json"`
    );
    return undefined;
  }

  // return new web3Provider.eth.Contract(contractArtifact.abi, address);
  return new ethers.Contract(address, contractArtifact.abi, web3Provider);
};
