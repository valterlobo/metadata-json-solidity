const main = async () => {
  const MetadataStorage = await hre.ethers.getContractFactory('MetadataStorage')
  const metadataStorage = await MetadataStorage.deploy()
  await metadataStorage.deployed()

  console.log("MetadataStorage deployed to:", metadataStorage.address)

}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();