import {CartItem} from "../domain/cartItem.js";

export class AddToCart {
    constructor(cartService, storageService) {
        this.cartService = cartService;
        this.storageService = storageService;
    }

    async execute(command) {
        try {
            const numItems = await this.cartService.addToCart(new CartItem(command.id, command.colorCode, command.storageCode));
            await this.storageService.saveCartNumItems(numItems);
            return numItems;
        } catch (error) {
            console.error('Use case error - AddToCart:', error);
            throw error;
        }
    }
}