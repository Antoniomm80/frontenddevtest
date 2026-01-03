export class AddToCart {
    constructor(productService, storageService) {
        this.productService = productService;
        this.storageService = storageService;
    }

    async execute({id, colorCode, storageCode}) {
        try {
            const numItems = await this.productService.addToCart({id, colorCode, storageCode});
            await this.storageService.saveCartNumItems(numItems);
            return numItems;
        } catch (error) {
            console.error('Use case error - AddToCart:', error);
            throw error;
        }
    }
}