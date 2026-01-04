import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {CartFetchService} from "../../../src/modules/cart/infrastructure/cartFetchService.js";

describe('Cart Service', () => {
    let cartService;
    let mockFetch;

    beforeEach(() => {
        mockFetch = vi.fn();
        vi.stubGlobal('fetch', mockFetch);
        cartService = new CartFetchService('https://itx-frontend-test.onrender.com');
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    describe('add to cart', () => {
        it('Debe Postear un id de objeto junto al código de almacenamiento y el código de color y debe devolver el número de elementos en el carrito', async () => {
            const cartData = {
                id: 'cGjFJlmqNPIwU59AOcY8H',
                colorCode: 1000,
                storageCode: 2000
            };

            const mockResponse = {
                count: 5
            };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse
            });

            const result = await cartService.addToCart(cartData);

            expect(mockFetch).toHaveBeenCalledWith(
                'https://itx-frontend-test.onrender.com/api/cart',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(cartData)
                }
            );
            expect(result).toBe(5);
        });
    });
});
