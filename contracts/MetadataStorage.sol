// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract MetadataStorage {

    mapping(uint256 => Metadata) metadatas;


    struct Attribute {
        string displayType;
        string keyType;
        string valueType;
    }

    struct Property {
        string key;
        string value;
    }

    struct Metadata {
        Property[] properties;
        Attribute[] attributes;
    }

    function addProperty(
        uint256 id,
        string memory key,
        string memory value
    ) external {
        
        metadatas[id].properties.push(Property(key, value));
    }


     function addAttribute(
        uint256 id,
        string memory displayType,
        string memory keyType,
        string memory valueType
    ) external {
        
        metadatas[id].attributes.push(Attribute(displayType, keyType, valueType));
    }


    function getAttributesJSON(uint256 id)
        external
        view
        returns (bytes memory)
    {
        Attribute[] memory arrAttributes =  metadatas[id].attributes;
        Property[] memory arrProperties =  metadatas[id].properties;
        
        bytes memory metadataParcial;
        bytes memory metadata = "{";
        //metadata = abi.encodePacked(metadata, "{");
        for (uint256 index = 0; index < arrProperties.length; index++) {


            metadataParcial = abi.encodePacked(
                '"' , 
                arrProperties[index].key,
                '": "' , 
                arrProperties[index].value,
                '",'
            );
            metadata = abi.encodePacked(metadata, metadataParcial);

        
        }
        
        metadata = abi.encodePacked(metadata, '"attributes": [');
        for (uint256 index = 0; index < arrAttributes.length; index++) {
            metadata = abi.encodePacked(metadata, "{");
            if (!isEmpty(arrAttributes[index].displayType) ) {
              metadataParcial = abi.encodePacked(
                '"display_type":"',
                arrAttributes[index].displayType,
                '",'
            );
            metadata = abi.encodePacked(metadata, metadataParcial);

            }

     

            metadataParcial = abi.encodePacked(
                '"trait_type":"',
                arrAttributes[index].keyType,
                '",'
            );
            metadata = abi.encodePacked(metadata, metadataParcial);

            metadataParcial = abi.encodePacked(
                '"value":"',
                arrAttributes[index].valueType,
                '"'
            );
            metadata = abi.encodePacked(metadata, metadataParcial);
            metadata = abi.encodePacked(metadata, "}");
            if (index < (arrAttributes.length -1)) { 
                metadata = abi.encodePacked(metadata, ",");
            }
           
        }

        metadata = abi.encodePacked(metadata, "] }");
        string memory attributes64 = Base64.encode(metadata);
        return abi.encodePacked("data:application/json;base64,", attributes64);
    }

    function isEmpty(string memory _s) internal pure returns (bool) {
        return bytes(_s).length == 0;
    }
}
