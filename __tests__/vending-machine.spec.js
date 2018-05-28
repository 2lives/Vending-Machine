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
    describe('Restock coins', () => {
        describe('Restock singular coin, with valid input', () => {
            it('Should increment the quantity of specified coin, by specified amount', () => {
                const result = vendingMachine.restockSingularCoin({
                    coin: 'loonie',
                    quantity: 41
                });

                expect(result).toEqual(51);
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
                    //loonie is 66 because of the accumulative 41 loonies added previously
                    expect(result).toEqual([35, 30, 30, 66, 25]);
                });
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
        describe('Given an invalid item for a singluar item to be restocked', () => {
            it('Should throw an error', () => {
                const result = () => {
                    vendingMachine.restockSingularInv({
                        item: 'b50',
                        quantity: 100
                    });
                };
                expect(result).toThrow();
            });
        });

        describe('Given a valid input for a singular item to be restocked', () => {
            it('Should increment the specified item by the specified amount', () => {
                const result = vendingMachine.restockSingularInv({
                    item: 'a1',
                    quantity: 40
                });
                //equals 61 because the bulk 20 inv added in the previous test passed, therefore adding another 20 to the total stock
                expect(result).toEqual(61);
            });
        });
    });
    describe('Dispense change', () => {
        describe('Given either an invalid input, or the input (money) is not large enough to purchase desired item', () => {
            it('Should throw an error', () => {
                const result = () => vendingMachine.dispenseChange(5, 2);
                expect(result).toThrow();
            });
        });
        describe('Given a valid input, where the money input is greater than the price of the item and the change is not a float', () => {
            it('should dispense the change', () => {
                const result = vendingMachine.dispenseChange(5, 7);
                expect(result).toEqual({
                    toonie: 1,
                    loonie: 0,
                    quarter: 0,
                    dime: 0,
                    nickel: 0
                });
            });
        });
        describe('Given a valid input, where the money input is greater than the price of the item and the change is a float', () => {
            it('Should return the proper change combination', () => {
                const result = vendingMachine.dispenseChange(5, 7.25);
                expect(result).toEqual({
                    toonie: 1,
                    loonie: 0,
                    quarter: 1,
                    dime: 0,
                    nickel: 0
                });
            });
        });
        describe('Given a valid input where the money input is greater than the price of the item and the change features no dollars (integers)', () => {
            it('Should return the proper change combination', () => {
                const result = vendingMachine.dispenseChange(5, 5.4);
                expect(result).toEqual({
                    toonie: 0,
                    loonie: 0,
                    quarter: 1,
                    dime: 1,
                    nickel: 1
                });
            });
        });
        describe('Given a valid input where the money input is greater than the price of the item and the change (float) is not a multiple of 5', () => {
            it('Should return the proper change combination', () => {
                const result = vendingMachine.dispenseChange(5, 5.42);
                expect(result).toEqual({
                    toonie: 0,
                    loonie: 0,
                    quarter: 1,
                    dime: 1,
                    nickel: 1
                });
            });
        });
    });
    describe('Dispense item', () => {
        describe('Given an invalid input (dollar amount), being an inadequate amount or something other than money', () => {
            it('Should throw an error', () => {
                const result = () => vendingMachine.dispenseInvItem(5, 3);
                const result1 = () => vendingMachine.dispenseInvItem('hello');
                expect(result).toThrow();
                expect(result1).toThrow();
            });
            describe('Given a valid input (dollar amount)', () => {
                it('Should reduce the item stock by 1 and return the item as well as the change', () => {
                    const result = vendingMachine.dispenseInvItem('a3', 9);
                    expect(result).toEqual(['Ferrari', 3]);
                });
            });
        });
    });
});
