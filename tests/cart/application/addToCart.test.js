import {beforeEach, describe, expect, it, vi} from 'vitest';
import {AddToCart} from "../../../src/modules/cart/application/addToCart.js";

describe('Add to Cart Use Case', () => {
    let addToCart;
    let mockCartService;
    let mockStorageService;

    beforeEach(() => {
        mockCartService = {
            addToCart: vi.fn()
        };
        mockStorageService = {
            saveCartNumItems: vi.fn(),
            getCartNumItems: vi.fn()
        };
        addToCart = new AddToCart(mockCartService, mockStorageService);
    });

    it('Debe invocar el método addToCart del servicio de gestión de carrito y luego guardarlo mediante el servicio de persistencia', async () => {
        mockStorageService.getCartNumItems.mockResolvedValueOnce(2);
        mockCartService.addToCart.mockResolvedValueOnce(1);

        await addToCart.execute({id: "8hKbH2UHPM_944nRHYN1n", colorCode: 1000, storageCode: 2000});

        expect(mockStorageService.getCartNumItems).toHaveBeenCalledTimes(1);
        expect(mockCartService.addToCart).toHaveBeenCalledTimes(1);
        expect(mockCartService.addToCart).toHaveBeenCalledWith({id: "8hKbH2UHPM_944nRHYN1n", colorCode: 1000, storageCode: 2000});
        expect(mockStorageService.saveCartNumItems).toHaveBeenCalledTimes(1);
        expect(mockStorageService.saveCartNumItems).toHaveBeenCalledWith(3);
    });
});
