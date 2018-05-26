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
    describe('Restock change with invalid input (not coins)', () => {
        describe('Given an input other than coins in the form of a single coin or multiples', () => {
            it('Should throw an error', () => {
                const result = () => vendingMachine.restockChange([]);
                expect(result).toThrow();
            });
        });
    });
    describe('Restock bulk change with valid coins', () => {
        describe('Given a valid input for change', () => {
            it('Should increment the change inventory by specified amount and return true', () => {
                const result = vendingMachine.restockBulkChange(15);
                expect(result).toEqual([35, 30, 30, 25, 25]);
            });
        });
    });
    describe('Restock inventory', () => {
        describe('Given an invalid item to be inputted into the machine', () => {
            it('Should throw an error', () => {
                const result = () => vendingMachine.restockInv();
                expect(result).toThrow();
            });
        });
        describe('Given a valid input to be added to inventory stock', () => {
            it('Should increment all inventory by specified amount and return the inventory', () => {
                const result = vendingMachine.restockBulkInv(20);
                expect(result).toEqual([21, 24, 22, 21, 23, 21, 120]);
            });
        });
        describe('Given an invalid input for a singluar item to be restocked', () => {
            it('Should throw an error', () => {
                const result = () => {
                    expect(result).toThrow();
                };
            });
        });
        describe('Given a valid input for a singular item to be restocked', () => {
            it('Should increment the specified item by the specified amount', () => {
                const result = vendingMachine.restockSingularInv;
            });
        });
    });
});
