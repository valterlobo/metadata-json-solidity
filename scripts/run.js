const main = async () => {
    const MetadataStorage = await hre.ethers.getContractFactory('MetadataStorage')
    const metadataStorage = await MetadataStorage.attach("0x58fcE8859c0A2304d307b4aFE4623D6ea9f515ec")
    //await metadataStorage.deployed()

    console.log("MetadataStorage attach to:", metadataStorage.address)


    /**
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



    //console.log(attribute)
    console.log("----------")
    console.log('String to JSON: ', attribute)
    console.log("----------")
    */

    //

    //MULT CALL 


    let ABI = ["function addProperty(uint256,string,string)",
        "function addAttribute(uint256,string,string,string,string,string,string)"
    ];

    let iface = new ethers.utils.Interface(ABI);

    let result = await metadataStorage.multicall([
        iface.encodeFunctionData("addProperty", [10, "name", "MASTER WOLF"]),
        iface.encodeFunctionData("addProperty", [10, "image", "ipfs://QQQQQQQQQQQQQ"]),
        iface.encodeFunctionData("addProperty", [10, "description", "CERTIFICADO DO CURSO DE SOLIDITY"]),
        iface.encodeFunctionData("addProperty", [10, "turma", "2022"]),
        iface.encodeFunctionData("addProperty", [10, "tutor", "Marcos Paulo"]),
        iface.encodeFunctionData("addProperty", [10, "periodo", "20/08/2022 - 10/10/2022"]),
        iface.encodeFunctionData("addAttribute", [10, "dados", "name", "MARIA", "tagKey", "tagValue", "tagType"]),
        iface.encodeFunctionData("addAttribute", [10, "dados", "doc", "4344324343434", "tagKey", "tagValue", "tagType"]),
        iface.encodeFunctionData("addAttribute", [10, "", "instituicao", "OMEGA CURSOS", "tagKey", "tagValue", "tagType"]),
        iface.encodeFunctionData("addAttribute", [10, "", "curso", "DEV GAMBIARRA", "tagKey", "tagValue", "tagType"]),
        iface.encodeFunctionData("addAttribute", [10, "", "turma", "2022/01", "tagKey", "tagValue", "tagType"]),
        iface.encodeFunctionData("addAttribute", [10, "", "matricula", "22022/1", "tagKey", "tagValue", "tagType"]),
        iface.encodeFunctionData("addAttribute", [10, "", "nota", "80", "tagKey", "tagValue", "tagType"]),
        iface.encodeFunctionData("addAttribute", [10, "", "ano", "2022", "tagKey", "tagValue", "tagType"]),
        iface.encodeFunctionData("addAttribute", [10, "", "instrutor", "Master Paulo", "tagKey", "tagValue", "tagType"]),
        iface.encodeFunctionData("addAttribute", [10, "", "periodo", "10/06/2022 - 10/10/2022", "tagKey", "tagValue", "tagType"])
    ])


    //console.log(result)
    console.log("---------------------")
    let json = await metadataStorage.getMetadataJSON(1)
    console.log('JSON : ', json)
    console.log("---------------------")

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