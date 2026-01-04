export class AddToCart {
    constructor(cartService, storageService) {
        this.cartService = cartService;
        this.storageService = storageService;
    }

    async execute(cartItem) {
        try {
            const numItems = await this.cartService.addToCart(cartItem);
            await this.storageService.saveCartNumItems(numItems);
            return numItems;
        } catch (error) {
            console.error('Use case error - AddToCart:', error);
            throw error;
        }
    }
}