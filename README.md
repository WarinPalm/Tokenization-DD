# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```
balanceOf => ยอดเงินของผู้ถือ token => จำนวน token
transfer => เจ้าของ token โอนให้ผู้รับ (to) => true/false
approve => เจ้าของ token อนุญาตจำนวน token ว่าให้คนอื่น (spender) ใช้ได้เท่าไหร่ => true/false
transferForm => ผู้ที่ได้รับอนุญาติ spender โอน token จาก owner ไปหาผู้รับ (to) => true/false
allowance เรียกดูยอดเงินว่าเจ้าของ owner อนุญาตให้ผู้ใช้จำนวนเท่าไหร่ (spender) => จำนวน token

ถ้า transfer / transferForm ถูกเรียกสำเร็จ จะเรียก => Transfer (event)

approve => Aprroval( event)



ถ้า decimal = 2

totalSupply = 100/0.01;

smallest amount = 0.01;
การบ้าน deploy script ที่มีการดึงข้อมูล initial supply มาใส่ใน constructor
เขียน mocha test ที่ทดสอบทุกfunc