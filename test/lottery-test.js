const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

let Lottery, lottery

describe("Lottery", function () {
    it("Should be deployed", async function () {
        Lottery = await ethers.getContractFactory("Lottery");
        lottery = await Lottery.deploy();
        await lottery.deployed();
    });

    it("Allows one account to enter", async function () {
        await lottery.enter({value: ethers.utils.parseEther("1.0")});
        let players = await lottery.getPlayers();
        expect(players.length).to.equal(1);
    });
    it("Allows multiple accounts to enter", async function () {
        const [owner, addr1, addr2] = await ethers.getSigners();

        await lottery.connect(addr1).enter({value: ethers.utils.parseEther("1.0")});
        await lottery.connect(addr2).enter({value: ethers.utils.parseEther("2.0")});
        let players = await lottery.getPlayers();
        expect(players.length).to.equal(3);
    });
    it("Only manager can call pickWinner", async function () {
        const [owner, addr1, addr2] = await ethers.getSigners();

        try {
            await lottery.pickWinner();
            assert(false);
        }
        catch(err) {
            assert(err);
        }
    });
});
