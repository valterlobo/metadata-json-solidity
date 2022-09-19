// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Base64.sol";
import "hardhat/console.sol";

contract MetadataStorage {
    mapping(uint256 => Metadata) metadatas;

    mapping(uint256 => mapping(string => uint256)) indexProperties;
    mapping(uint256 => mapping(string => uint256)) indexAttributes;

    struct Attribute {
        string displayType;
        string keyType;
        string valueType;
        string tagKey;
        string tagValue;
        string tagType;
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
        uint256 idx = metadatas[id].properties.length - 1;
        indexProperties[id][key] = idx;
    }

    function updateProperty(
        uint256 id,
        string memory key,
        string memory value
    ) external {
        uint256 idx = indexProperties[id][key];
        metadatas[id].properties[idx].value = value;
    }

    function deleteProperty(uint256 id, string memory key) external {
        uint256 idx = indexProperties[id][key];
        require(
            isEqual(metadatas[id].properties[idx].key, key),
            "NOT EXIST KEY"
        );
        delete metadatas[id].properties[idx];
    }

    function addAttribute(
        uint256 id,
        string memory displayType,
        string memory keyType,
        string memory valueType,
        string memory tagKey,
        string memory tagValue,
        string memory tagType
    ) external {
        metadatas[id].attributes.push(
            Attribute(
                displayType,
                keyType,
                valueType,
                tagKey,
                tagValue,
                tagType
            )
        );
        uint256 idx = metadatas[id].attributes.length - 1;
        indexAttributes[id][keyType] = idx;
    }

    function updateAttribute(
        uint256 id,
        string memory displayType,
        string memory keyType,
        string memory valueType
    ) external {
        uint256 idx = indexAttributes[id][keyType];
        metadatas[id].attributes[idx].displayType = displayType;
        metadatas[id].attributes[idx].keyType = keyType;
        metadatas[id].attributes[idx].valueType = valueType;
    }

    function deleteAttribute(uint256 id, string memory keyType) external {
        uint256 idx = indexAttributes[id][keyType];
        require(
            isEqual(metadatas[id].attributes[idx].keyType, keyType),
            "NOT EXIST KEY TYPE"
        );
        delete metadatas[id].attributes[idx];
    }

    function getMetadataJSON(uint256 id) external view returns (bytes memory) {
        Attribute[] memory arrAttributes = metadatas[id].attributes;
        Property[] memory arrProperties = metadatas[id].properties;

        bytes memory metadataParcial;
        bytes memory metadata = "{";
        for (uint256 index = 0; index < arrProperties.length; index++) {
            if (!isEmpty(arrProperties[index].key)) {
                metadataParcial = abi.encodePacked(
                    '"',
                    arrProperties[index].key,
                    '": "',
                    arrProperties[index].value,
                    '",'
                );
                metadata = abi.encodePacked(metadata, metadataParcial);
            }
        }

        metadata = abi.encodePacked(metadata, '"attributes": [');
        uint256 flagLast = arrAttributes.length - 1;
        for (uint256 index = 0; index < arrAttributes.length; index++) {
            if (!isEmpty(arrAttributes[index].keyType)) {
                metadata = abi.encodePacked(metadata, "{");
                if (!isEmpty(arrAttributes[index].displayType)) {
                    metadataParcial = abi.encodePacked(
                        '"',
                        arrAttributes[index].tagType,
                        '":',
                        '"',
                        arrAttributes[index].displayType,
                        '",'
                    );
                    metadata = abi.encodePacked(metadata, metadataParcial);
                }

                metadataParcial = abi.encodePacked(
                    '"',
                    arrAttributes[index].tagKey,
                    '":',
                    '"',
                    arrAttributes[index].keyType,
                    '",'
                );
                metadata = abi.encodePacked(metadata, metadataParcial);

                metadataParcial = abi.encodePacked(
                    '"',
                    arrAttributes[index].tagValue,
                    '":',
                    '"',
                    arrAttributes[index].valueType,
                    '"'
                );
                metadata = abi.encodePacked(metadata, metadataParcial);
                metadata = abi.encodePacked(metadata, "}");
            } else {
                flagLast = flagLast - 1;
            }
            console.log(index, flagLast);
            if (index < flagLast && !isEmpty(arrAttributes[index].keyType)) {
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

    function isEqual(string memory a, string memory b)
        internal
        pure
        returns (bool)
    {
        return (keccak256(abi.encodePacked(a)) ==
            keccak256(abi.encodePacked(b)));
    }
}
