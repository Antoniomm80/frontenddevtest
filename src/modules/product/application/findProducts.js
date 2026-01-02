export class FindProducts {
    constructor(productService) {
        this.productService = productService;
    }

    async execute(searchString) {
        try {
            const allProducts = await this.productService.getAll();
            if (!searchString) {
                return allProducts;
            }
            return allProducts.filter(product => this.matchesCriteria(product, searchString));
        } catch (error) {
            console.error('Use case error - GetAllProducts:', error);
            throw error;
        }
    }

    matchesCriteria(product, searchString) {
        return product.brand.toLowerCase().includes(searchString.toLowerCase()) || product.model.toLowerCase().includes(searchString.toLowerCase());
    }
}