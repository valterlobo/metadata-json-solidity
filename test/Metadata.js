require("hardhat-gas-reporter");

const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Metadata", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployContract() {

        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();

        const MetadataStorage = await ethers.getContractFactory("MetadataStorage");
        const metadataStorage = await MetadataStorage.deploy();

        return { metadataStorage, owner, otherAccount };
    }


    describe("ADD", function () {
        describe("ADD", function () {

            it("ADD attributes", async function () {
                const { metadataStorage } = await loadFixture(deployContract)

                await metadataStorage.addProperty(1,  "name", "CERTIFICADO")
                await metadataStorage.addProperty(1,  "image", "http://ipfs/QQQQQQQQ")
                await metadataStorage.addProperty(1,  "description", "Certificado de curso")

                await metadataStorage.addAttribute(1, "dados", "name", "JOAO")
                await metadataStorage.addAttribute(1, "dados", "doc", "543543543543543")
                await metadataStorage.addAttribute(1, "", "curso", "DEV GAMBIARRA")
                await metadataStorage.addAttribute(1, "", "turma", "2022/01")
                await metadataStorage.addAttribute(1, "", "matricula", "12022/1")
                await metadataStorage.addAttribute(1, "", "nota", "80")
                await metadataStorage.addAttribute(1, "", "ano", "2022")
                await metadataStorage.addAttribute(1, "", "instrutor", "Master Paulo")


                await metadataStorage.addProperty(2,  "name", "CERTIFICADO")
                await metadataStorage.addProperty(2,  "image", "http://ipfs/QQQQQQQQ/2.png")
                await metadataStorage.addProperty(2,  "description", 'A weapon found within Neon District.' + 
                "A Neon District: Season One game item, playable on https://portal.neondistrict.io." +             
                "Neon District is a free-to-play cyberpunk role-playing game. Collect characters and gear, craft and level up teams, and battle against other players through competitive multiplayer and in turn-based combat.")

                await metadataStorage.addAttribute(2, "dados", "name", "MARIA")
                await metadataStorage.addAttribute(2, "dados", "doc", "4344324343434")
                await metadataStorage.addAttribute(2, "", "curso", "DEV GAMBIARRA")
                await metadataStorage.addAttribute(2, "", "turma", "2022/01")
                await metadataStorage.addAttribute(2, "", "matricula", "22022/1")
                await metadataStorage.addAttribute(2, "", "nota", "80")
                await metadataStorage.addAttribute(2, "", "ano", "2022")
                await metadataStorage.addAttribute(2, "", "instrutor", "Master Paulo")

                const attribute = await metadataStorage.getAttributesJSON(2)

                console.log(attribute)
                console.log("----------");
                console.log(attribute);
                const jsonFromString =  hre.ethers.utils.toUtf8String(attribute);
                console.log('String to JSON: ', jsonFromString);
                console.log("----------");

            });


        });

    });
});
