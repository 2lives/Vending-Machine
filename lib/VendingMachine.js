class VendingMachine {
    constructor({ inv, coins }) {
        (this.inv = JSON.parse(JSON.stringify(inv))),
            (this.coins = JSON.parse(JSON.stringify(coins)));
        //    console.log(this.coins);
        console.log(this.inv);
    }
    dispenseChange() {}

    restockBulkChange(coins) {
        if (!coins || typeof coins !== 'number') {
            throw new Error();
        } else {
            const coinQuantityArr = [];
            for (var coinsName in this.coins) {
                coinQuantityArr.push((this.coins[coinsName].quantity += coins));
            }
            return coinQuantityArr;
        }
    }
    dispenseInvItem() {}
    restockBulkInv(inv) {
        if (!inv || typeof inv !== 'number') {
            throw new Error();
        } else {
            const quantityArr = [];
            for (var stockCode in this.inv) {
                quantityArr.push((this.inv[stockCode].quantity += inv));
            }
            return quantityArr;
        }
    }
    restockSingularInv({ item, quantity }) {
        if (this.inv[item] === undefined || typeof quantity !== 'number') {
            throw new Error();
        }
        return (this.inv[item].quantity += quantity);
    }
    printInv(inv) {
        return this.inv;
    }
}
module.exports = VendingMachine;
