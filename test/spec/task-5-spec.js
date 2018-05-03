import chai from "chai";
// import chaiAsPromised from "chai-as-promised";
import Cart from "../../src/task-5/cart-model";


const assert = chai.assert;
let cart;
const items = [{ id: 1, name: "Item 1", price: 15, quantity: 10 },
    { id: 19, name: "Item 19", price: 3, quantity: 293 }];
describe("Task 5:", () => {
    beforeEach(() => {
        cart = new Cart();
        cart.items = [...items];
    });

    it("should return items", () => {
        assert.deepEqual(cart.getItems(), items);
    });

    it("should return total quantity of items", () => {
        assert.equal(cart.getTotalQuantity(), 303);
    });

    it("should return total price of items", () => {
        assert.equal(cart.getTotalPrice(), 1029);
    });
});
