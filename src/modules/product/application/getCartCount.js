export class GetCartCount {
    constructor(storageService) {
        this.storageService = storageService;
    }

    async execute() {
        try {
            return await this.storageService.getCartNumItems();
        } catch (error) {
            console.error('Use case error - GetCartCount:', error);
            throw error;
        }
    }
}