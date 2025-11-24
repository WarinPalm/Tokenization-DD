const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("MyToken", function () {
    let MyToken;
    let myToken;
    let owner;
    let spenders;

    const INITIAL_SUPPLY = 1000000;

    const decimals = 18;

    this.beforeEach(async () => {
        [owner, ...spenders] = await ethers.getSigners();
        MyToken = await ethers.getContractFactory("MyToken");
        myToken = await MyToken.deploy(INITIAL_SUPPLY);// parametor อิงจาก constucttor ว่ามีอะไรบ้าง
    });

    describe("balanceOf", () => {
        // แสดงจำนวนเงินของเจ้าของ
        it("Owner should have all tokens", async () => {
            expect(await myToken.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY);

        });
        // แสดงเงินของทุกคนเป็น 0
        it("should return zero for other accounts", async () => {
            expect(await myToken.balanceOf(spenders[0].address)).to.equal(0);
        });
    });
    describe("transfer", () => {
        //โอนเงินเสร็จ
        it("should transfer tokens successfully", async () => {

            await myToken.connect(owner).transfer(spenders[0].address, 100);
            expect(await myToken.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY - 100);
            expect(await myToken.balanceOf(spenders[0].address)).to.equal(100);

        });

        //ถ้ามีเงินโอนไม่พอ
        it("should fail if sender doesn't have enough balance", async () => {

            await expect(
                myToken.connect(owner).transfer(spenders[0].address, INITIAL_SUPPLY + 1)
            ).to.be.revertedWith("Not enough balance");


            await expect(
                myToken.connect(spenders[0]).transfer(spenders[0].address, 1)
            ).to.be.revertedWith("Not enough balance");
        });
    });
    describe("approve", () => {
        // ยืนยันสำเร็จ
        it("should approve a spender and emit Approval event", async () => {
            await expect(myToken.connect(owner).approve(spenders[0].address, 100))
                .to.emit(myToken, "Approval")
                .withArgs(owner.address, spenders[0].address, 100);
        });


        it("should return the spender's allowance", async function () {
            await myToken.connect(owner).approve(spenders[0].address, 100);
            expect(await myToken.allowance(owner.address, spenders[0].address)).to.equal(100);
        });

        it("should return 0 for unapproved spenders[0]", async function () {
            expect(await myToken.allowance(owner.address, spenders[0].address)).to.equal(0);
        });
    }),
        describe("transferFrom", () => {

            // ทำงานสำเร็จ
            it("should transfer tokens from owner using allowance", async () => {
                // Owner ต้อง 'อนุญาต' (Approve) ให้ spenders[0] ใช้เงินก่อน
                await myToken.connect(owner).approve(spenders[0].address, 500);

                //  spenders[0] (คนกลาง) สั่งโอนเงินจาก Owner ไปให้ ผู้รับ จำนวน 200 เหรียญ
                await myToken.connect(spenders[0]).transferFrom(owner.address, spenders[1].address, 200);

                // ตรวจสอบผลลัพธ์ เงิน Owner ต้องลดลง 200
                expect(await myToken.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY - 200);
                // เงินผู้รับต้องเพิ่มขึ้น 200
                expect(await myToken.balanceOf(spenders[1].address)).to.equal(200);
                // วงเงินคงเหลือของ spenders[0] ต้องลดลงเหลือ 300 (500 - 200)
                expect(await myToken.allowance(owner.address, spenders[0].address)).to.equal(300);
            });

            //  ล้มเหลวเพราะวงเงินไม่พอ
            it("should fail if allowance is not enough", async () => {
                // Owner อนุญาตให้แค่ 100
                await myToken.connect(owner).approve(spenders[0].address, 100);

                // spenders[0] พยายามโอน 200 (เกินวงเงิน)
                // ต้อง Revert 
                await expect(
                    myToken.connect(spenders[0]).transferFrom(owner.address, spenders[1].address, 200)
                ).to.be.revertedWith("Not enough allowances");
            });
        });


});