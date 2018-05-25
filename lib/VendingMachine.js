class VendingMachine {
    constructor({ inv, coins }) {
        (this.inv = JSON.parse(JSON.stringify(inv))),
            (this.coins = JSON.parse(JSON.stringify(coins)));
    }
    dispenseChange() {}
    restockChange(coins) {
        if (!coins || typeof coins !== 'number' || typeof coins !== 'object') {
            throw new Error();
        }
    }
    dispenseInvItem() {}
    restockInv() {}
    printInv(inv) {
        console.log(this.inv);
        return this.inv;
    }
}
module.exports = VendingMachine;
