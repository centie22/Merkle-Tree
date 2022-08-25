const {MerkleTree} = require ('merkletreejs');
const keccak256 = require('keccak256');

// describe("Merkle Proof", async () => {
//     it("should check whether an address has been whitelisted", async () => {




//     })
// })
//List of addresses for whitelist
let allWhiteListAddresses = [
    '0xcd3B766CCDd6AE721141F452C550Ca635964ce71',
    '0x2546BcD3c84621e976D8185a91A922aE77ECEc30',
    '0xbDA5747bFD65F08deb54cb465eB87D40e51B197E',
    '0xa0Ee7A142d267C1f36714E4a8F75612F20a79720',
    '0xBcd4042DE499D14e55001CcbB24a551F3b954096',
    '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199'
]

//iterating through and hashing the addresses
const leafnodeAddr = allWhiteListAddresses.map(addr => keccak256(addr));
const merkleTree = new MerkleTree(leafnodeAddr, keccak256, {sortPairs: true});

// console.log(leafnodeAddr);
// console.log(merkleTree);

//getting the roothash of the merkle tree

const rootHash = merkleTree.getRoot();

console.log("Merkle tree of Whitelist addresses\n ", merkleTree.toString());
console.log("The RootHash is: ", rootHash);

//generating hex proof of address

const MessageSenderClaimer =leafnodeAddr[0];
const hexProof = merkleTree.getHexProof(MessageSenderClaimer);

console.log("this is hex proof: ", hexProof);

//Verifying the msg.sender

console.log(merkleTree.verify(hexProof, MessageSenderClaimer, rootHash));