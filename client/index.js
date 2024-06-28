const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main() {
  /**
   *  In this client function we check the leaf (name in this case), find the index
   *  then get proof from the merkle tree. This then sent to server and verified if
   *  the proof is in the merkle tree.
   */
  const name = "Indra Lukmana";
  const index = niceList.findIndex((n) => n === name);
  const merkleTree = new MerkleTree(niceList);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof,
    name,
  });

  console.log({ gift });
}

main();
