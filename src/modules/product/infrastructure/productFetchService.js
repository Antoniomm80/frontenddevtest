import {ProductService} from '../domain/productService.js';
import {Product} from '../domain/product.js';

export class ProductFetchService extends ProductService {
    constructor(baseUrl) {
        super();
        this.baseUrl = baseUrl;
    }

    async getAll() {
        try {
            const response = await fetch(`${this.baseUrl}/api/product`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.map(productData => new Product(productData));
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }

    async findById(id) {
        if (id === undefined) {
            return undefined;
        }
        try {
            const response = await fetch(`${this.baseUrl}/api/product/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return new Product(data);
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }
}
