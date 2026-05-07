const hre = require("hardhat");

async function main() {
  console.log("Deploying AgriTrust supply chain contract...");

  const AgriTrust = await hre.ethers.getContractFactory("AgriTrust");
  const agriTrust = await AgriTrust.deploy();

  await agriTrust.waitForDeployment();

  console.log(
    `AgriTrust deployed to: ${await agriTrust.getAddress()}`
  );
  console.log("Network: Polygon");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
