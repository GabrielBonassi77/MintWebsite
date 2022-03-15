
const hre = require("hardhat");

async function main() {
 

  const Testnft = await hre.ethers.getContractFactory("Testnft");
  const testnft = await Testnft.deploy();

  await testnft.deployed();

  console.log("Testnft deployed to:", testnft.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
