//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MerkleTree{
    bytes32 public merkleTreeRoot = 0xc447543b20c791ef80a017501890b127ace56d61bc3e86b6c60d66e743fc3bbd;

    mapping(address => bool) NFTclaimed;

    function nftWhilelistMint(bytes32[] calldata _merkleproof) public{
        require(!NFTclaimed[msg.sender], "User already claimed NFT");

        bytes32 leaf =keccak256(abi.encodePacked(msg.sender));
        require(MerkleProof.verify(_merkleproof, merkleTreeRoot, leaf), "Invalid proof!");

        NFTclaimed[msg.sender] = true;
    }
}