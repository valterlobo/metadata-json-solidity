require("hardhat-gas-reporter");


const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { Contract, Provider } = require('ethers-multicall');

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

                await metadataStorage.addProperty(1, "name", "CERTIFICADO")
                await metadataStorage.addProperty(1, "image", "http://ipfs/QQQQQQQQ")
                await metadataStorage.addProperty(1, "description", "Certificado de curso")

                await metadataStorage.addAttribute(1, "dados", "name", "JOAO", "tagKey", "tagValue", "tagType")
                await metadataStorage.addAttribute(1, "dados", "doc", "543543543543543", "tagKey", "tagValue", "tagType")
                await metadataStorage.addAttribute(1, "", "instituicao", "OMEGA CURSOS", "tagKey", "tagValue", "tagType")
                await metadataStorage.addAttribute(1, "", "curso", "DEV GAMBIARRA", "tagKey", "tagValue", "tagType")
                await metadataStorage.addAttribute(1, "", "turma", "2022/01", "tagKey", "tagValue", "tagType")
                await metadataStorage.addAttribute(1, "", "matricula", "12022/1", "tagKey", "tagValue", "tagType")
                await metadataStorage.addAttribute(1, "", "nota", "80", "tagKey", "tagValue", "tagType")
                await metadataStorage.addAttribute(1, "", "ano", "2022", "tagKey", "tagValue", "tagType")
                await metadataStorage.addAttribute(1, "", "instrutor", "Master Paulo", "tagKey", "tagValue", "tagType")


                await metadataStorage.addProperty(2, "name", "CERTIFICADO")
                await metadataStorage.addProperty(2, "image", "http://ipfs/QQQQQQQQ/2.png")
                await metadataStorage.addProperty(2, "external_url", "http://ipfs/QQQQQQQQ/2.html")

                await metadataStorage.addProperty(2, "description", 'A weapon found within Neon District.' +
                    "A Neon District: Season One game item, playable on https://portal.neondistrict.io." +
                    "Neon District is a free-to-play cyberpunk role-playing game. Collect characters and gear, craft and level up teams, and battle against other players through competitive multiplayer and in turn-based combat.")

                await metadataStorage.addAttribute(2, "dados", "name", "MARIA", "tagKey", "tagValue", "tagType")
                await metadataStorage.addAttribute(2, "dados", "doc", "4344324343434", "tagKey", "tagValue", "tagType")
                await metadataStorage.addAttribute(2, "", "instituicao", "OMEGA CURSOS", "tagKey", "tagValue", "tagType")
                await metadataStorage.addAttribute(2, "", "curso", "DEV GAMBIARRA", "tagKey", "tagValue", "tagType")
                await metadataStorage.addAttribute(2, "", "turma", "2022/01", "tagKey", "tagValue", "tagType")
                await metadataStorage.addAttribute(2, "", "matricula", "22022/1", "tagKey", "tagValue", "tagType")
                await metadataStorage.addAttribute(2, "", "nota", "80", "tagKey", "tagValue", "tagType")
                await metadataStorage.addAttribute(2, "", "ano", "2022", "tagKey", "tagValue", "tagType")
                await metadataStorage.addAttribute(2, "", "instrutor", "Master Paulo", "tagKey", "tagValue", "tagType")

                let attribute = await metadataStorage.getMetadataJSON(2)



                console.log(attribute)
                console.log("----------");
                console.log(attribute);
                //const jsonFromString = hre.ethers.utils.toUtf8String(attribute)
                console.log('String to JSON: ', attribute);
                console.log("----------");

                await metadataStorage.updateAttribute(2, "dados", "name", "master");

                await metadataStorage.updateProperty(2, "name", "CERTIFICADO CURSO ABC")

                await metadataStorage.deleteProperty(2, "description")

                //await metadataStorage.deleteAttribute(2, "doc")
                //todo resolver o bug do ultimo ?
                //await metadataStorage.deleteAttribute(2, "instrutor")

                attribute = await metadataStorage.getMetadataJSON(2)
                console.log('String to JSON 2 : ', attribute);//hre.ethers.utils.toUtf8String(attribute)



            });


        });

        describe("NultCall", function () {

            it("MultCall", async function () {
                const { metadataStorage } = await loadFixture(deployContract)


                /*
                > let ABI = [
    "function transfer(address to, uint amount)"
];
> let iface = new ethers.utils.Interface(ABI);
> iface.encodeFunctionData("transfer", [ "0x1234567890123456789012345678901234567890", parseEther("1.0") ])
'0xa9059cbb00000000000000000000000012345678901234567890123456789012345678900000000000000000000000000000000000000000000000000de0b6b3a7640000'
                */



                let ABI = ["function addProperty(uint256,string,string)",
                    "function addAttribute(uint256,string,string,string,string,string,string)"
                ];

                let iface = new ethers.utils.Interface(ABI);

                let result = await metadataStorage.multicall([
                    iface.encodeFunctionData("addProperty", [1, "name", "CERTIFICADO"]),
                    iface.encodeFunctionData("addProperty", [1, "image", "ipfs://QQQQQQQQQQQQQ"]),
                    iface.encodeFunctionData("addProperty", [1, "description", "CERTIFICADO DO CURSO DE SOLIDITY"]),
                    iface.encodeFunctionData("addProperty", [1, "turma", "2022"]),
                    iface.encodeFunctionData("addProperty", [1, "tutor", "Marcos Paulo"]),
                    iface.encodeFunctionData("addProperty", [1, "periodo", "20/08/2022 - 10/10/2022"]),
                    iface.encodeFunctionData("addAttribute", [1, "dados", "name", "MARIA", "tagKey", "tagValue", "tagType"]),
                    iface.encodeFunctionData("addAttribute", [1, "dados", "doc", "4344324343434", "tagKey", "tagValue", "tagType"]),
                    iface.encodeFunctionData("addAttribute", [1, "", "instituicao", "OMEGA CURSOS", "tagKey", "tagValue", "tagType"]),
                    iface.encodeFunctionData("addAttribute", [1, "", "curso", "DEV GAMBIARRA", "tagKey", "tagValue", "tagType"]),
                    iface.encodeFunctionData("addAttribute", [1, "", "turma", "2022/01", "tagKey", "tagValue", "tagType"]),
                    iface.encodeFunctionData("addAttribute", [1, "", "matricula", "22022/1", "tagKey", "tagValue", "tagType"]),
                    iface.encodeFunctionData("addAttribute", [1, "", "nota", "80", "tagKey", "tagValue", "tagType"]),
                    iface.encodeFunctionData("addAttribute", [1, "", "ano", "2022", "tagKey", "tagValue", "tagType"]),
                    iface.encodeFunctionData("addAttribute", [1, "", "instrutor", "Master Paulo", "tagKey", "value", "trait_type"])
                ])


                //console.log(result)



                /*let addCall1 = await metadataStorage.addProperty(1, "name", "CERTIFICADO")
                let addCall2 = await metadataStorage.addProperty(1, "image", "http://ipfs/QQQQQQQQ")
                let addCall3 = await metadataStorage.addProperty(1, "description", "Certificado de curso")*/


                //console.log(await metadataStorage.estimateGas.addProperty(1, "name", "CERTIFICADO"))
                //console.log( metadataStorage.interface.functions['addProperty(uint256,string,string)'])
                //console.log("-------------------")
                //console.log(await metadataStorage.addProperty(1, "name", "CERTIFICADO"))

                /*

                let addCall1 = metadataStorage.interface.functions.addProperty(1, "name", "CERTIFICADO")
                let addCall2 = metadataStorage.interface.functions.addProperty(1, "image", "http://ipfs/QQQQQQQQ")
                let addCall3 = metadataStorage.interface.functions.addProperty(1, "description", "Certificado de curso")


                await metadataStorage.multicall([
                    addCall1,
                    addCall2,
                    addCall3
                ])*/

                console.log("---------------------")
                let json = await metadataStorage.getMetadataJSON(1)
                console.log('JSON : ', json); // hre.ethers.utils.toUtf8String(json)

                console.log("---------------------")
                    / console.log(metadataStorage.interface.functions)
                //const provider = new ethers.providers.Web3Provider();
                //const ethcallProvider = new Provider(provider);

                //await ethcallProvider.all([addCall1, addCall2, addCall3]);





            });


        });


        describe("Add attributes", function () {

            it("attributes", async function () {
                const { metadataStorage } = await loadFixture(deployContract)




                let ABI = ["function addProperty(uint256,string,string)",
                    "function addAttribute(uint256,string,string,string,string,string,string)"
                ];

                let iface = new ethers.utils.Interface(ABI);


                //const tx = contract.users([[id, name, age]])

                await metadataStorage.addProperties(10, [
                ["name", "CERTIFICADO"], 
                ["image", "ipfs://QQQQQQQQQQQQQ"], 
                ["description", "CERTIFICADO DO CURSO DE SOLIDITY"],
                ["turma", "2022"],
                ["tutor", "Marcos Paulo"],
                ["periodo", "20/08/2022 - 10/10/2022"]])


                await metadataStorage.addAttributes(10, [
                ["dados", "name", "MARIA", "key", "value", "trait_type" ], 
                ["dados", "doc", "4344324343434", "tagKey", "tagValue", "tagType" ], 
                [ "", "instituicao", "OMEGA CURSOS", "tagKey", "tagValue", "tagType"],
                ["", "curso", "DEV GAMBIARRA", "tagKey", "tagValue", "tagType"],
                ["","turma", "2022/01", "tagKey", "tagValue", "tagType"],
                ["","matricula", "22022/1", "tagKey", "tagValue", "tagType"],
                ["","nota", "80", "tagKey", "tagValue", "tagType"],
                ["","ano", "2022", "tagKey", "tagValue", "tagType"],
                ["","instrutor", "Master Paulo", "tagKey", "value", "trait_type"]
                ])

                /*
                let result = await metadataStorage.multicall([
                    iface.encodeFunctionData("addProperty", [1, "name", "CERTIFICADO"]),
                    iface.encodeFunctionData("addProperty", [1, "image", "ipfs://QQQQQQQQQQQQQ"]),
                    iface.encodeFunctionData("addProperty", [1, "description", "CERTIFICADO DO CURSO DE SOLIDITY"]),
                    iface.encodeFunctionData("addProperty", [1, "turma", "2022"]),
                    iface.encodeFunctionData("addProperty", [1, "tutor", "Marcos Paulo"]),
                    iface.encodeFunctionData("addProperty", [1, "periodo", "20/08/2022 - 10/10/2022"]),
                    iface.encodeFunctionData("addAttribute", [1, "dados", "name", "MARIA", "tagKey", "tagValue", "tagType"]),
                    iface.encodeFunctionData("addAttribute", [1, "dados", "doc", "4344324343434", "tagKey", "tagValue", "tagType"]),
                    iface.encodeFunctionData("addAttribute", [1, "", "instituicao", "OMEGA CURSOS", "tagKey", "tagValue", "tagType"]),
                    iface.encodeFunctionData("addAttribute", [1, "", "curso", "DEV GAMBIARRA", "tagKey", "tagValue", "tagType"]),
                    iface.encodeFunctionData("addAttribute", [1, "", "turma", "2022/01", "tagKey", "tagValue", "tagType"]),
                    iface.encodeFunctionData("addAttribute", [1, "", "matricula", "22022/1", "tagKey", "tagValue", "tagType"]),
                    iface.encodeFunctionData("addAttribute", [1, "", "nota", "80", "tagKey", "tagValue", "tagType"]),
                    iface.encodeFunctionData("addAttribute", [1, "", "ano", "2022", "tagKey", "tagValue", "tagType"]),
                    iface.encodeFunctionData("addAttribute", [1, "", "instrutor", "Master Paulo", "tagKey", "value", "trait_type"])
                ])*/

      

                console.log("---------------------")
                let json = await metadataStorage.getMetadataJSON(10)
                console.log('add atributes JSON : ', json); // hre.ethers.utils.toUtf8String(json)
                console.log("---------------------")
            });
        });


    });
});
