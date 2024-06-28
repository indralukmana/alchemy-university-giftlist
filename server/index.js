const express = require("express");
const verifyProof = require("../utils/verifyProof");

const port = 1225;

const app = express();
app.use(express.json());

// hardcode a merkle root here representing the whole nice list
const MERKLE_ROOT =
  "a129ca3faa529011dfe56c4d74ce42b3f00af3bc5aa0eeaa51d137035159bc06";

app.post("/gift", (req, res) => {
  const body = req.body;

  const { proof, name } = body;

  // prove that a name is in the list
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);

  if (isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
