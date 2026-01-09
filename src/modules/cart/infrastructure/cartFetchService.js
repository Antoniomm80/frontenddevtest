import {CartService} from "../domain/cartService.js";

export class CartFetchService extends CartService {
    constructor(baseUrl) {
        super();
        this.baseUrl = baseUrl;
    }

    async addToCart(cartItem) {
        try {
            const response = await fetch(`${this.baseUrl}/api/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(cartItem),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.count;
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw error;
        }
    }
}
