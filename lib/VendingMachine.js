class VendingMachine {
    constructor({ inv, coins }) {
        (this.inv = JSON.parse(JSON.stringify(inv))),
            (this.coins = JSON.parse(JSON.stringify(coins)));
    }
    dispenseChange() {}
    restockChange(coins) {
        if (!coins || typeof coins !== 'number') {
            throw new Error();
        } else {
            this.inv.quantity += coins;
            return true;
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
