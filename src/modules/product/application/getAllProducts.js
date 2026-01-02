export class GetAllProducts {
    constructor(productService) {
        this.productService = productService;
    }

    async execute() {
        try {
            return await this.productService.getAll();
        } catch (error) {
            console.error('Use case error - GetAllProducts:', error);
            throw error;
        }
    }
}