// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Multicall.sol";

contract MetadataStorage is Multicall, Ownable {
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
    ) external onlyOwner {
        metadatas[id].properties.push(Property(key, value));
        uint256 idx = metadatas[id].properties.length - 1;
        indexProperties[id][key] = idx;
    }

    function addProperties(uint256 id, Property[] memory properties)
        external
        onlyOwner
    {
        for (uint256 index = 0; index < properties.length; index++) {
            Property memory prop = properties[index];
            metadatas[id].properties.push(prop);
            uint256 idx = metadatas[id].properties.length - 1;
            indexProperties[id][prop.key] = idx;
        }
    }

    function updateProperty(
        uint256 id,
        string memory key,
        string memory value
    ) external onlyOwner {
        uint256 idx = indexProperties[id][key];
        metadatas[id].properties[idx].value = value;
    }

    function deleteProperty(uint256 id, string memory key) external onlyOwner {
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
    ) external onlyOwner {
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

    function addAttributes(uint256 id, Attribute[] memory attributes)
        external
        onlyOwner
    {
        for (uint256 index = 0; index < attributes.length; index++) {
            Attribute memory attr = attributes[index];
            metadatas[id].attributes.push(attr);
            uint256 idx = metadatas[id].attributes.length - 1;
            indexAttributes[id][attr.keyType] = idx;
        }
    }

    function updateAttribute(
        uint256 id,
        string memory displayType,
        string memory keyType,
        string memory valueType
    ) external onlyOwner {
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

    function getMetadataJSON(uint256 id) external view returns (string memory) {
        Attribute[] memory arrAttributes = metadatas[id].attributes;
        Property[] memory arrProperties = metadatas[id].properties;
        Attribute[] memory arrAttributesTemp = new Attribute[](
            arrAttributes.length
        );

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

        uint256 idx = 0;
        for (uint256 index = 0; index < arrAttributes.length; index++) {
            if (!isEmpty(arrAttributes[index].keyType)) {
                arrAttributesTemp[idx] = arrAttributes[index];
                idx = idx + 1;
            }
        }

        for (uint256 index = 0; index < idx; index++) {
            metadata = abi.encodePacked(metadata, "{");
            if (!isEmpty(arrAttributesTemp[index].displayType)) {
                metadataParcial = abi.encodePacked(
                    '"',
                    arrAttributesTemp[index].tagType,
                    '":',
                    '"',
                    arrAttributesTemp[index].displayType,
                    '",'
                );
                metadata = abi.encodePacked(metadata, metadataParcial);
            }

            metadataParcial = abi.encodePacked(
                '"',
                arrAttributesTemp[index].tagKey,
                '":',
                '"',
                arrAttributesTemp[index].keyType,
                '",'
            );
            metadata = abi.encodePacked(metadata, metadataParcial);

            metadataParcial = abi.encodePacked(
                '"',
                arrAttributesTemp[index].tagValue,
                '":',
                '"',
                arrAttributesTemp[index].valueType,
                '"'
            );
            metadata = abi.encodePacked(metadata, metadataParcial);
            metadata = abi.encodePacked(metadata, "}");

            if (index < idx - 1) {
                metadata = abi.encodePacked(metadata, ",");
            }
        }
        metadata = abi.encodePacked(metadata, "] }");
        string memory attributes64 = Base64.encode(metadata);
        return
            string(
                abi.encodePacked("data:application/json;base64,", attributes64)
            );
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
