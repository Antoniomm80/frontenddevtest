import {ProductFetchService} from "./productFetchService.js";
import {Product} from "../domain/product.js";

export class ProductCachedFetchService extends ProductFetchService {
    constructor(baseUrl, expirationTime) {
        super(baseUrl);
        this.expirationTime = expirationTime;
    }

    isCacheValid(cacheKey) {
        const cached = localStorage.getItem(cacheKey);
        if (!cached) return false;

        try {
            const { timestamp } = JSON.parse(cached);
            const now = Date.now();
            return (now - timestamp) < this.expirationTime;
        } catch {
            return false;
        }
    }

    getCachedData(cacheKey) {
        const cached = localStorage.getItem(cacheKey);
        if (!cached) return null;

        try {
            const { data } = JSON.parse(cached);
            return data;
        } catch {
            return null;
        }
    }

    setCacheData(cacheKey, data) {
        const cacheEntry = {
            timestamp: Date.now(),
            data: data
        };
        localStorage.setItem(cacheKey, JSON.stringify(cacheEntry));
    }

    async getAll() {
        const cacheKey = 'products_all';

        if (this.isCacheValid(cacheKey)) {
            const cachedData = this.getCachedData(cacheKey);
            return cachedData.map(productData => new Product(productData));
        }

        const products = await super.getAll();
        const plainData = products.map(p => ({...p}));
        this.setCacheData(cacheKey, plainData);
        return products;
    }

    async findById(id) {
        const cacheKey = `product_${id}`;

        if (this.isCacheValid(cacheKey)) {
            const cachedData = this.getCachedData(cacheKey);
            return new Product(cachedData);
        }

        const product = await super.findById(id);
        if (product) {
            this.setCacheData(cacheKey, {...product});
        }
        return product;
    }

    async addToCart({id, colorCode, storageCode}) {
        return super.addToCart({id, colorCode, storageCode});
    }
}
