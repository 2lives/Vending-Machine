class VendingMachine {
    constructor({ inv, coins }) {
        (this.inv = JSON.parse(JSON.stringify(inv))),
            (this.coins = JSON.parse(JSON.stringify(coins)));
    }
    dispenseChange(price, dollarInput) {
        if (
            price > dollarInput ||
            typeof dollarInput !== 'number' ||
            typeof price !== 'number'
        ) {
            throw new Error();
        } else {
            let coins = this.coins;
            let change = dollarInput - price;
            let changeCoins = {
                toonie: 0,
                loonie: 0,
                quarter: 0,
                dime: 0,
                nickel: 0
            };
            if (
                coins.toonie.quantity > 0 &&
                coins.toonie.value <= Math.floor(change)
            ) {
                coins.toonie.quantity - 1;
                change -= coins.toonie.value;
                changeCoins['toonie'] += 1;
            }
            if (
                coins.loonie.quantity > 0 &&
                coins.loonie.value <= Math.floor(change)
            ) {
                coins.loonie.quantity - 1;
                change -= coins.loonie.value;
                changeCoins['loonie'] += 1;
            }
            if (coins.quarter.quantity > 0 && coins.quarter.value <= change) {
                coins.quarter.quantity - 1;
                change -= coins.quarter.value;
                changeCoins['quarter'] += 1;
            }
            if (coins.dime.quantity > 0 && coins.dime.value <= change) {
                coins.dime.quantity - 1;
                change -= coins.dime.value;
                changeCoins['dime'] += 1;
            }
            if (coins.nickel.quantity > 0 && coins.nickel.value <= change) {
                change -= coins.nickel.value;
                changeCoins['nickel'] += 1;
            }
            return changeCoins;
        }
    }

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
    restockSingularCoin({ coin, quantity }) {
        if (typeof coin !== 'string' || typeof quantity !== 'number') {
            throw new Error();
        } else {
            return (this.coins[coin].quantity += quantity);
        }
    }
    dispenseInvItem(item, dollarInput) {
        const result = [];
        const change = dollarInput - this.inv[item].price;
        if (
            typeof item !== 'string' ||
            typeof dollarInput !== 'number' ||
            this.inv[item] === undefined ||
            this.inv[item].quantity < 1 ||
            dollarInput < this.inv[item].price
        ) {
            throw new Error();
        } else {
            this.inv[item].quantity -= 1;
            result.push(this.inv[item].item);
            result.push(change);

            return result;
        }
    }
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
