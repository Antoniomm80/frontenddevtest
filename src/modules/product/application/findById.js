export class FindById {
    constructor(productService) {
        this.productService = productService;
    }

    async execute(id) {
        try {
            return await this.productService.findById(id);
        } catch (error) {
            console.error('Use case error - find By Id:', error);
            throw error;
        }
    }
}