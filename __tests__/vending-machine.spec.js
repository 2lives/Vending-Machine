const coins = require('../__mocks__/Coins');
const inv = require('../__mocks__/Inventory');
const dispensingMachine = require('../lib/VendingMachine');
const vendingMachine = new dispensingMachine({ inv, coins });

describe('Vending Machine', () => {
    describe('Show inventory', () => {
        it('Should show me the current inventory', () => {
            const result = vendingMachine.printInv();
            expect(result).toEqual(inv);
        });
    });
    describe('Restock change', () => {
        const restockedCoins = JSON.parse(JSON.stringify(coins));
        describe('Given an input other than coins in the form of a single coin or multiples', () => {
            it('Should throw an error', () => {
                const result = () => vendingMachine.restockChange([]);
                expect(result).toThrow();
            });
        });
    });
});
