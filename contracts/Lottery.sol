//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Lottery {
    address public manager;
    address[] public players;

    constructor() {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .01 ether, "Should send more than .01 ether");

        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    function pickWinner() public restricted {
        uint index = random() % players.length;
        (bool sent, ) = players[index].call{value: address(this).balance}("");
        require(sent, "Failed to send Ether");
        players = new address[](0);
    }

    modifier restricted() {
        require(msg.sender == manager, "Should be invoked by manager");
        _;
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }
}