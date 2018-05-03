import Subject from "./subject.js";
import { status } from "../task-1.js";

export default class Cart {
    constructor() {
        this.baseUrl = "http://localhost:3001/cart/items/";
        this.subject = new Subject();
        this.items = [];
        this.loading = false;
    }

    _ajax(url, method = "GET", data = null, middleware = () => {
    }) {

        const params = {
            method,
            mode: "cors",
            headers: { "Content-type": "application/json" }
        };
        if (data) {
            params.body = JSON.stringify(data);
        }

        this.loading = true;
        this._notify();
        return window.fetch(url, params)
            .then(status)
            .then(response => response.status === 200 ? response.json() : null)
            .then(middleware)
            .then(() => {
                this.loading = false;
                this._notify();
                return null;
            })
            .catch(err => {
                this.loading = false;
                throw err;
                this._notify();
            });
    }

    _notify() {
        this.subject.notifyObservers();
    }

    register(...args) {
        this.subject.add(...args);
    }

    getItems() {
        return this.items;
    }

    getTotalQuantity() {
        return this.items.reduce((acc, item) => acc + item.quantity, 0);
    }

    getTotalPrice() {
        return this.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    }

    load() {
        const loadData = resp => {
            this.items = resp;
            return null;
        };

        this._ajax(this.baseUrl, "GET", null, loadData);
    }

    addItem(item) {
        const add = () => {
            this.items.push(item);
            return null;
        };

        this._ajax(this.baseUrl, "POST",
            item, add);
    }

    updateItem(itemId, item) {
        const update = () => {
            const index = this.items.findIndex(elm => elm.id === itemId);
            if (~index) {
                this.items[index] = item;
            }
            return null;
        };

        this._ajax(`${this.baseUrl}${itemId}`, "PUT", item, update);
    }

    removeItem(itemId) {
        const remove = () => {
            this.items = this.items.filter(elm => elm.id !== itemId);
            return null;
        };

        this._ajax(`${this.baseUrl}${itemId}`, "DELETE", null, remove);
    }

    removeAll() {
        const remove = () => {
            this.items = [];
            return null;
        };

        this._ajax(this.baseUrl, "DELETE", null, remove);
    }
}
