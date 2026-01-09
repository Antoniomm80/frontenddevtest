import {CartItem} from "../domain/cartItem.js";

export class AddToCart {
    constructor(cartService, storageService) {
        this.cartService = cartService;
        this.storageService = storageService;
    }

    async execute(command) {
        try {
            const numItemsAdded = await this.cartService.addToCart(new CartItem(command.id, command.colorCode, command.storageCode));
            const storedNumItems = await this.storageService.getCartNumItems();
            const totalItems = storedNumItems + numItemsAdded;
            await this.storageService.saveCartNumItems(totalItems);
            return totalItems;
        } catch (error) {
            console.error('Use case error - AddToCart:', error);
            throw error;
        }
    }
}