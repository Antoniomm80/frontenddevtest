import {StorageService} from "../domain/storageService.js";

export class BrowserStorageService extends StorageService {
    constructor() {
        super();
    }

    async getCartNumItems() {
        const numItems = localStorage.getItem('cartNumItems');
        return numItems ? parseInt(numItems, 10) : 0;
    }

    async saveCartNumItems(numItems) {
        localStorage.setItem('cartNumItems', numItems.toString());
    }
}
